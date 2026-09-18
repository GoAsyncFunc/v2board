var normalizeReference = require("./markdownUtils.js").normalizeReference;
var isSpace = require("./markdownUtils.js").isSpace;

function markdownLinkRule(state, silent) {
  var attrs;
  var code;
  var label;
  var labelEnd;
  var labelStart;
  var position;
  var result;
  var reference;
  var title;
  var token;
  var href = "";
  var originalPosition = state.pos;
  var maximumPosition = state.posMax;
  var parseStart = state.pos;
  var parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5b) return false;

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
  if (labelEnd < 0) return false;

  position = labelEnd + 1;
  if (position < maximumPosition && state.src.charCodeAt(position) === 0x28) {
    parseReference = false;

    position++;
    for (; position < maximumPosition; position++) {
      code = state.src.charCodeAt(position);
      if (!isSpace(code) && code !== 0x0a) break;
    }
    if (position >= maximumPosition) return false;

    parseStart = position;
    result = state.md.helpers.parseLinkDestination(
      state.src,
      position,
      state.posMax
    );
    if (result.ok) {
      href = state.md.normalizeLink(result.str);
      if (state.md.validateLink(href)) position = result.pos;
      else href = "";
    }

    parseStart = position;
    for (; position < maximumPosition; position++) {
      code = state.src.charCodeAt(position);
      if (!isSpace(code) && code !== 0x0a) break;
    }

    result = state.md.helpers.parseLinkTitle(
      state.src,
      position,
      state.posMax
    );
    if (position < maximumPosition && parseStart !== position && result.ok) {
      title = result.str;
      position = result.pos;

      for (; position < maximumPosition; position++) {
        code = state.src.charCodeAt(position);
        if (!isSpace(code) && code !== 0x0a) break;
      }
    } else {
      title = "";
    }

    if (
      position >= maximumPosition ||
      state.src.charCodeAt(position) !== 0x29
    ) {
      parseReference = true;
    }
    position++;
  }

  if (parseReference) {
    if (typeof state.env.references === "undefined") return false;

    if (
      position < maximumPosition &&
      state.src.charCodeAt(position) === 0x5b
    ) {
      parseStart = position + 1;
      position = state.md.helpers.parseLinkLabel(state, position);
      if (position >= 0) label = state.src.slice(parseStart, position++);
      else position = labelEnd + 1;
    } else {
      position = labelEnd + 1;
    }

    if (!label) label = state.src.slice(labelStart, labelEnd);

    reference = state.env.references[normalizeReference(label)];
    if (!reference) {
      state.pos = originalPosition;
      return false;
    }
    href = reference.href;
    title = reference.title;
  }

  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token = state.push("link_open", "a", 1);
    token.attrs = attrs = [["href", href]];
    if (title) attrs.push(["title", title]);

    state.md.inline.tokenize(state);
    token = state.push("link_close", "a", -1);
  }

  state.pos = position;
  state.posMax = maximumPosition;
  return true;
}

module.exports = markdownLinkRule;

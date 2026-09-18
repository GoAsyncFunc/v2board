var normalizeReference = require("./markdownUtils.js").normalizeReference;
var isSpace = require("./markdownUtils.js").isSpace;

function markdownImageRule(state, silent) {
  var attrs;
  var code;
  var content;
  var label;
  var labelEnd;
  var labelStart;
  var position;
  var reference;
  var result;
  var title;
  var token;
  var childTokens;
  var parseStart;
  var source = "";
  var originalPosition = state.pos;
  var maximumPosition = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21) return false;
  if (state.src.charCodeAt(state.pos + 1) !== 0x5b) return false;

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
  if (labelEnd < 0) return false;

  position = labelEnd + 1;
  if (position < maximumPosition && state.src.charCodeAt(position) === 0x28) {
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
      source = state.md.normalizeLink(result.str);
      if (state.md.validateLink(source)) position = result.pos;
      else source = "";
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
      state.pos = originalPosition;
      return false;
    }
    position++;
  } else {
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
    source = reference.href;
    title = reference.title;
  }

  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    childTokens = [];
    state.md.inline.parse(content, state.md, state.env, childTokens);

    token = state.push("image", "img", 0);
    token.attrs = attrs = [
      ["src", source],
      ["alt", ""]
    ];
    token.children = childTokens;
    token.content = content;
    if (title) attrs.push(["title", title]);
  }

  state.pos = position;
  state.posMax = maximumPosition;
  return true;
}

module.exports = markdownImageRule;

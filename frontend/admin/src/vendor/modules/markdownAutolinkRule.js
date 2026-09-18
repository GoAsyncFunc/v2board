var emailPattern = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
var urlPattern = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;

module.exports = function markdownAutolinkRule(state, silent) {
  var position = state.pos;
  if (state.src.charCodeAt(position) !== 60) return false;

  var start = state.pos;
  var end = state.posMax;
  while (true) {
    position++;
    if (position >= end) return false;
    var characterCode = state.src.charCodeAt(position);
    if (characterCode === 60) return false;
    if (characterCode === 62) break;
  }

  var linkText = state.src.slice(start + 1, position);
  var normalizedUrl;
  if (urlPattern.test(linkText)) {
    normalizedUrl = state.md.normalizeLink(linkText);
  } else if (emailPattern.test(linkText)) {
    normalizedUrl = state.md.normalizeLink("mailto:" + linkText);
  } else {
    return false;
  }
  if (!state.md.validateLink(normalizedUrl)) return false;

  if (!silent) {
    var token = state.push("link_open", "a", 1);
    token.attrs = [["href", normalizedUrl]];
    token.markup = "autolink";
    token.info = "auto";

    token = state.push("text", "", 0);
    token.content = state.md.normalizeLinkText(linkText);

    token = state.push("link_close", "a", -1);
    token.markup = "autolink";
    token.info = "auto";
  }

  state.pos += linkText.length + 2;
  return true;
};

var htmlTagPattern = require("./markdownHtmlRegex.js").HTML_TAG_RE;

function isAsciiLetter(characterCode) {
  var lowerCaseCode = 32 | characterCode;
  return lowerCaseCode >= 97 && lowerCaseCode <= 122;
}

module.exports = function markdownInlineHtmlRule(state, silent) {
  if (!state.md.options.html) return false;

  var start = state.pos;
  var end = state.posMax;
  if (state.src.charCodeAt(start) !== 60 || start + 2 >= end) return false;

  var nextCharacterCode = state.src.charCodeAt(start + 1);
  if (nextCharacterCode !== 33 && nextCharacterCode !== 63 && nextCharacterCode !== 47 && !isAsciiLetter(nextCharacterCode)) {
    return false;
  }

  var match = state.src.slice(start).match(htmlTagPattern);
  if (!match) return false;

  if (!silent) {
    var token = state.push("html_inline", "", 0);
    token.content = state.src.slice(start, start + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};

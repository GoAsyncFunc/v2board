var isSpace = require("./markdownUtils.js").isSpace;

module.exports = function markdownHeadingRule(state, startLine, endLine, silent) {
  var position = state.bMarks[startLine] + state.tShift[startLine];
  var lineEnd = state.eMarks[startLine];

  if (state.sCount[startLine] - state.blkIndent >= 4) return false;

  var characterCode = state.src.charCodeAt(position);
  if (characterCode !== 35 || position >= lineEnd) return false;

  var headingLevel = 1;
  characterCode = state.src.charCodeAt(++position);
  while (characterCode === 35 && position < lineEnd && headingLevel <= 6) {
    headingLevel++;
    characterCode = state.src.charCodeAt(++position);
  }

  if (headingLevel > 6 || position < lineEnd && !isSpace(characterCode)) return false;
  if (silent) return true;

  lineEnd = state.skipSpacesBack(lineEnd, position);
  var trailingMarkerStart = state.skipCharsBack(lineEnd, 35, position);
  if (trailingMarkerStart > position && isSpace(state.src.charCodeAt(trailingMarkerStart - 1))) {
    lineEnd = trailingMarkerStart;
  }

  state.line = startLine + 1;
  var markup = "########".slice(0, headingLevel);
  var token = state.push("heading_open", "h" + String(headingLevel), 1);
  token.markup = markup;
  token.map = [startLine, state.line];

  token = state.push("inline", "", 0);
  token.content = state.src.slice(position, lineEnd).trim();
  token.map = [startLine, state.line];
  token.children = [];

  token = state.push("heading_close", "h" + String(headingLevel), -1);
  token.markup = markup;
  return true;
};

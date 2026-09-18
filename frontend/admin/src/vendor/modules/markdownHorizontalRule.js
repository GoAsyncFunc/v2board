var isSpace = require("./markdownUtils.js").isSpace;

module.exports = function markdownHorizontalRule(state, startLine, endLine, silent) {
  var position = state.bMarks[startLine] + state.tShift[startLine];
  var lineEnd = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;

  var markerCode = state.src.charCodeAt(position++);
  if (markerCode !== 42 && markerCode !== 45 && markerCode !== 95) return false;

  var markerCount = 1;
  while (position < lineEnd) {
    var characterCode = state.src.charCodeAt(position++);
    if (characterCode !== markerCode && !isSpace(characterCode)) return false;
    if (characterCode === markerCode) markerCount++;
  }

  if (markerCount < 3) return false;
  if (silent) return true;

  state.line = startLine + 1;
  var token = state.push("hr", "hr", 0);
  token.map = [startLine, state.line];
  token.markup = Array(markerCount + 1).join(String.fromCharCode(markerCode));
  return true;
};

module.exports = function markdownFenceRule(state, startLine, endLine, silent) {
  var position = state.bMarks[startLine] + state.tShift[startLine];
  var lineEnd = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (position + 3 > lineEnd) return false;

  var markerCode = state.src.charCodeAt(position);
  if (markerCode !== 126 && markerCode !== 96) return false;

  var markerStart = position;
  position = state.skipChars(position, markerCode);
  var markerLength = position - markerStart;
  if (markerLength < 3) return false;

  var markup = state.src.slice(markerStart, position);
  var info = state.src.slice(position, lineEnd);
  if (markerCode === 96 && info.indexOf(String.fromCharCode(markerCode)) >= 0) return false;
  if (silent) return true;

  var nextLine = startLine;
  var foundClosingMarker = false;
  while (true) {
    nextLine++;
    if (nextLine >= endLine) break;

    position = markerStart = state.bMarks[nextLine] + state.tShift[nextLine];
    lineEnd = state.eMarks[nextLine];
    if (position < lineEnd && state.sCount[nextLine] < state.blkIndent) break;

    if (state.src.charCodeAt(position) === markerCode && state.sCount[nextLine] - state.blkIndent < 4) {
      position = state.skipChars(position, markerCode);
      if (position - markerStart >= markerLength) {
        position = state.skipSpaces(position);
        if (position >= lineEnd) {
          foundClosingMarker = true;
          break;
        }
      }
    }
  }

  var indent = state.sCount[startLine];
  state.line = nextLine + (foundClosingMarker ? 1 : 0);
  var token = state.push("fence", "code", 0);
  token.info = info;
  token.content = state.getLines(startLine + 1, nextLine, indent, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
};

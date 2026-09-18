module.exports = function markdownSetextHeadingRule(state, startLine, endLine) {
  var nextLine = startLine + 1;
  var paragraphRules = state.md.block.ruler.getRules("paragraph");
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;

  var previousParentType = state.parentType;
  state.parentType = "paragraph";
  var headingLevel;
  var markerCode;

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3) continue;

    if (state.sCount[nextLine] >= state.blkIndent) {
      var position = state.bMarks[nextLine] + state.tShift[nextLine];
      var lineEnd = state.eMarks[nextLine];
      if (position < lineEnd) {
        markerCode = state.src.charCodeAt(position);
        if (markerCode === 45 || markerCode === 61) {
          position = state.skipChars(position, markerCode);
          position = state.skipSpaces(position);
          if (position >= lineEnd) {
            headingLevel = markerCode === 61 ? 1 : 2;
            break;
          }
        }
      }
    }

    if (state.sCount[nextLine] < 0) continue;
    var terminatesParagraph = false;
    for (var ruleIndex = 0; ruleIndex < paragraphRules.length; ruleIndex++) {
      if (paragraphRules[ruleIndex](state, nextLine, endLine, true)) {
        terminatesParagraph = true;
        break;
      }
    }
    if (terminatesParagraph) break;
  }

  if (!headingLevel) return false;

  var content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine + 1;
  var markup = String.fromCharCode(markerCode);
  var token = state.push("heading_open", "h" + String(headingLevel), 1);
  token.markup = markup;
  token.map = [startLine, state.line];

  token = state.push("inline", "", 0);
  token.content = content;
  token.map = [startLine, state.line - 1];
  token.children = [];

  token = state.push("heading_close", "h" + String(headingLevel), -1);
  token.markup = markup;
  state.parentType = previousParentType;
  return true;
};

module.exports = function markdownParagraphRule(state, startLine) {
  var nextLine = startLine + 1;
  var paragraphRules = state.md.block.ruler.getRules("paragraph");
  var endLine = state.lineMax;
  var previousParentType = state.parentType;
  state.parentType = "paragraph";

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] - state.blkIndent > 3 || state.sCount[nextLine] < 0) continue;

    var terminatesParagraph = false;
    for (var ruleIndex = 0; ruleIndex < paragraphRules.length; ruleIndex++) {
      if (paragraphRules[ruleIndex](state, nextLine, endLine, true)) {
        terminatesParagraph = true;
        break;
      }
    }
    if (terminatesParagraph) break;
  }

  var content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine;
  var token = state.push("paragraph_open", "p", 1);
  token.map = [startLine, state.line];

  token = state.push("inline", "", 0);
  token.content = content;
  token.map = [startLine, state.line];
  token.children = [];

  state.push("paragraph_close", "p", -1);
  state.parentType = previousParentType;
  return true;
};

module.exports = function markdownCodeBlockRule(state, startLine, endLine) {
  if (state.sCount[startLine] - state.blkIndent < 4) return false;

  var nextLine = startLine + 1;
  var lastLine = nextLine;
  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
    } else {
      if (state.sCount[nextLine] - state.blkIndent < 4) break;
      nextLine++;
      lastLine = nextLine;
    }
  }

  state.line = lastLine;
  var token = state.push("code_block", "code", 0);
  token.content = state.getLines(startLine, lastLine, 4 + state.blkIndent, false) + "\n";
  token.map = [startLine, state.line];
  return true;
};

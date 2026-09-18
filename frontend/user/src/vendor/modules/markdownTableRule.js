var isSpace = require("./markdownUtils.js").isSpace;

function getLine(state, line) {
  var start = state.bMarks[line] + state.tShift[line];
  var end = state.eMarks[line];
  return state.src.substr(start, end - start);
}

function splitEscapedColumns(source) {
  var columns = [];
  var position = 0;
  var maximumPosition = source.length;
  var previousWasEscape = false;
  var segmentStart = 0;
  var escapedContent = "";
  var code = source.charCodeAt(position);

  while (position < maximumPosition) {
    if (code === 0x7c) {
      if (previousWasEscape) {
        escapedContent += source.substring(segmentStart, position - 1);
        segmentStart = position;
      } else {
        columns.push(escapedContent + source.substring(segmentStart, position));
        escapedContent = "";
        segmentStart = position + 1;
      }
    }
    previousWasEscape = code === 0x5c;
    position++;
    code = source.charCodeAt(position);
  }

  columns.push(escapedContent + source.substring(segmentStart));
  return columns;
}

function markdownTableRule(state, startLine, endLine, silent) {
  var code;
  var lineText;
  var position;
  var columnIndex;
  var ruleIndex;
  var nextLine;
  var columns;
  var columnCount;
  var token;
  var alignments;
  var alignmentMarker;
  var terminatorRules;
  var tableLines;
  var tbodyLines;
  var oldParentType;
  var terminatesTable;

  if (startLine + 2 > endLine) return false;

  nextLine = startLine + 1;
  if (state.sCount[nextLine] < state.blkIndent) return false;
  if (state.sCount[nextLine] - state.blkIndent >= 4) return false;

  position = state.bMarks[nextLine] + state.tShift[nextLine];
  if (position >= state.eMarks[nextLine]) return false;

  var firstMarker = state.src.charCodeAt(position++);
  if (firstMarker !== 0x7c && firstMarker !== 0x2d && firstMarker !== 0x3a) {
    return false;
  }
  if (position >= state.eMarks[nextLine]) return false;

  var secondMarker = state.src.charCodeAt(position++);
  if (
    secondMarker !== 0x7c &&
    secondMarker !== 0x2d &&
    secondMarker !== 0x3a &&
    !isSpace(secondMarker)
  ) {
    return false;
  }
  if (firstMarker === 0x2d && isSpace(secondMarker)) return false;

  while (position < state.eMarks[nextLine]) {
    code = state.src.charCodeAt(position);
    if (code !== 0x7c && code !== 0x2d && code !== 0x3a && !isSpace(code)) {
      return false;
    }
    position++;
  }

  lineText = getLine(state, nextLine);
  columns = lineText.split("|");
  alignments = [];
  for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    alignmentMarker = columns[columnIndex].trim();
    if (!alignmentMarker) {
      if (columnIndex === 0 || columnIndex === columns.length - 1) continue;
      return false;
    }
    if (!/^:?-+:?$/.test(alignmentMarker)) return false;

    if (alignmentMarker.charCodeAt(alignmentMarker.length - 1) === 0x3a) {
      alignments.push(
        alignmentMarker.charCodeAt(0) === 0x3a ? "center" : "right"
      );
    } else if (alignmentMarker.charCodeAt(0) === 0x3a) {
      alignments.push("left");
    } else {
      alignments.push("");
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf("|") === -1) return false;
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;

  columns = splitEscapedColumns(lineText);
  if (columns.length && columns[0] === "") columns.shift();
  if (columns.length && columns[columns.length - 1] === "") columns.pop();
  columnCount = columns.length;
  if (columnCount === 0 || columnCount !== alignments.length) return false;
  if (silent) return true;

  oldParentType = state.parentType;
  state.parentType = "table";
  terminatorRules = state.md.block.ruler.getRules("blockquote");

  token = state.push("table_open", "table", 1);
  token.map = tableLines = [startLine, 0];
  token = state.push("thead_open", "thead", 1);
  token.map = [startLine, startLine + 1];
  token = state.push("tr_open", "tr", 1);
  token.map = [startLine, startLine + 1];

  for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    token = state.push("th_open", "th", 1);
    if (alignments[columnIndex]) {
      token.attrs = [["style", "text-align:" + alignments[columnIndex]]];
    }
    token = state.push("inline", "", 0);
    token.content = columns[columnIndex].trim();
    token.children = [];
    state.push("th_close", "th", -1);
  }

  state.push("tr_close", "tr", -1);
  state.push("thead_close", "thead", -1);

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) break;

    terminatesTable = false;
    for (ruleIndex = 0; ruleIndex < terminatorRules.length; ruleIndex++) {
      if (terminatorRules[ruleIndex](state, nextLine, endLine, true)) {
        terminatesTable = true;
        break;
      }
    }
    if (terminatesTable) break;

    lineText = getLine(state, nextLine).trim();
    if (!lineText) break;
    if (state.sCount[nextLine] - state.blkIndent >= 4) break;

    columns = splitEscapedColumns(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();

    if (nextLine === startLine + 2) {
      token = state.push("tbody_open", "tbody", 1);
      token.map = tbodyLines = [startLine + 2, 0];
    }

    token = state.push("tr_open", "tr", 1);
    token.map = [nextLine, nextLine + 1];
    for (columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      token = state.push("td_open", "td", 1);
      if (alignments[columnIndex]) {
        token.attrs = [["style", "text-align:" + alignments[columnIndex]]];
      }
      token = state.push("inline", "", 0);
      token.content = columns[columnIndex] ? columns[columnIndex].trim() : "";
      token.children = [];
      state.push("td_close", "td", -1);
    }
    state.push("tr_close", "tr", -1);
  }

  if (tbodyLines) {
    state.push("tbody_close", "tbody", -1);
    tbodyLines[1] = nextLine;
  }
  state.push("table_close", "table", -1);
  tableLines[1] = nextLine;
  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
}

module.exports = markdownTableRule;

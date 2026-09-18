var MarkdownRuler = require("./markdownRuler.js");

var blockRules = [
  ["table", require("./markdownTableRule.js"), ["paragraph", "reference"]],
  ["code", require("./markdownCodeBlockRule.js")],
  ["fence", require("./markdownFenceRule.js"), ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", require("./markdownBlockquoteRule.js"), ["paragraph", "reference", "blockquote", "list"]],
  ["hr", require("./markdownHorizontalRule.js"), ["paragraph", "reference", "blockquote", "list"]],
  ["list", require("./537a354c.js"), ["paragraph", "reference", "blockquote"]],
  ["reference", require("./markdownReferenceRule.js")],
  ["html_block", require("./markdownHtmlBlockRule.js"), ["paragraph", "reference", "blockquote"]],
  ["heading", require("./markdownHeadingRule.js"), ["paragraph", "reference", "blockquote"]],
  ["lheading", require("./markdownSetextHeadingRule.js")],
  ["paragraph", require("./markdownParagraphRule.js")]
];

function MarkdownBlockParser() {
  this.ruler = new MarkdownRuler();
  for (var index = 0; index < blockRules.length; index++) {
    this.ruler.push(blockRules[index][0], blockRules[index][1], {
      alt: (blockRules[index][2] || []).slice()
    });
  }
}

MarkdownBlockParser.prototype.tokenize = function (state, startLine, endLine) {
  var rules = this.ruler.getRules("");
  var ruleCount = rules.length;
  var currentLine = startLine;
  var hasEmptyLines = false;
  var maxNesting = state.md.options.maxNesting;

  while (currentLine < endLine) {
    state.line = currentLine = state.skipEmptyLines(currentLine);
    if (currentLine >= endLine) break;
    if (state.sCount[currentLine] < state.blkIndent) break;
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    for (var ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
      if (rules[ruleIndex](state, currentLine, endLine, false)) break;
    }

    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) hasEmptyLines = true;
    currentLine = state.line;
    if (currentLine < endLine && state.isEmpty(currentLine)) {
      hasEmptyLines = true;
      currentLine++;
      state.line = currentLine;
    }
  }
};

MarkdownBlockParser.prototype.parse = function (source, md, env, outputTokens) {
  if (!source) return;
  var state = new this.State(source, md, env, outputTokens);
  this.tokenize(state, state.line, state.lineMax);
};

MarkdownBlockParser.prototype.State = require("./markdownBlockState.js");

module.exports = MarkdownBlockParser;

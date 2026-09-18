var MarkdownRuler = require("./markdownRuler.js");

var inlineRules = [
  ["text", require("./markdownTextRule.js")],
  ["newline", require("./markdownNewlineRule.js")],
  ["escape", require("./markdownEscapeRule.js")],
  ["backticks", require("./markdownBackticksRule.js")],
  ["strikethrough", require("./markdownStrikethroughRule.js").tokenize],
  ["emphasis", require("./markdownEmphasisRule.js").tokenize],
  ["link", require("./7a512f57.js")],
  ["image", require("./6b79306a.js")],
  ["autolink", require("./markdownAutolinkRule.js")],
  ["html_inline", require("./markdownInlineHtmlRule.js")],
  ["entity", require("./markdownEntityRule.js")]
];

var postProcessingRules = [
  ["balance_pairs", require("./markdownBalancePairsRule.js")],
  ["strikethrough", require("./markdownStrikethroughRule.js").postProcess],
  ["emphasis", require("./markdownEmphasisRule.js").postProcess],
  ["text_collapse", require("./normalizeTokenLevels.js")]
];

function MarkdownInlineParser() {
  var index;
  this.ruler = new MarkdownRuler();
  for (index = 0; index < inlineRules.length; index++) {
    this.ruler.push(inlineRules[index][0], inlineRules[index][1]);
  }

  this.ruler2 = new MarkdownRuler();
  for (index = 0; index < postProcessingRules.length; index++) {
    this.ruler2.push(postProcessingRules[index][0], postProcessingRules[index][1]);
  }
}

MarkdownInlineParser.prototype.skipToken = function (state) {
  var matched;
  var start = state.pos;
  var rules = this.ruler.getRules("");
  var ruleCount = rules.length;
  var maxNesting = state.md.options.maxNesting;
  var cache = state.cache;

  if (typeof cache[start] === "undefined") {
    if (state.level < maxNesting) {
      for (var ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
        state.level++;
        matched = rules[ruleIndex](state, true);
        state.level--;
        if (matched) break;
      }
    } else {
      state.pos = state.posMax;
    }

    if (!matched) state.pos++;
    cache[start] = state.pos;
  } else {
    state.pos = cache[start];
  }
};

MarkdownInlineParser.prototype.tokenize = function (state) {
  var matched;
  var rules = this.ruler.getRules("");
  var ruleCount = rules.length;
  var end = state.posMax;
  var maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    if (state.level < maxNesting) {
      for (var ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
        matched = rules[ruleIndex](state, false);
        if (matched) break;
      }
    }

    if (matched) {
      if (state.pos >= end) break;
    } else {
      state.pending += state.src[state.pos++];
    }
  }

  if (state.pending) state.pushPending();
};

MarkdownInlineParser.prototype.parse = function (source, md, env, outputTokens) {
  var state = new this.State(source, md, env, outputTokens);
  this.tokenize(state);

  var rules = this.ruler2.getRules("");
  for (var index = 0; index < rules.length; index++) rules[index](state);
};

MarkdownInlineParser.prototype.State = require("./markdownInlineState.js");

module.exports = MarkdownInlineParser;

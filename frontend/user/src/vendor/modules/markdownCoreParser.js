var Ruler = require("./markdownRuler.js");

var coreRules = [
  ["normalize", require("./normalizeMarkdownSource.js")],
  ["block", require("./parseMarkdownBlock.js")],
  ["inline", require("./parseMarkdownInline.js")],
  ["linkify", require("./markdownLinkifyRule.js")],
  ["replacements", require("./markdownTextReplacementsRule.js")],
  ["smartquotes", require("./markdownSmartQuotesRule.js")]
];

function MarkdownCoreParser() {
  this.ruler = new Ruler();
  for (var index = 0; index < coreRules.length; index++) {
    this.ruler.push(coreRules[index][0], coreRules[index][1]);
  }
}

MarkdownCoreParser.prototype.process = function (state) {
  var rules = this.ruler.getRules("");
  for (var index = 0; index < rules.length; index++) rules[index](state);
};

MarkdownCoreParser.prototype.State = require("./markdownParserState.js");

module.exports = MarkdownCoreParser;

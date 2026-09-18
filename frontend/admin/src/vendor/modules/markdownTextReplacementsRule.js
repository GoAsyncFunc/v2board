var replacementTestPattern = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
var copyrightTestPattern = /\((c|tm|r|p)\)/i;
var copyrightReplacePattern = /\((c|tm|r|p)\)/gi;
var copyrightSymbols = {
  c: "\xa9",
  r: "\xae",
  p: "\xa7",
  tm: "\u2122"
};

function replaceCopyrightSymbol(match, symbolName) {
  return copyrightSymbols[symbolName.toLowerCase()];
}

function replaceCopyrightTokens(tokens) {
  var autoLinkLevel = 0;
  for (var index = tokens.length - 1; index >= 0; index--) {
    var token = tokens[index];
    if (token.type === "text" && autoLinkLevel === 0) {
      token.content = token.content.replace(copyrightReplacePattern, replaceCopyrightSymbol);
    }
    if (token.type === "link_open" && token.info === "auto") autoLinkLevel--;
    if (token.type === "link_close" && token.info === "auto") autoLinkLevel++;
  }
}

function replacePunctuationTokens(tokens) {
  var autoLinkLevel = 0;
  for (var index = tokens.length - 1; index >= 0; index--) {
    var token = tokens[index];
    if (token.type === "text" && autoLinkLevel === 0 && replacementTestPattern.test(token.content)) {
      token.content = token.content
        .replace(/\+-/g, "\xb1")
        .replace(/\.{2,}/g, "\u2026")
        .replace(/([?!])\u2026/g, "$1..")
        .replace(/([?!]){4,}/g, "$1$1$1")
        .replace(/,{2,}/g, ",")
        .replace(/(^|[^-])---(?=[^-]|$)/gm, "$1\u2014")
        .replace(/(^|\s)--(?=\s|$)/gm, "$1\u2013")
        .replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1\u2013");
    }
    if (token.type === "link_open" && token.info === "auto") autoLinkLevel--;
    if (token.type === "link_close" && token.info === "auto") autoLinkLevel++;
  }
}

module.exports = function markdownTextReplacementsRule(state) {
  if (!state.md.options.typographer) return;

  for (var index = state.tokens.length - 1; index >= 0; index--) {
    var token = state.tokens[index];
    if (token.type !== "inline") continue;
    if (copyrightTestPattern.test(token.content)) replaceCopyrightTokens(token.children);
    if (replacementTestPattern.test(token.content)) replacePunctuationTokens(token.children);
  }
};

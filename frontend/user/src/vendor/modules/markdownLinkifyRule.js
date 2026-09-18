var arrayReplaceAt = require("./markdownUtils.js").arrayReplaceAt;

function isHtmlLinkOpen(content) {
  return /^<a[>\s]/i.test(content);
}

function isHtmlLinkClose(content) {
  return /^<\/a\s*>/i.test(content);
}

module.exports = function markdownLinkifyRule(state) {
  if (!state.md.options.linkify) return;

  var blockTokens = state.tokens;
  for (var blockIndex = 0; blockIndex < blockTokens.length; blockIndex++) {
    var blockToken = blockTokens[blockIndex];
    if (blockToken.type !== "inline" || !state.md.linkify.pretest(blockToken.content)) continue;

    var children = blockToken.children;
    var htmlLinkLevel = 0;
    for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
      var child = children[childIndex];

      if (child.type === "link_close") {
        childIndex--;
        while (children[childIndex].level !== child.level && children[childIndex].type !== "link_open") {
          childIndex--;
        }
        continue;
      }

      if (child.type === "html_inline") {
        if (isHtmlLinkOpen(child.content) && htmlLinkLevel > 0) htmlLinkLevel--;
        if (isHtmlLinkClose(child.content)) htmlLinkLevel++;
      }
      if (htmlLinkLevel > 0 || child.type !== "text" || !state.md.linkify.test(child.content)) continue;

      var source = child.content;
      var matches = state.md.linkify.match(source);
      var replacementTokens = [];
      var level = child.level;
      var lastIndex = 0;

      for (var matchIndex = 0; matchIndex < matches.length; matchIndex++) {
        var match = matches[matchIndex];
        var normalizedUrl = state.md.normalizeLink(match.url);
        if (!state.md.validateLink(normalizedUrl)) continue;

        var linkText = match.text;
        if (match.schema) {
          if (match.schema !== "mailto:" || /^mailto:/i.test(linkText)) {
            linkText = state.md.normalizeLinkText(linkText);
          } else {
            linkText = state.md.normalizeLinkText("mailto:" + linkText).replace(/^mailto:/, "");
          }
        } else {
          linkText = state.md.normalizeLinkText("http://" + linkText).replace(/^http:\/\//, "");
        }

        if (match.index > lastIndex) {
          var token = new state.Token("text", "", 0);
          token.content = source.slice(lastIndex, match.index);
          token.level = level;
          replacementTokens.push(token);
        }

        token = new state.Token("link_open", "a", 1);
        token.attrs = [["href", normalizedUrl]];
        token.level = level++;
        token.markup = "linkify";
        token.info = "auto";
        replacementTokens.push(token);

        token = new state.Token("text", "", 0);
        token.content = linkText;
        token.level = level;
        replacementTokens.push(token);

        token = new state.Token("link_close", "a", -1);
        token.level = --level;
        token.markup = "linkify";
        token.info = "auto";
        replacementTokens.push(token);

        lastIndex = match.lastIndex;
      }

      if (lastIndex < source.length) {
        var trailingToken = new state.Token("text", "", 0);
        trailingToken.content = source.slice(lastIndex);
        trailingToken.level = level;
        replacementTokens.push(trailingToken);
      }

      blockToken.children = children = arrayReplaceAt(children, childIndex, replacementTokens);
    }
  }
};

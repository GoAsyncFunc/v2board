var assign = require("./markdownUtils.js").assign;
var unescapeAll = require("./markdownUtils.js").unescapeAll;
var escapeHtml = require("./markdownUtils.js").escapeHtml;

var defaultRules = {};

function MarkdownRenderer() {
  this.rules = assign({}, defaultRules);
}

defaultRules.code_inline = function (tokens, index, options, env, renderer) {
  var token = tokens[index];
  return "<code" + renderer.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
};

defaultRules.code_block = function (tokens, index, options, env, renderer) {
  var token = tokens[index];
  return "<pre" + renderer.renderAttrs(token) + "><code>" + escapeHtml(token.content) + "</code></pre>\n";
};

defaultRules.fence = function (tokens, index, options, env, renderer) {
  var token = tokens[index];
  var info = token.info ? unescapeAll(token.info).trim() : "";
  var languageName = "";
  var languageAttrs = "";

  if (info) {
    var infoParts = info.split(/(\s+)/g);
    languageName = infoParts[0];
    languageAttrs = infoParts.slice(2).join("");
  }

  var highlighted = options.highlight && options.highlight(token.content, languageName, languageAttrs) || escapeHtml(token.content);
  if (highlighted.indexOf("<pre") === 0) return highlighted + "\n";

  if (info) {
    var classIndex = token.attrIndex("class");
    var attrs = token.attrs ? token.attrs.slice() : [];
    if (classIndex < 0) {
      attrs.push(["class", options.langPrefix + languageName]);
    } else {
      attrs[classIndex] = attrs[classIndex].slice();
      attrs[classIndex][1] += " " + options.langPrefix + languageName;
    }
    return "<pre><code" + renderer.renderAttrs({ attrs: attrs }) + ">" + highlighted + "</code></pre>\n";
  }

  return "<pre><code" + renderer.renderAttrs(token) + ">" + highlighted + "</code></pre>\n";
};

defaultRules.image = function (tokens, index, options, env, renderer) {
  var token = tokens[index];
  token.attrs[token.attrIndex("alt")][1] = renderer.renderInlineAsText(token.children, options, env);
  return renderer.renderToken(tokens, index, options);
};

defaultRules.hardbreak = function (tokens, index, options) {
  return options.xhtmlOut ? "<br />\n" : "<br>\n";
};

defaultRules.softbreak = function (tokens, index, options) {
  return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};

defaultRules.text = function (tokens, index) {
  return escapeHtml(tokens[index].content);
};

defaultRules.html_block = function (tokens, index) {
  return tokens[index].content;
};

defaultRules.html_inline = function (tokens, index) {
  return tokens[index].content;
};

MarkdownRenderer.prototype.renderAttrs = function (token) {
  if (!token.attrs) return "";
  var result = "";
  for (var index = 0; index < token.attrs.length; index++) {
    result += " " + escapeHtml(token.attrs[index][0]) + '=\"' + escapeHtml(token.attrs[index][1]) + '\"';
  }
  return result;
};

MarkdownRenderer.prototype.renderToken = function (tokens, index, options) {
  var token = tokens[index];
  if (token.hidden) return "";

  var result = "";
  if (token.block && token.nesting !== -1 && index && tokens[index - 1].hidden) result += "\n";
  result += (token.nesting === -1 ? "</" : "<") + token.tag;
  result += this.renderAttrs(token);
  if (token.nesting === 0 && options.xhtmlOut) result += " /";

  var needLineFeed = false;
  if (token.block) {
    needLineFeed = true;
    if (token.nesting === 1 && index + 1 < tokens.length) {
      var nextToken = tokens[index + 1];
      if (nextToken.type === "inline" || nextToken.hidden || nextToken.nesting === -1 && nextToken.tag === token.tag) {
        needLineFeed = false;
      }
    }
  }

  result += needLineFeed ? ">\n" : ">";
  return result;
};

MarkdownRenderer.prototype.renderInline = function (tokens, options, env) {
  var result = "";
  for (var index = 0; index < tokens.length; index++) {
    var type = tokens[index].type;
    result += typeof this.rules[type] !== "undefined"
      ? this.rules[type](tokens, index, options, env, this)
      : this.renderToken(tokens, index, options);
  }
  return result;
};

MarkdownRenderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = "";
  for (var index = 0; index < tokens.length; index++) {
    if (tokens[index].type === "text") result += tokens[index].content;
    else if (tokens[index].type === "image") result += this.renderInlineAsText(tokens[index].children, options, env);
    else if (tokens[index].type === "softbreak") result += "\n";
  }
  return result;
};

MarkdownRenderer.prototype.render = function (tokens, options, env) {
  var result = "";
  for (var index = 0; index < tokens.length; index++) {
    var type = tokens[index].type;
    if (type === "inline") result += this.renderInline(tokens[index].children, options, env);
    else if (typeof this.rules[type] !== "undefined") result += this.rules[type](tokens, index, options, env, this);
    else result += this.renderToken(tokens, index, options);
  }
  return result;
};

module.exports = MarkdownRenderer;

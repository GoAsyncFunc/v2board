var markdownUtils = require("./markdownUtils.js");
var linkParsers = require("./markdownLinkParsers.js");
var MarkdownRenderer = require("./664d492b.js");
var MarkdownCoreParser = require("./markdownCoreParser.js");
var MarkdownBlockParser = require("./markdownBlockParser.js");
var MarkdownInlineParser = require("./markdownInlineParser.js");
var Linkify = require("./2b383050.js");
var markdownUrl = require("./markdownUrl.js");
var punycode = require("./47595779.js");

var presets = {
  default: require("./markdownEmptyConfig.js"),
  zero: require("./markdownDefaultConfig.js"),
  commonmark: require("./516f302b.js")
};

var unsafeProtocolPattern = /^(vbscript|javascript|file|data):/;
var safeDataImagePattern = /^data:image\/(gif|png|jpeg|webp);/;
var normalizedProtocols = ["http:", "https:", "mailto:"];

function validateLink(url) {
  var normalizedUrl = url.trim().toLowerCase();
  return !unsafeProtocolPattern.test(normalizedUrl) || safeDataImagePattern.test(normalizedUrl);
}

function normalizeLink(url) {
  var parsedUrl = markdownUrl.parse(url, true);
  if (parsedUrl.hostname && (!parsedUrl.protocol || normalizedProtocols.indexOf(parsedUrl.protocol) >= 0)) {
    try {
      parsedUrl.hostname = punycode.toASCII(parsedUrl.hostname);
    } catch (error) {}
  }
  return markdownUrl.encode(markdownUrl.format(parsedUrl));
}

function normalizeLinkText(url) {
  var parsedUrl = markdownUrl.parse(url, true);
  if (parsedUrl.hostname && (!parsedUrl.protocol || normalizedProtocols.indexOf(parsedUrl.protocol) >= 0)) {
    try {
      parsedUrl.hostname = punycode.toUnicode(parsedUrl.hostname);
    } catch (error) {}
  }
  return markdownUrl.decode(markdownUrl.format(parsedUrl), markdownUrl.decode.defaultChars + "%");
}

function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) return new MarkdownIt(presetName, options);

  if (!options && !markdownUtils.isString(presetName)) {
    options = presetName || {};
    presetName = "default";
  }

  this.inline = new MarkdownInlineParser();
  this.block = new MarkdownBlockParser();
  this.core = new MarkdownCoreParser();
  this.renderer = new MarkdownRenderer();
  this.linkify = new Linkify();
  this.validateLink = validateLink;
  this.normalizeLink = normalizeLink;
  this.normalizeLinkText = normalizeLinkText;
  this.utils = markdownUtils;
  this.helpers = markdownUtils.assign({}, linkParsers);
  this.options = {};

  this.configure(presetName);
  if (options) this.set(options);
}

MarkdownIt.prototype.set = function (options) {
  markdownUtils.assign(this.options, options);
  return this;
};

MarkdownIt.prototype.configure = function (preset) {
  var presetName;
  var markdown = this;

  if (markdownUtils.isString(preset)) {
    presetName = preset;
    preset = presets[presetName];
    if (!preset) throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
  }
  if (!preset) throw new Error("Wrong `markdown-it` preset, can't be empty");

  if (preset.options) markdown.set(preset.options);
  if (preset.components) {
    Object.keys(preset.components).forEach(function (componentName) {
      var component = preset.components[componentName];
      if (component.rules) markdown[componentName].ruler.enableOnly(component.rules);
      if (component.rules2) markdown[componentName].ruler2.enableOnly(component.rules2);
    });
  }
  return this;
};

MarkdownIt.prototype.enable = function (ruleNames, ignoreInvalid) {
  if (!Array.isArray(ruleNames)) ruleNames = [ruleNames];
  var enabled = [];

  ["core", "block", "inline"].forEach(function (componentName) {
    enabled = enabled.concat(this[componentName].ruler.enable(ruleNames, true));
  }, this);
  enabled = enabled.concat(this.inline.ruler2.enable(ruleNames, true));

  var missed = ruleNames.filter(function (ruleName) {
    return enabled.indexOf(ruleName) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
  }
  return this;
};

MarkdownIt.prototype.disable = function (ruleNames, ignoreInvalid) {
  if (!Array.isArray(ruleNames)) ruleNames = [ruleNames];
  var disabled = [];

  ["core", "block", "inline"].forEach(function (componentName) {
    disabled = disabled.concat(this[componentName].ruler.disable(ruleNames, true));
  }, this);
  disabled = disabled.concat(this.inline.ruler2.disable(ruleNames, true));

  var missed = ruleNames.filter(function (ruleName) {
    return disabled.indexOf(ruleName) < 0;
  });
  if (missed.length && !ignoreInvalid) {
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
  }
  return this;
};

MarkdownIt.prototype.use = function (plugin) {
  var args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};

MarkdownIt.prototype.parse = function (source, env) {
  if (typeof source !== "string") throw new Error("Input data should be a String");
  var state = new this.core.State(source, this, env);
  this.core.process(state);
  return state.tokens;
};

MarkdownIt.prototype.render = function (source, env) {
  env = env || {};
  return this.renderer.render(this.parse(source, env), this.options, env);
};

MarkdownIt.prototype.parseInline = function (source, env) {
  var state = new this.core.State(source, this, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};

MarkdownIt.prototype.renderInline = function (source, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(source, env), this.options, env);
};

module.exports = MarkdownIt;

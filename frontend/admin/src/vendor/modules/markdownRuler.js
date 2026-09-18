function MarkdownRuler() {
  this.__rules__ = [];
  this.__cache__ = null;
}

MarkdownRuler.prototype.__find__ = function (name) {
  for (var index = 0; index < this.__rules__.length; index++) {
    if (this.__rules__[index].name === name) return index;
  }
  return -1;
};

MarkdownRuler.prototype.__compile__ = function () {
  var ruler = this;
  var chains = [""];

  ruler.__rules__.forEach(function (rule) {
    if (!rule.enabled) return;
    rule.alt.forEach(function (chainName) {
      if (chains.indexOf(chainName) < 0) chains.push(chainName);
    });
  });

  ruler.__cache__ = {};
  chains.forEach(function (chainName) {
    ruler.__cache__[chainName] = [];
    ruler.__rules__.forEach(function (rule) {
      if (rule.enabled && (!chainName || rule.alt.indexOf(chainName) >= 0)) {
        ruler.__cache__[chainName].push(rule.fn);
      }
    });
  });
};

MarkdownRuler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  options = options || {};
  if (index === -1) throw new Error("Parser rule not found: " + name);

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = options.alt || [];
  this.__cache__ = null;
};

MarkdownRuler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  options = options || {};
  if (index === -1) throw new Error("Parser rule not found: " + beforeName);

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: options.alt || []
  });
  this.__cache__ = null;
};

MarkdownRuler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  options = options || {};
  if (index === -1) throw new Error("Parser rule not found: " + afterName);

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: options.alt || []
  });
  this.__cache__ = null;
};

MarkdownRuler.prototype.push = function (name, fn, options) {
  options = options || {};
  this.__rules__.push({
    name: name,
    enabled: true,
    fn: fn,
    alt: options.alt || []
  });
  this.__cache__ = null;
};

MarkdownRuler.prototype.enable = function (names, ignoreInvalid) {
  if (!Array.isArray(names)) names = [names];
  var enabled = [];

  names.forEach(function (name) {
    var index = this.__find__(name);
    if (index < 0) {
      if (ignoreInvalid) return;
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[index].enabled = true;
    enabled.push(name);
  }, this);

  this.__cache__ = null;
  return enabled;
};

MarkdownRuler.prototype.enableOnly = function (names, ignoreInvalid) {
  if (!Array.isArray(names)) names = [names];
  this.__rules__.forEach(function (rule) {
    rule.enabled = false;
  });
  this.enable(names, ignoreInvalid);
};

MarkdownRuler.prototype.disable = function (names, ignoreInvalid) {
  if (!Array.isArray(names)) names = [names];
  var disabled = [];

  names.forEach(function (name) {
    var index = this.__find__(name);
    if (index < 0) {
      if (ignoreInvalid) return;
      throw new Error("Rules manager: invalid rule name " + name);
    }
    this.__rules__[index].enabled = false;
    disabled.push(name);
  }, this);

  this.__cache__ = null;
  return disabled;
};

MarkdownRuler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) this.__compile__();
  return this.__cache__[chainName] || [];
};

module.exports = MarkdownRuler;

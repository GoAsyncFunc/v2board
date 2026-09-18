var indexOf = require("./arrayIndexOf.js"),
  whitespacePattern = /\s+/,
  objectToString = Object.prototype.toString;

function DomClassList(element) {
  if (!element || !element.nodeType) throw new Error("A DOM element reference is required");
  this.element = element;
  this.classList = element.classList;
}

DomClassList.prototype.add = function add(name) {
  if (this.classList) {
    this.classList.add(name);
    return this;
  }
  var classes = this.toArray();
  if (!~indexOf(classes, name)) classes.push(name);
  this.element.className = classes.join(" ");
  return this;
};

DomClassList.prototype.remove = function remove(name) {
  if ("[object RegExp]" == objectToString.call(name)) return this.removeMatching(name);
  if (this.classList) {
    this.classList.remove(name);
    return this;
  }
  var classes = this.toArray(),
    index = indexOf(classes, name);
  if (~index) classes.splice(index, 1);
  this.element.className = classes.join(" ");
  return this;
};

DomClassList.prototype.removeMatching = function removeMatching(pattern) {
  var classes = this.toArray();
  for (var index = 0; index < classes.length; index++) {
    if (pattern.test(classes[index])) this.remove(classes[index]);
  }
  return this;
};

DomClassList.prototype.toggle = function toggle(name, force) {
  if (this.classList) {
    if ("undefined" !== typeof force) {
      if (force !== this.classList.toggle(name, force)) this.classList.toggle(name);
    } else this.classList.toggle(name);
    return this;
  }
  if ("undefined" !== typeof force) {
    if (force) this.add(name);else this.remove(name);
  } else if (this.has(name)) this.remove(name);else this.add(name);
  return this;
};

DomClassList.prototype.toArray = function toArray() {
  var className = this.element.getAttribute("class") || "",
    trimmed = className.replace(/^\s+|\s+$/g, ""),
    classes = trimmed.split(whitespacePattern);
  if ("" === classes[0]) classes.shift();
  return classes;
};

DomClassList.prototype.array = DomClassList.prototype.toArray;
DomClassList.prototype.has = DomClassList.prototype.contains = function contains(name) {
  return this.classList ? this.classList.contains(name) : !!~indexOf(this.toArray(), name);
};

module.exports = function domClassList(element) {
  return new DomClassList(element);
};

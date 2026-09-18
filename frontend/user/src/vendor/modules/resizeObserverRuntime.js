var globalObject = require("./globalObjectLegacy.js");

function findEntryIndex(entries, key) {
  for (var index = 0; index < entries.length; index += 1) {
    if (entries[index][0] === key) return index;
  }
  return -1;
}

class MapShim {
  constructor() {
    this.entries = [];
  }

  get size() {
    return this.entries.length;
  }

  get(key) {
    var entry = this.entries[findEntryIndex(this.entries, key)];
    return entry && entry[1];
  }

  set(key, value) {
    var index = findEntryIndex(this.entries, key);
    if (index === -1) this.entries.push([key, value]);
    else this.entries[index][1] = value;
  }

  delete(key) {
    var index = findEntryIndex(this.entries, key);
    if (index !== -1) this.entries.splice(index, 1);
  }

  has(key) {
    return findEntryIndex(this.entries, key) !== -1;
  }

  clear() {
    this.entries.splice(0);
  }

  forEach(callback, context) {
    this.entries.forEach(function (entry) {
      callback.call(context || null, entry[1], entry[0]);
    });
  }
}

var ObserverMap = typeof Map !== "undefined" ? Map : MapShim;
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var requestFrame = typeof requestAnimationFrame === "function"
  ? requestAnimationFrame.bind(globalObject)
  : function (callback) {
    return setTimeout(function () {
      callback(Date.now());
    }, 1000 / 60);
  };

function defineReadOnlyProperties(target, properties) {
  Object.keys(properties).forEach(function (key) {
    Object.defineProperty(target, key, {
      value: properties[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  });
  return target;
}

function getWindowOf(target) {
  return target && target.ownerDocument && target.ownerDocument.defaultView || globalObject;
}

function throttle(callback, delay) {
  var leadingCall = false;
  var trailingCall = false;
  var lastCallTime = 0;

  function proxy() {
    var timestamp = Date.now();
    if (leadingCall) {
      if (timestamp - lastCallTime < 2) return;
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(function () {
        requestFrame(function () {
          if (leadingCall) {
            leadingCall = false;
            callback();
          }
          if (trailingCall) proxy();
        });
      }, delay);
    }
    lastCallTime = timestamp;
  }

  return proxy;
}

module.exports = {
  ObserverMap: ObserverMap,
  defineReadOnlyProperties: defineReadOnlyProperties,
  getWindowOf: getWindowOf,
  globalObject: globalObject,
  isBrowser: isBrowser,
  throttle: throttle
};

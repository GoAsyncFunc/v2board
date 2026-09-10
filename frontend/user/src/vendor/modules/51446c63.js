let legacyModule = module,
  legacyExports = exports;
function r() {
  return !1;
}
function o() {
  return !0;
}
function i() {
  this.timeStamp = Date.now(), this.target = void 0, this.currentTarget = void 0;
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), i.prototype = {
  isEventObject: 1,
  constructor: i,
  isDefaultPrevented: r,
  isPropagationStopped: r,
  isImmediatePropagationStopped: r,
  preventDefault: function () {
    this.isDefaultPrevented = o;
  },
  stopPropagation: function () {
    this.isPropagationStopped = o;
  },
  stopImmediatePropagation: function () {
    this.isImmediatePropagationStopped = o, this.stopPropagation();
  },
  halt: function (e) {
    e ? this.stopImmediatePropagation() : this.stopPropagation(), this.preventDefault();
  }
}, legacyExports["default"] = i, legacyModule.exports = legacyExports["default"];

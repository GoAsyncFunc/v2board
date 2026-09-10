let legacyModule = module,
  legacyExports = exports;
function r() {
  return !1;
}
function i() {
  return !0;
}
function o() {
  this.timeStamp = Date.now(), this.target = void 0, this.currentTarget = void 0;
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), o.prototype = {
  isEventObject: 1,
  constructor: o,
  isDefaultPrevented: r,
  isPropagationStopped: r,
  isImmediatePropagationStopped: r,
  preventDefault: function () {
    this.isDefaultPrevented = i;
  },
  stopPropagation: function () {
    this.isPropagationStopped = i;
  },
  stopImmediatePropagation: function () {
    this.isImmediatePropagationStopped = i, this.stopPropagation();
  },
  halt: function (e) {
    e ? this.stopImmediatePropagation() : this.stopPropagation(), this.preventDefault();
  }
}, legacyExports["default"] = o, legacyModule.exports = legacyExports["default"];

let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var i = require("./51446c63.js"),
  o = r(i),
  a = require("./4d677a57.js"),
  s = r(a),
  l = !0,
  c = !1,
  u = ["altKey", "bubbles", "cancelable", "ctrlKey", "currentTarget", "eventPhase", "metaKey", "shiftKey", "target", "timeStamp", "view", "type"];
function h(e) {
  return null === e || void 0 === e;
}
var f = [{
  reg: /^key/,
  props: ["char", "charCode", "key", "keyCode", "which"],
  fix: function (e, t) {
    h(e.which) && (e.which = h(t.charCode) ? t.keyCode : t.charCode), void 0 === e.metaKey && (e.metaKey = e.ctrlKey);
  }
}, {
  reg: /^touch/,
  props: ["touches", "changedTouches", "targetTouches"]
}, {
  reg: /^hashchange$/,
  props: ["newURL", "oldURL"]
}, {
  reg: /^gesturechange$/i,
  props: ["rotation", "scale"]
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function (e, t) {
    var n = void 0,
      r = void 0,
      i = void 0,
      o = t.wheelDelta,
      a = t.axis,
      s = t.wheelDeltaY,
      l = t.wheelDeltaX,
      c = t.detail;
    o && (i = o / 120), c && (i = 0 - (c % 3 === 0 ? c / 3 : c)), void 0 !== a && (a === e.HORIZONTAL_AXIS ? (r = 0, n = 0 - i) : a === e.VERTICAL_AXIS && (n = 0, r = i)), void 0 !== s && (r = s / 120), void 0 !== l && (n = -1 * l / 120), n || r || (r = i), void 0 !== n && (e.deltaX = n), void 0 !== r && (e.deltaY = r), void 0 !== i && (e.delta = i);
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ["buttons", "clientX", "clientY", "button", "offsetX", "relatedTarget", "which", "fromElement", "toElement", "offsetY", "pageX", "pageY", "screenX", "screenY"],
  fix: function (e, t) {
    var n = void 0,
      r = void 0,
      i = void 0,
      o = e.target,
      a = t.button;
    return o && h(e.pageX) && !h(t.clientX) && (n = o.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === o ? e.toElement : e.fromElement), e;
  }
}];
function d() {
  return l;
}
function p() {
  return c;
}
function m(e) {
  var t = e.type,
    n = "function" === typeof e.stopPropagation || "boolean" === typeof e.cancelBubble;
  o["default"].call(this), this.nativeEvent = e;
  var r = p;
  "defaultPrevented" in e ? r = e.defaultPrevented ? d : p : "getPreventDefault" in e ? r = e.getPreventDefault() ? d : p : "returnValue" in e && (r = e.returnValue === c ? d : p), this.isDefaultPrevented = r;
  var i = [],
    a = void 0,
    s = void 0,
    l = void 0,
    h = u.concat();
  f.forEach(function (e) {
    t.match(e.reg) && (h = h.concat(e.props), e.fix && i.push(e.fix));
  }), s = h.length;
  while (s) l = h[--s], this[l] = e[l];
  !this.target && n && (this.target = e.srcElement || document), this.target && 3 === this.target.nodeType && (this.target = this.target.parentNode), s = i.length;
  while (s) a = i[--s], a(this, e);
  this.timeStamp = e.timeStamp || Date.now();
}
var g = o["default"].prototype;
(0, s["default"])(m.prototype, g, {
  constructor: m,
  preventDefault: function () {
    var e = this.nativeEvent;
    e.preventDefault ? e.preventDefault() : e.returnValue = c, g.preventDefault.call(this);
  },
  stopPropagation: function () {
    var e = this.nativeEvent;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = l, g.stopPropagation.call(this);
  }
}), legacyExports["default"] = m, legacyModule.exports = legacyExports["default"];

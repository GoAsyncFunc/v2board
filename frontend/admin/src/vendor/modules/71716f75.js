let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./71317449.js"),
  i = interopDefault(r);
if ("undefined" !== typeof Element && !Element.prototype.matches) {
  var o = Element.prototype;
  o.matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector;
}
var a = function (e, t, n) {
    var r = e;
    while (r) {
      var i = r === n || r === document.body;
      if (i || 1 === r.nodeType && r.matches(t)) {
        i && (r = null);
        break;
      }
      r = r.parentNode;
    }
    return r;
  },
  s = function (e) {
    var t = e;
    do {
      var n = window.getComputedStyle(t),
        r = n.overflow;
      if (("auto" === r || "scroll" === r) && t && t.nodeType && (t.offsetWidth < t.scrollWidth || t.offsetHeight < t.scrollHeight)) break;
      if (!t || !t.nodeType || t === document.body) {
        t = null;
        break;
      }
      t = t.parentNode;
    } while (t);
    return t;
  },
  l = function (e, t) {
    return Array.from(e.parentNode.children).filter(e => "" === t || !e.matches(t)).indexOf(e);
  },
  c = "tr",
  u = {
    TOP: 1,
    BOTTOM: 3
  },
  h = "px",
  f = "position:fixed;z-index:9999;height:0;margin-top:-1px;border-bottom:dashed 2px rgba(0,0,0,.3);display:none;";
class d extends r["Component"] {
  constructor(e) {
    super(e), this.onMouseDown = this.onMouseDown.bind(this), this.onDragStart = this.onDragStart.bind(this), this.onDragEnter = this.onDragEnter.bind(this), this.onDragEnd = this.onDragEnd.bind(this), this.autoScroll = this.autoScroll.bind(this), this.state = {
      fromIndex: -1,
      toIndex: -1
    }, this.scrollElement = null, this.scrollTimerId = -1, this.direction = u.BOTTOM;
  }
  componentWillUnmount() {
    this.dragLine && this.dragLine.parentNode && (this.dragLine.parentNode.removeChild(this.dragLine), this.dragLine = null, this.cacheDragTarget = null);
  }
  onMouseDown(e) {
    var t = this.getHandleNode(e.target);
    if (t) {
      var n = this.props.handleSelector && this.props.handleSelector !== this.props.nodeSelector ? this.getDragNode(t) : t;
      n && (t.setAttribute("draggable", !1), n.setAttribute("draggable", !0), n.ondragstart = this.onDragStart, n.ondragend = this.onDragEnd);
    }
  }
  onDragStart(e) {
    var t = this.getDragNode(e.target),
      n = e;
    if (t) {
      var r = t.parentNode;
      n.dataTransfer.setData("Text", ""), n.dataTransfer.effectAllowed = "move", r.ondragenter = this.onDragEnter, r.ondragover = function (e) {
        return e.preventDefault(), !0;
      };
      var i = l(t, this.props.ignoreSelector);
      this.setState({
        fromIndex: i,
        toIndex: i
      }), this.scrollElement = s(r);
    }
  }
  onDragEnter(e) {
    var t,
      n = this.getDragNode(e.target),
      r = e;
    n ? (t = l(n, this.props.ignoreSelector), this.props.enableScroll && this.resolveAutoScroll(r, n)) : (t = -1, this.stopAutoScroll()), this.cacheDragTarget = n, this.setState({
      toIndex: t
    }), this.fixDragLine(n);
  }
  onDragEnd(e) {
    var t = this.getDragNode(e.target);
    this.stopAutoScroll(), t && (t.removeAttribute("draggable"), t.ondragstart = null, t.ondragend = null, t.parentNode.ondragenter = null, t.parentNode.ondragover = null, this.state.fromIndex >= 0 && this.state.fromIndex !== this.state.toIndex && this.props.onDragEnd(this.state.fromIndex, this.state.toIndex)), this.hideDragLine(), this.setState({
      fromIndex: -1,
      toIndex: -1
    });
  }
  getDragNode(e) {
    return a(e, this.props.nodeSelector, this.dragList);
  }
  getHandleNode(e) {
    return a(e, this.props.handleSelector || this.props.nodeSelector, this.dragList);
  }
  getDragLine() {
    return this.dragLine || (this.dragLine = window.document.createElement("div"), this.dragLine.setAttribute("style", f), window.document.body.appendChild(this.dragLine)), this.dragLine.className = this.props.lineClassName || "", this.dragLine;
  }
  resolveAutoScroll(e, t) {
    if (this.scrollElement) {
      var n = this.scrollElement.getBoundingClientRect(),
        r = n.top,
        i = n.height,
        o = t.offsetHeight,
        a = e.pageY,
        s = o * (2 / 3);
      this.direction = 0, a > r + i - s ? this.direction = u.BOTTOM : a < r + s && (this.direction = u.TOP), this.direction ? this.scrollTimerId < 0 && (this.scrollTimerId = setInterval(this.autoScroll, 20)) : this.stopAutoScroll();
    }
  }
  stopAutoScroll() {
    clearInterval(this.scrollTimerId), this.scrollTimerId = -1, this.fixDragLine(this.cacheDragTarget);
  }
  autoScroll() {
    var e = this.scrollElement.scrollTop;
    this.direction === u.BOTTOM ? (this.scrollElement.scrollTop = e + this.props.scrollSpeed, e === this.scrollElement.scrollTop && this.stopAutoScroll()) : this.direction === u.TOP ? (this.scrollElement.scrollTop = e - this.props.scrollSpeed, this.scrollElement.scrollTop <= 0 && this.stopAutoScroll()) : this.stopAutoScroll();
  }
  hideDragLine() {
    this.dragLine && (this.dragLine.style.display = "none");
  }
  fixDragLine(e) {
    var t = this.getDragLine();
    if (!e || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) this.hideDragLine();else {
      var n = e.getBoundingClientRect(),
        r = n.left,
        i = n.top,
        o = n.width,
        a = n.height,
        s = this.state.toIndex < this.state.fromIndex ? i : i + a;
      if (this.props.enableScroll && this.scrollElement) {
        var l = this.scrollElement.getBoundingClientRect(),
          c = l.height,
          u = l.top;
        if (s < u - 2 || s > u + c + 2) return void this.hideDragLine();
      }
      t.style.left = r + h, t.style.width = o + h, t.style.top = s + h, t.style.display = "block";
    }
  }
  render() {
    return i.a.createElement("div", {
      role: "presentation",
      onMouseDown: this.onMouseDown,
      ref: e => {
        this.dragList = e;
      }
    }, this.props.children);
  }
}
d.defaultProps = {
  nodeSelector: c,
  ignoreSelector: "",
  enableScroll: !0,
  scrollSpeed: 10,
  handleSelector: "",
  lineClassName: "",
  children: null
};
var p = d,
  m = "px",
  g = "width:0;margin-left:-1px;margin-top:0;border-bottom:0 none;border-left:dashed 2px rgba(0,0,0,.3);",
  v = {
    RIGHT: 2,
    LEFT: 4
  };
class y extends p {
  getDragLine() {
    return this.dragLine || (super.getDragLine(), this.dragLine.setAttribute("style", this.dragLine.getAttribute("style") + g)), this.dragLine;
  }
  resolveAutoScroll(e, t) {
    if (this.scrollElement) {
      var n = this.scrollElement.getBoundingClientRect(),
        r = n.left,
        i = n.width,
        o = t.offsetWidth,
        a = e.pageX,
        s = 2 * o / 3;
      this.direction = 0, a > r + i - s ? this.direction = v.RIGHT : a < r + s && (this.direction = v.LEFT), this.direction ? this.scrollTimerId < 0 && (this.scrollTimerId = setInterval(this.autoScroll, 20)) : this.stopAutoScroll();
    }
  }
  autoScroll() {
    var e = this.scrollElement.scrollLeft;
    this.direction === v.RIGHT ? (this.scrollElement.scrollLeft = e + this.props.scrollSpeed, e === this.scrollElement.scrollLeft && this.stopAutoScroll()) : this.direction === v.LEFT ? (this.scrollElement.scrollLeft = e - this.props.scrollSpeed, this.scrollElement.scrollLeft <= 0 && this.stopAutoScroll()) : this.stopAutoScroll();
  }
  fixDragLine(e) {
    var t = this.getDragLine();
    if (!e || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) this.hideDragLine();else {
      var n = e.getBoundingClientRect(),
        r = n.left,
        i = n.top,
        o = n.width,
        a = n.height,
        s = this.state.toIndex < this.state.fromIndex ? r : r + o;
      if (this.props.enableScroll && this.scrollElement) {
        var l = this.scrollElement.getBoundingClientRect(),
          c = l.width,
          u = l.left;
        if (s < u - 2 || s > u + c + 2) return void this.hideDragLine();
      }
      t.style.top = i + m, t.style.height = a + m, t.style.left = s + m, t.style.display = "block";
    }
  }
}
var b = y;
p.DragColumn = b;
legacyExports["a"] = p;

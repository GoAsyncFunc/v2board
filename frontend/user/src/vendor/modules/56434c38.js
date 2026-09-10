let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
function r() {
  var e = this.constructor.getDerivedStateFromProps(this.props, this.state);
  null !== e && void 0 !== e && this.setState(e);
}
function o(e) {
  function t(t) {
    var n = this.constructor.getDerivedStateFromProps(e, t);
    return null !== n && void 0 !== n ? n : null;
  }
  this.setState(t.bind(this));
}
function i(e, t) {
  try {
    var n = this.props,
      r = this.state;
    this.props = e, this.state = t, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(n, r);
  } finally {
    this.props = n, this.state = r;
  }
}
function a(e) {
  var t = e.prototype;
  if (!t || !t.isReactComponent) throw new Error("Can only polyfill class components");
  if ("function" !== typeof e.getDerivedStateFromProps && "function" !== typeof t.getSnapshotBeforeUpdate) return e;
  var n = null,
    a = null,
    s = null;
  if ("function" === typeof t.componentWillMount ? n = "componentWillMount" : "function" === typeof t.UNSAFE_componentWillMount && (n = "UNSAFE_componentWillMount"), "function" === typeof t.componentWillReceiveProps ? a = "componentWillReceiveProps" : "function" === typeof t.UNSAFE_componentWillReceiveProps && (a = "UNSAFE_componentWillReceiveProps"), "function" === typeof t.componentWillUpdate ? s = "componentWillUpdate" : "function" === typeof t.UNSAFE_componentWillUpdate && (s = "UNSAFE_componentWillUpdate"), null !== n || null !== a || null !== s) {
    var c = e.displayName || e.name,
      u = "function" === typeof e.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
    throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + c + " uses " + u + " but also contains the following legacy lifecycles:" + (null !== n ? "\n  " + n : "") + (null !== a ? "\n  " + a : "") + (null !== s ? "\n  " + s : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
  }
  if ("function" === typeof e.getDerivedStateFromProps && (t.componentWillMount = r, t.componentWillReceiveProps = o), "function" === typeof t.getSnapshotBeforeUpdate) {
    if ("function" !== typeof t.componentDidUpdate) throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
    t.componentWillUpdate = i;
    var l = t.componentDidUpdate;
    t.componentDidUpdate = function (e, t, n) {
      var r = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : n;
      l.call(this, e, t, r);
    };
  }
  return e;
}
markEsModule(legacyExports), defineExport(legacyExports, "polyfill", function () {
  return a;
}), r.__suppressDeprecationWarning = !0, o.__suppressDeprecationWarning = !0, i.__suppressDeprecationWarning = !0;

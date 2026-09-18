let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
function applyDerivedStateFromProps() {
  var derivedState = this.constructor.getDerivedStateFromProps(this.props, this.state);
  null !== derivedState && void 0 !== derivedState && this.setState(derivedState);
}
function applyDerivedStateFromPropsOnReceiveProps(nextProps) {
  function getDerivedState(nextState) {
    var derivedState = this.constructor.getDerivedStateFromProps(nextProps, nextState);
    return null !== derivedState && void 0 !== derivedState ? derivedState : null;
  }
  this.setState(getDerivedState.bind(this));
}
function captureSnapshotBeforeUpdate(nextProps, nextState) {
  try {
    var previousProps = this.props,
      previousState = this.state;
    this.props = nextProps, this.state = nextState, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(previousProps, previousState);
  } finally {
    this.props = previousProps, this.state = previousState;
  }
}
function polyfill(Component) {
  var prototype = Component.prototype;
  if (!prototype || !prototype.isReactComponent) throw new Error("Can only polyfill class components");
  if ("function" !== typeof Component.getDerivedStateFromProps && "function" !== typeof prototype.getSnapshotBeforeUpdate) return Component;
  var componentWillMountName = null,
    componentWillReceivePropsName = null,
    componentWillUpdateName = null;
  if ("function" === typeof prototype.componentWillMount ? componentWillMountName = "componentWillMount" : "function" === typeof prototype.UNSAFE_componentWillMount && (componentWillMountName = "UNSAFE_componentWillMount"), "function" === typeof prototype.componentWillReceiveProps ? componentWillReceivePropsName = "componentWillReceiveProps" : "function" === typeof prototype.UNSAFE_componentWillReceiveProps && (componentWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), "function" === typeof prototype.componentWillUpdate ? componentWillUpdateName = "componentWillUpdate" : "function" === typeof prototype.UNSAFE_componentWillUpdate && (componentWillUpdateName = "UNSAFE_componentWillUpdate"), null !== componentWillMountName || null !== componentWillReceivePropsName || null !== componentWillUpdateName) {
    var displayName = Component.displayName || Component.name,
      newLifecycleName = "function" === typeof Component.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
    throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + displayName + " uses " + newLifecycleName + " but also contains the following legacy lifecycles:" + (null !== componentWillMountName ? "\n  " + componentWillMountName : "") + (null !== componentWillReceivePropsName ? "\n  " + componentWillReceivePropsName : "") + (null !== componentWillUpdateName ? "\n  " + componentWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
  }
  if ("function" === typeof Component.getDerivedStateFromProps && (prototype.componentWillMount = applyDerivedStateFromProps, prototype.componentWillReceiveProps = applyDerivedStateFromPropsOnReceiveProps), "function" === typeof prototype.getSnapshotBeforeUpdate) {
    if ("function" !== typeof prototype.componentDidUpdate) throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
    prototype.componentWillUpdate = captureSnapshotBeforeUpdate;
    var originalComponentDidUpdate = prototype.componentDidUpdate;
    prototype.componentDidUpdate = function (previousProps, previousState, snapshot) {
      var capturedSnapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : snapshot;
      originalComponentDidUpdate.call(this, previousProps, previousState, capturedSnapshot);
    };
  }
  return Component;
}
markEsModule(legacyExports), defineExport(legacyExports, "polyfill", function () {
  return polyfill;
}), applyDerivedStateFromProps.__suppressDeprecationWarning = !0, applyDerivedStateFromPropsOnReceiveProps.__suppressDeprecationWarning = !0, captureSnapshotBeforeUpdate.__suppressDeprecationWarning = !0;

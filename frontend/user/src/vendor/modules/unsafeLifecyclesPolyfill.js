var React = require("./reactRuntime.js");

function unsafeLifecyclesPolyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error("Can only polyfill class components");
  }
  if (typeof prototype.componentWillReceiveProps !== "function" || !React.Profiler) {
    return Component;
  }

  prototype.UNSAFE_componentWillReceiveProps = prototype.componentWillReceiveProps;
  delete prototype.componentWillReceiveProps;
  return Component;
}

module.exports = unsafeLifecyclesPolyfill;

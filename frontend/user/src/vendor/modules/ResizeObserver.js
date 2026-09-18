var ResizeObserverController = require("./ResizeObserverController.js");
var ResizeObserverSPI = require("./ResizeObserverSPI.js");
var runtime = require("./resizeObserverRuntime.js");

var observerImplementations = typeof WeakMap !== "undefined" ? new WeakMap() : new runtime.ObserverMap();

class ResizeObserverPolyfill {
  constructor(callback) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    observerImplementations.set(
      this,
      new ResizeObserverSPI(callback, ResizeObserverController.getInstance(), this)
    );
  }
}

["observe", "unobserve", "disconnect"].forEach(function (method) {
  ResizeObserverPolyfill.prototype[method] = function () {
    return observerImplementations.get(this)[method].apply(observerImplementations.get(this), arguments);
  };
});

module.exports = typeof runtime.globalObject.ResizeObserver !== "undefined"
  ? runtime.globalObject.ResizeObserver
  : ResizeObserverPolyfill;

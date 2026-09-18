var geometry = require("./resizeObserverGeometry.js");
var runtime = require("./resizeObserverRuntime.js");

class ResizeObserverEntry {
  constructor(target, rectangle) {
    runtime.defineReadOnlyProperties(this, {
      target: target,
      contentRect: geometry.createReadOnlyRect(rectangle)
    });
  }
}

module.exports = ResizeObserverEntry;

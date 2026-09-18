var geometry = require("./resizeObserverGeometry.js");

class ResizeObservation {
  constructor(target) {
    this.target = target;
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect = geometry.createRect(0, 0, 0, 0);
  }

  isActive() {
    this.contentRect = geometry.getContentRect(this.target);
    return this.contentRect.width !== this.broadcastWidth || this.contentRect.height !== this.broadcastHeight;
  }

  broadcastRect() {
    this.broadcastWidth = this.contentRect.width;
    this.broadcastHeight = this.contentRect.height;
    return this.contentRect;
  }
}

module.exports = ResizeObservation;

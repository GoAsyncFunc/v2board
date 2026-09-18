var ResizeObservation = require("./ResizeObservation.js");
var ResizeObserverEntry = require("./ResizeObserverEntry.js");
var runtime = require("./resizeObserverRuntime.js");

class ResizeObserverSPI {
  constructor(callback, controller, callbackContext) {
    if (typeof callback !== "function") {
      throw new TypeError("The callback provided as parameter 1 is not a function.");
    }
    this.activeObservations = [];
    this.observations = new runtime.ObserverMap();
    this.callback = callback;
    this.controller = controller;
    this.callbackContext = callbackContext;
  }

  validateTarget(target) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    if (typeof Element === "undefined" || !(Element instanceof Object)) return false;
    if (!(target instanceof runtime.getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }
    return true;
  }

  observe(target) {
    if (!this.validateTarget.apply(this, arguments) || this.observations.has(target)) return;
    this.observations.set(target, new ResizeObservation(target));
    this.controller.addObserver(this);
    this.controller.refresh();
  }

  unobserve(target) {
    if (!this.validateTarget.apply(this, arguments) || !this.observations.has(target)) return;
    this.observations.delete(target);
    if (!this.observations.size) this.controller.removeObserver(this);
  }

  disconnect() {
    this.clearActive();
    this.observations.clear();
    this.controller.removeObserver(this);
  }

  gatherActive() {
    var activeObservations = this.activeObservations;
    this.clearActive();
    this.observations.forEach(function (observation) {
      if (observation.isActive()) activeObservations.push(observation);
    });
  }

  broadcastActive() {
    if (!this.hasActive()) return;
    var entries = this.activeObservations.map(function (observation) {
      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });
    this.callback.call(this.callbackContext, entries, this.callbackContext);
    this.clearActive();
  }

  clearActive() {
    this.activeObservations.splice(0);
  }

  hasActive() {
    return this.activeObservations.length > 0;
  }
}

module.exports = ResizeObserverSPI;

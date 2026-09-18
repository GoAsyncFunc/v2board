var runtime = require("./resizeObserverRuntime.js");

var transitionProperties = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];

class ResizeObserverController {
  constructor() {
    this.connected = false;
    this.usesMutationEvents = false;
    this.mutationObserver = null;
    this.observers = [];
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.refresh = runtime.throttle(this.refresh.bind(this), 20);
  }

  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) this.observers.push(observer);
    if (!this.connected) this.connect();
  }

  removeObserver(observer) {
    var index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
    if (!this.observers.length && this.connected) this.disconnect();
  }

  refresh() {
    if (this.updateObservers()) this.refresh();
  }

  updateObservers() {
    var activeObservers = this.observers.filter(function (observer) {
      observer.gatherActive();
      return observer.hasActive();
    });
    activeObservers.forEach(function (observer) {
      observer.broadcastActive();
    });
    return activeObservers.length > 0;
  }

  connect() {
    if (!runtime.isBrowser || this.connected) return;
    document.addEventListener("transitionend", this.onTransitionEnd);
    window.addEventListener("resize", this.refresh);
    if (typeof MutationObserver !== "undefined") {
      this.mutationObserver = new MutationObserver(this.refresh);
      this.mutationObserver.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener("DOMSubtreeModified", this.refresh);
      this.usesMutationEvents = true;
    }
    this.connected = true;
  }

  disconnect() {
    if (!runtime.isBrowser || !this.connected) return;
    document.removeEventListener("transitionend", this.onTransitionEnd);
    window.removeEventListener("resize", this.refresh);
    if (this.mutationObserver) this.mutationObserver.disconnect();
    if (this.usesMutationEvents) document.removeEventListener("DOMSubtreeModified", this.refresh);
    this.mutationObserver = null;
    this.usesMutationEvents = false;
    this.connected = false;
  }

  onTransitionEnd(event) {
    var propertyName = event.propertyName || "";
    if (transitionProperties.some(function (key) { return propertyName.indexOf(key) !== -1; })) {
      this.refresh();
    }
  }

  static getInstance() {
    if (!ResizeObserverController.instance) {
      ResizeObserverController.instance = new ResizeObserverController();
    }
    return ResizeObserverController.instance;
  }
}

ResizeObserverController.instance = null;

module.exports = ResizeObserverController;

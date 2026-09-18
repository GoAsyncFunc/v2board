Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports.default = addBatchedDomEventListener;

var addDomEventListenerModule = interopDefault(require("./addDomEventListener.js")),
  reactDom = interopDefault(require("./reactDomRuntime.js"));

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

function addBatchedDomEventListener(target, eventType, callback, option) {
  var batchedCallback = reactDom.default.unstable_batchedUpdates ? function (event) {
    reactDom.default.unstable_batchedUpdates(callback, event);
  } : callback;
  return (0, addDomEventListenerModule.default)(target, eventType, batchedCallback, option);
}

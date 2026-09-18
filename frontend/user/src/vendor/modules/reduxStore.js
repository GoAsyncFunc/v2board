let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var assignState = Object.assign || function (target) {
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];
    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
  return target;
};
function createStore(initialState) {
  var state = initialState,
    listeners = [];
  function setState(nextState) {
    state = assignState({}, state, nextState);
    for (var index = 0; index < listeners.length; index++) listeners[index]();
  }
  function getState() {
    return state;
  }
  function subscribe(listener) {
    return listeners.push(listener), function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  return {
    setState: setState,
    getState: getState,
    subscribe: subscribe
  };
}
legacyExports.default = createStore;

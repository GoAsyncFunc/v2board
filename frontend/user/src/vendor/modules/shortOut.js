let legacyModule = module,
  legacyExports = exports;
var HOT_CALL_COUNT = 800,
  HOT_SPAN_MS = 16,
  getNow = Date.now;
function shortOut(func) {
  var callCount = 0,
    lastCalledAt = 0;
  return function () {
    var now = getNow(),
      remainingMs = HOT_SPAN_MS - (now - lastCalledAt);
    if (lastCalledAt = now, remainingMs > 0) {
      if (++callCount >= HOT_CALL_COUNT) return arguments[0];
    } else callCount = 0;
    return func.apply(void 0, arguments);
  };
}
legacyModule.exports = shortOut;

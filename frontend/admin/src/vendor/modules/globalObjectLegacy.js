var globalObject = function () {
  return this;
}();

try {
  globalObject = globalObject || new Function("return this")();
} catch (error) {
  if (typeof window === "object") globalObject = window;
}

module.exports = globalObject;

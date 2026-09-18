const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");

var animationFrameModule = require("./animationFrameRuntime.js"),
  animationFrame = interopDefault(animationFrameModule),
  nextRequestId = 0,
  requestIds = {};

function requestAnimationFrame(callback) {
  var frameCount = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    requestId = nextRequestId++,
    remainingFrames = frameCount;

  function runFrame() {
    remainingFrames -= 1;
    if (remainingFrames <= 0) {
      callback();
      delete requestIds[requestId];
    } else requestIds[requestId] = animationFrame()(runFrame);
  }

  requestIds[requestId] = animationFrame()(runFrame);
  return requestId;
}

requestAnimationFrame.cancel = function cancelAnimationFrame(requestId) {
  if (void 0 !== requestId) {
    animationFrame.a.cancel(requestIds[requestId]);
    delete requestIds[requestId];
  }
};
requestAnimationFrame.ids = requestIds;

defineExport(exports, "a", function () {
  return requestAnimationFrame;
});

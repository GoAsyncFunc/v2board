let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = {
    adjustX: 1,
    adjustY: 1
  },
  i = [0, 0],
  o = {
    left: {
      points: ["cr", "cl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: i
    },
    right: {
      points: ["cl", "cr"],
      overflow: r,
      offset: [4, 0],
      targetOffset: i
    },
    top: {
      points: ["bc", "tc"],
      overflow: r,
      offset: [0, -4],
      targetOffset: i
    },
    bottom: {
      points: ["tc", "bc"],
      overflow: r,
      offset: [0, 4],
      targetOffset: i
    },
    topLeft: {
      points: ["bl", "tl"],
      overflow: r,
      offset: [0, -4],
      targetOffset: i
    },
    leftTop: {
      points: ["tr", "tl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: i
    },
    topRight: {
      points: ["br", "tr"],
      overflow: r,
      offset: [0, -4],
      targetOffset: i
    },
    rightTop: {
      points: ["tl", "tr"],
      overflow: r,
      offset: [4, 0],
      targetOffset: i
    },
    bottomRight: {
      points: ["tr", "br"],
      overflow: r,
      offset: [0, 4],
      targetOffset: i
    },
    rightBottom: {
      points: ["bl", "br"],
      overflow: r,
      offset: [4, 0],
      targetOffset: i
    },
    bottomLeft: {
      points: ["tl", "bl"],
      overflow: r,
      offset: [0, 4],
      targetOffset: i
    },
    leftBottom: {
      points: ["br", "bl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: i
    }
  };

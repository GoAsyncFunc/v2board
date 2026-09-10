let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = {
    adjustX: 1,
    adjustY: 1
  },
  o = [0, 0],
  i = {
    left: {
      points: ["cr", "cl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: o
    },
    right: {
      points: ["cl", "cr"],
      overflow: r,
      offset: [4, 0],
      targetOffset: o
    },
    top: {
      points: ["bc", "tc"],
      overflow: r,
      offset: [0, -4],
      targetOffset: o
    },
    bottom: {
      points: ["tc", "bc"],
      overflow: r,
      offset: [0, 4],
      targetOffset: o
    },
    topLeft: {
      points: ["bl", "tl"],
      overflow: r,
      offset: [0, -4],
      targetOffset: o
    },
    leftTop: {
      points: ["tr", "tl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: o
    },
    topRight: {
      points: ["br", "tr"],
      overflow: r,
      offset: [0, -4],
      targetOffset: o
    },
    rightTop: {
      points: ["tl", "tr"],
      overflow: r,
      offset: [4, 0],
      targetOffset: o
    },
    bottomRight: {
      points: ["tr", "br"],
      overflow: r,
      offset: [0, 4],
      targetOffset: o
    },
    rightBottom: {
      points: ["bl", "br"],
      overflow: r,
      offset: [4, 0],
      targetOffset: o
    },
    bottomLeft: {
      points: ["tl", "bl"],
      overflow: r,
      offset: [0, 4],
      targetOffset: o
    },
    leftBottom: {
      points: ["br", "bl"],
      overflow: r,
      offset: [-4, 0],
      targetOffset: o
    }
  };

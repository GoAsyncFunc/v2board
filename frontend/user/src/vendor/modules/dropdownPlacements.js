var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
var targetOffset = [0, 0];

function createPlacement(points, offset) {
  return {
    points: points,
    overflow: autoAdjustOverflow,
    offset: offset,
    targetOffset: targetOffset
  };
}

module.exports = {
  topLeft: createPlacement(["bl", "tl"], [0, -4]),
  topCenter: createPlacement(["bc", "tc"], [0, -4]),
  topRight: createPlacement(["br", "tr"], [0, -4]),
  bottomLeft: createPlacement(["tl", "bl"], [0, 4]),
  bottomCenter: createPlacement(["tc", "bc"], [0, 4]),
  bottomRight: createPlacement(["tr", "br"], [0, 4])
};

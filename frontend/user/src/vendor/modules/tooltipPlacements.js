var autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
  },
  targetOffset = [0, 0],
  placements = {
    left: createPlacement(["cr", "cl"], [-4, 0]),
    right: createPlacement(["cl", "cr"], [4, 0]),
    top: createPlacement(["bc", "tc"], [0, -4]),
    bottom: createPlacement(["tc", "bc"], [0, 4]),
    topLeft: createPlacement(["bl", "tl"], [0, -4]),
    leftTop: createPlacement(["tr", "tl"], [-4, 0]),
    topRight: createPlacement(["br", "tr"], [0, -4]),
    rightTop: createPlacement(["tl", "tr"], [4, 0]),
    bottomRight: createPlacement(["tr", "br"], [0, 4]),
    rightBottom: createPlacement(["bl", "br"], [4, 0]),
    bottomLeft: createPlacement(["tl", "bl"], [0, 4]),
    leftBottom: createPlacement(["br", "bl"], [-4, 0])
  };

function createPlacement(points, offset) {
  return {
    points: points,
    overflow: autoAdjustOverflow,
    offset: offset,
    targetOffset: targetOffset
  };
}

exports["a"] = placements;

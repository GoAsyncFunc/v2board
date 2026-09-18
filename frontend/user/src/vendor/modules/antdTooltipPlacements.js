"use strict";

const basePlacements = require("./tooltipPlacements.js").a;

const enabledOverflow = {
  adjustX: 1,
  adjustY: 1
};
const disabledOverflow = {
  adjustX: 0,
  adjustY: 0
};
const targetOffset = [0, 0];

function getOverflowOptions(autoAdjustOverflow) {
  if (typeof autoAdjustOverflow === "boolean") {
    return autoAdjustOverflow ? enabledOverflow : disabledOverflow;
  }
  return Object.assign({}, disabledOverflow, autoAdjustOverflow);
}

function getTooltipPlacements(config = {}) {
  const {
    arrowWidth = 5,
    horizontalArrowShift = 16,
    verticalArrowShift = 12,
    autoAdjustOverflow = true
  } = config;
  const placements = {
    left: { points: ["cr", "cl"], offset: [-4, 0] },
    right: { points: ["cl", "cr"], offset: [4, 0] },
    top: { points: ["bc", "tc"], offset: [0, -4] },
    bottom: { points: ["tc", "bc"], offset: [0, 4] },
    topLeft: { points: ["bl", "tc"], offset: [-(horizontalArrowShift + arrowWidth), -4] },
    leftTop: { points: ["tr", "cl"], offset: [-4, -(verticalArrowShift + arrowWidth)] },
    topRight: { points: ["br", "tc"], offset: [horizontalArrowShift + arrowWidth, -4] },
    rightTop: { points: ["tl", "cr"], offset: [4, -(verticalArrowShift + arrowWidth)] },
    bottomRight: { points: ["tr", "bc"], offset: [horizontalArrowShift + arrowWidth, 4] },
    rightBottom: { points: ["bl", "cr"], offset: [4, verticalArrowShift + arrowWidth] },
    bottomLeft: { points: ["tl", "bc"], offset: [-(horizontalArrowShift + arrowWidth), 4] },
    leftBottom: { points: ["br", "cl"], offset: [-4, verticalArrowShift + arrowWidth] }
  };

  Object.keys(placements).forEach(placement => {
    placements[placement] = config.arrowPointAtCenter
      ? Object.assign({}, placements[placement], {
        overflow: getOverflowOptions(autoAdjustOverflow),
        targetOffset
      })
      : Object.assign({}, basePlacements[placement], {
        overflow: getOverflowOptions(autoAdjustOverflow)
      });
    placements[placement].ignoreShake = true;
  });

  return placements;
}

exports.getOverflowOptions = getOverflowOptions;
exports.default = getTooltipPlacements;

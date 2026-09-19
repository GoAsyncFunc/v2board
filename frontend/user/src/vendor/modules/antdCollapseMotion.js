"use strict";

function getCollapsedHeight() {
  return {
    height: 0,
    opacity: 0
  };
}

function getExpandedHeight(node) {
  return {
    height: node.scrollHeight,
    opacity: 1
  };
}

function getCurrentHeight(node) {
  return {
    height: node.offsetHeight
  };
}

module.exports = {
  motionName: "ant-motion-collapse",
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getExpandedHeight,
  onEnterActive: getExpandedHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight
};

var runtime = require("./resizeObserverRuntime.js");

function createRect(x, y, width, height) {
  return { x: x, y: y, width: width, height: height };
}

var emptyRect = createRect(0, 0, 0, 0);

function toFloat(value) {
  return parseFloat(value) || 0;
}

function getBordersSize(styles, positions) {
  return positions.reduce(function (size, position) {
    return size + toFloat(styles["border-" + position + "-width"]);
  }, 0);
}

function getPaddings(styles) {
  var paddings = {};
  ["top", "right", "bottom", "left"].forEach(function (position) {
    paddings[position] = toFloat(styles["padding-" + position]);
  });
  return paddings;
}

function isSvgGraphicsElement(target) {
  var targetWindow = runtime.getWindowOf(target);
  if (typeof SVGGraphicsElement !== "undefined") {
    return target instanceof targetWindow.SVGGraphicsElement;
  }
  return target instanceof targetWindow.SVGElement && typeof target.getBBox === "function";
}

function getHtmlContentRect(target) {
  var clientWidth = target.clientWidth;
  var clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) return emptyRect;

  var targetWindow = runtime.getWindowOf(target);
  var styles = targetWindow.getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizontalPadding = paddings.left + paddings.right;
  var verticalPadding = paddings.top + paddings.bottom;
  var width = toFloat(styles.width);
  var height = toFloat(styles.height);

  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizontalPadding) !== clientWidth) {
      width -= getBordersSize(styles, ["left", "right"]) + horizontalPadding;
    }
    if (Math.round(height + verticalPadding) !== clientHeight) {
      height -= getBordersSize(styles, ["top", "bottom"]) + verticalPadding;
    }
  }

  if (target !== targetWindow.document.documentElement) {
    var verticalScrollbar = Math.round(width + horizontalPadding) - clientWidth;
    var horizontalScrollbar = Math.round(height + verticalPadding) - clientHeight;
    if (Math.abs(verticalScrollbar) !== 1) width -= verticalScrollbar;
    if (Math.abs(horizontalScrollbar) !== 1) height -= horizontalScrollbar;
  }

  return createRect(paddings.left, paddings.top, width, height);
}

function getContentRect(target) {
  if (!runtime.isBrowser) return emptyRect;
  if (isSvgGraphicsElement(target)) {
    var bounds = target.getBBox();
    return createRect(0, 0, bounds.width, bounds.height);
  }
  return getHtmlContentRect(target);
}

function createReadOnlyRect(rect) {
  var RectConstructor = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  return runtime.defineReadOnlyProperties(Object.create(RectConstructor.prototype), {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height,
    left: rect.x
  });
}

module.exports = {
  createReadOnlyRect: createReadOnlyRect,
  createRect: createRect,
  getContentRect: getContentRect
};

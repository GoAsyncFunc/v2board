var domScrollUtils = require('./domScrollUtils.js');

function scrollIntoView(elem, container, config) {
  config = config || {};
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = domScrollUtils.getWindow(container);
  }

  var allowHorizontalScroll = config.allowHorizontalScroll;
  var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  var alignWithTop = config.alignWithTop;
  var alignWithLeft = config.alignWithLeft;
  var offsetTop = config.offsetTop || 0;
  var offsetLeft = config.offsetLeft || 0;
  var offsetBottom = config.offsetBottom || 0;
  var offsetRight = config.offsetRight || 0;

  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

  var isWin = domScrollUtils.isWindow(container);
  var elemOffset = domScrollUtils.offset(elem);
  var eh = domScrollUtils.outerHeight(elem);
  var ew = domScrollUtils.outerWidth(elem);
  var containerOffset = undefined;
  var ch = undefined;
  var cw = undefined;
  var containerScroll = undefined;
  var diffTop = undefined;
  var diffBottom = undefined;
  var win = undefined;
  var winScroll = undefined;
  var ww = undefined;
  var wh = undefined;

  if (isWin) {
    win = container;
    wh = domScrollUtils.height(win);
    ww = domScrollUtils.width(win);
    winScroll = {
      left: domScrollUtils.scrollLeft(win),
      top: domScrollUtils.scrollTop(win)
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom
    };
    containerScroll = winScroll;
  } else {
    containerOffset = domScrollUtils.offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      left: elemOffset.left - (containerOffset.left + (parseFloat(domScrollUtils.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top + (parseFloat(domScrollUtils.css(container, 'borderTopWidth')) || 0)) - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(domScrollUtils.css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(domScrollUtils.css(container, 'borderBottomWidth')) || 0)) + offsetBottom
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      domScrollUtils.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      domScrollUtils.scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        domScrollUtils.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        domScrollUtils.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if (alignWithTop) {
        domScrollUtils.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        domScrollUtils.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        domScrollUtils.scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        domScrollUtils.scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          domScrollUtils.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          domScrollUtils.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
        if (alignWithLeft) {
          domScrollUtils.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          domScrollUtils.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}

module.exports = scrollIntoView;

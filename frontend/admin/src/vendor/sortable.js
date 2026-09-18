import React from 'react';

const DEFAULT_NODE_SELECTOR = 'tr';
const VERTICAL = { TOP: 1, BOTTOM: 3 };
const HORIZONTAL = { RIGHT: 2, LEFT: 4 };
const PIXELS = 'px';
const VERTICAL_LINE_STYLE = 'position:fixed;z-index:9999;height:0;margin-top:-1px;border-bottom:dashed 2px rgba(0,0,0,.3);display:none;';
const HORIZONTAL_LINE_STYLE = 'width:0;margin-left:-1px;margin-top:0;border-bottom:0 none;border-left:dashed 2px rgba(0,0,0,.3);';

function closest(element, selector, boundary) {
  let current = element;
  while (current) {
    const isBoundary = current === boundary || current === document.body;
    if (isBoundary || (current.nodeType === 1 && current.matches(selector))) {
      if (isBoundary) current = null;
      break;
    }
    current = current.parentNode;
  }
  return current;
}

function findScrollableParent(element) {
  let current = element;
  do {
    const style = window.getComputedStyle(current);
    const overflow = style.overflow;
    if ((overflow === 'auto' || overflow === 'scroll') && current && current.nodeType && (current.offsetWidth < current.scrollWidth || current.offsetHeight < current.scrollHeight)) {
      break;
    }
    if (!current || !current.nodeType || current === document.body) {
      current = null;
      break;
    }
    current = current.parentNode;
  } while (current);
  return current;
}

function siblingIndex(element, ignoreSelector) {
  return Array.from(element.parentNode.children)
    .filter(sibling => ignoreSelector === '' || !sibling.matches(ignoreSelector))
    .indexOf(element);
}

function ensureMatchesPolyfill() {
  if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    const prototype = Element.prototype;
    prototype.matches = prototype.matchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || prototype.oMatchesSelector || prototype.webkitMatchesSelector;
  }
}

class Sortable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fromIndex: -1, toIndex: -1 };
    this.scrollElement = null;
    this.scrollTimerId = -1;
    this.direction = VERTICAL.BOTTOM;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
  }

  componentWillUnmount() {
    if (this.dragLine && this.dragLine.parentNode) {
      this.dragLine.parentNode.removeChild(this.dragLine);
      this.dragLine = null;
      this.cacheDragTarget = null;
    }
  }

  onMouseDown(event) {
    const handleNode = this.getHandleNode(event.target);
    if (!handleNode) return;
    const dragNode = this.props.handleSelector && this.props.handleSelector !== this.props.nodeSelector
      ? this.getDragNode(handleNode)
      : handleNode;
    if (!dragNode) return;
    handleNode.setAttribute('draggable', false);
    dragNode.setAttribute('draggable', true);
    dragNode.ondragstart = this.onDragStart;
    dragNode.ondragend = this.onDragEnd;
  }

  onDragStart(event) {
    const dragNode = this.getDragNode(event.target);
    if (!dragNode) return;
    const parent = dragNode.parentNode;
    event.dataTransfer.setData('Text', '');
    event.dataTransfer.effectAllowed = 'move';
    parent.ondragenter = this.onDragEnter;
    parent.ondragover = dragEvent => {
      dragEvent.preventDefault();
      return true;
    };
    const index = siblingIndex(dragNode, this.props.ignoreSelector);
    this.setState({ fromIndex: index, toIndex: index });
    this.scrollElement = findScrollableParent(parent);
  }

  onDragEnter(event) {
    const dragNode = this.getDragNode(event.target);
    let index = -1;
    if (dragNode) {
      index = siblingIndex(dragNode, this.props.ignoreSelector);
      if (this.props.enableScroll) this.resolveAutoScroll(event, dragNode);
    } else {
      this.stopAutoScroll();
    }
    this.cacheDragTarget = dragNode;
    this.setState({ toIndex: index });
    this.fixDragLine(dragNode);
  }

  onDragEnd(event) {
    const dragNode = this.getDragNode(event.target);
    this.stopAutoScroll();
    if (dragNode) {
      dragNode.removeAttribute('draggable');
      dragNode.ondragstart = null;
      dragNode.ondragend = null;
      dragNode.parentNode.ondragenter = null;
      dragNode.parentNode.ondragover = null;
      if (this.state.fromIndex >= 0 && this.state.fromIndex !== this.state.toIndex) {
        this.props.onDragEnd(this.state.fromIndex, this.state.toIndex);
      }
    }
    this.hideDragLine();
    this.setState({ fromIndex: -1, toIndex: -1 });
  }

  getDragNode(element) {
    return closest(element, this.props.nodeSelector, this.dragList);
  }

  getHandleNode(element) {
    return closest(element, this.props.handleSelector || this.props.nodeSelector, this.dragList);
  }

  getDragLine() {
    if (!this.dragLine) {
      this.dragLine = window.document.createElement('div');
      this.dragLine.setAttribute('style', VERTICAL_LINE_STYLE);
      window.document.body.appendChild(this.dragLine);
    }
    this.dragLine.className = this.props.lineClassName || '';
    return this.dragLine;
  }

  resolveAutoScroll(event, dragNode) {
    if (!this.scrollElement) return;
    const bounds = this.scrollElement.getBoundingClientRect();
    const threshold = dragNode.offsetHeight * (2 / 3);
    this.direction = 0;
    if (event.pageY > bounds.top + bounds.height - threshold) this.direction = VERTICAL.BOTTOM;
    else if (event.pageY < bounds.top + threshold) this.direction = VERTICAL.TOP;
    if (this.direction) {
      if (this.scrollTimerId < 0) this.scrollTimerId = setInterval(this.autoScroll, 20);
    } else {
      this.stopAutoScroll();
    }
  }

  stopAutoScroll() {
    clearInterval(this.scrollTimerId);
    this.scrollTimerId = -1;
    this.fixDragLine(this.cacheDragTarget);
  }

  autoScroll() {
    const current = this.scrollElement.scrollTop;
    if (this.direction === VERTICAL.BOTTOM) {
      this.scrollElement.scrollTop = current + this.props.scrollSpeed;
      if (current === this.scrollElement.scrollTop) this.stopAutoScroll();
    } else if (this.direction === VERTICAL.TOP) {
      this.scrollElement.scrollTop = current - this.props.scrollSpeed;
      if (this.scrollElement.scrollTop <= 0) this.stopAutoScroll();
    } else {
      this.stopAutoScroll();
    }
  }

  hideDragLine() {
    if (this.dragLine) this.dragLine.style.display = 'none';
  }

  fixDragLine(target) {
    const line = this.getDragLine();
    if (!target || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) {
      this.hideDragLine();
      return;
    }
    const bounds = target.getBoundingClientRect();
    const position = this.state.toIndex < this.state.fromIndex ? bounds.top : bounds.top + bounds.height;
    if (this.props.enableScroll && this.scrollElement) {
      const scrollBounds = this.scrollElement.getBoundingClientRect();
      if (position < scrollBounds.top - 2 || position > scrollBounds.top + scrollBounds.height + 2) {
        this.hideDragLine();
        return;
      }
    }
    line.style.left = `${bounds.left}${PIXELS}`;
    line.style.width = `${bounds.width}${PIXELS}`;
    line.style.top = `${position}${PIXELS}`;
    line.style.display = 'block';
  }

  render() {
    return (
      <div role="presentation" onMouseDown={this.onMouseDown} ref={element => { this.dragList = element; }}>
        {this.props.children}
      </div>
    );
  }
}

Sortable.defaultProps = {
  nodeSelector: DEFAULT_NODE_SELECTOR,
  ignoreSelector: '',
  enableScroll: true,
  scrollSpeed: 10,
  handleSelector: '',
  lineClassName: '',
  children: null,
};

class DragColumn extends Sortable {
  getDragLine() {
    const line = super.getDragLine();
    if (!line.dataset.horizontal) {
      line.setAttribute('style', `${line.getAttribute('style')}${HORIZONTAL_LINE_STYLE}`);
      line.dataset.horizontal = 'true';
    }
    return line;
  }

  resolveAutoScroll(event, dragNode) {
    if (!this.scrollElement) return;
    const bounds = this.scrollElement.getBoundingClientRect();
    const threshold = 2 * dragNode.offsetWidth / 3;
    this.direction = 0;
    if (event.pageX > bounds.left + bounds.width - threshold) this.direction = HORIZONTAL.RIGHT;
    else if (event.pageX < bounds.left + threshold) this.direction = HORIZONTAL.LEFT;
    if (this.direction) {
      if (this.scrollTimerId < 0) this.scrollTimerId = setInterval(this.autoScroll, 20);
    } else {
      this.stopAutoScroll();
    }
  }

  autoScroll() {
    const current = this.scrollElement.scrollLeft;
    if (this.direction === HORIZONTAL.RIGHT) {
      this.scrollElement.scrollLeft = current + this.props.scrollSpeed;
      if (current === this.scrollElement.scrollLeft) this.stopAutoScroll();
    } else if (this.direction === HORIZONTAL.LEFT) {
      this.scrollElement.scrollLeft = current - this.props.scrollSpeed;
      if (this.scrollElement.scrollLeft <= 0) this.stopAutoScroll();
    } else {
      this.stopAutoScroll();
    }
  }

  fixDragLine(target) {
    const line = this.getDragLine();
    if (!target || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) {
      this.hideDragLine();
      return;
    }
    const bounds = target.getBoundingClientRect();
    const position = this.state.toIndex < this.state.fromIndex ? bounds.left : bounds.left + bounds.width;
    if (this.props.enableScroll && this.scrollElement) {
      const scrollBounds = this.scrollElement.getBoundingClientRect();
      if (position < scrollBounds.left - 2 || position > scrollBounds.left + scrollBounds.width + 2) {
        this.hideDragLine();
        return;
      }
    }
    line.style.top = `${bounds.top}${PIXELS}`;
    line.style.height = `${bounds.height}${PIXELS}`;
    line.style.left = `${position}${PIXELS}`;
    line.style.display = 'block';
  }
}

ensureMatchesPolyfill();
Sortable.DragColumn = DragColumn;

export { Sortable, DragColumn };
export default Sortable;

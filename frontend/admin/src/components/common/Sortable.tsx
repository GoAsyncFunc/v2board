import React from 'react';

const DEFAULT_NODE_SELECTOR = 'tr';
const VERTICAL = { TOP: 1, BOTTOM: 3 };
const HORIZONTAL = { RIGHT: 2, LEFT: 4 };
const PIXELS = 'px';
const VERTICAL_LINE_STYLE =
    'position:fixed;z-index:9999;height:0;margin-top:-1px;border-bottom:dashed 2px rgba(0,0,0,.3);display:none;';
const HORIZONTAL_LINE_STYLE =
    'width:0;margin-left:-1px;margin-top:0;border-bottom:0 none;border-left:dashed 2px rgba(0,0,0,.3);';

export interface SortableProps {
    children?: React.ReactNode;
    nodeSelector?: string;
    ignoreSelector?: string;
    enableScroll?: boolean;
    scrollSpeed?: number;
    handleSelector?: string;
    lineClassName?: string;
    onDragEnd?: (fromIndex: number, toIndex: number) => void;
}

interface SortableState {
    fromIndex: number;
    toIndex: number;
}

function closest(
    element: EventTarget | null,
    selector: string,
    boundary: Element | null,
): HTMLElement | null {
    let current = element;
    while (current) {
        const isBoundary = current === boundary || current === document.body;
        if (isBoundary || (current instanceof HTMLElement && current.matches(selector))) {
            if (isBoundary) current = null;
            break;
        }
        current = current instanceof Node ? current.parentNode : null;
    }
    return current instanceof HTMLElement ? current : null;
}

function findScrollableParent(element: HTMLElement | null): HTMLElement | null {
    let current = element;
    do {
        if (!current) break;
        const style = window.getComputedStyle(current);
        const overflow = style.overflow;
        if (
            (overflow === 'auto' || overflow === 'scroll') &&
            (current.offsetWidth < current.scrollWidth ||
                current.offsetHeight < current.scrollHeight)
        ) {
            break;
        }
        if (current === document.body) {
            current = null;
            break;
        }
        current = current.parentElement;
    } while (current);
    return current;
}

function siblingIndex(element: HTMLElement, ignoreSelector: string): number {
    if (!element.parentElement) return -1;
    return Array.from(element.parentElement.children)
        .filter((sibling) => ignoreSelector === '' || !sibling.matches(ignoreSelector))
        .indexOf(element);
}

function ensureMatchesPolyfill() {
    if (typeof Element !== 'undefined' && !Element.prototype.matches) {
        const prototype = Element.prototype as typeof Element.prototype & {
            matchesSelector?: typeof Element.prototype.matches;
            mozMatchesSelector?: typeof Element.prototype.matches;
            msMatchesSelector?: typeof Element.prototype.matches;
            oMatchesSelector?: typeof Element.prototype.matches;
            webkitMatchesSelector?: typeof Element.prototype.matches;
        };
        prototype.matches =
            prototype.matchesSelector ||
            prototype.mozMatchesSelector ||
            prototype.msMatchesSelector ||
            prototype.oMatchesSelector ||
            prototype.webkitMatchesSelector ||
            prototype.matches;
    }
}

class Sortable extends React.Component<SortableProps, SortableState> {
    static defaultProps: Partial<SortableProps> = {
        nodeSelector: DEFAULT_NODE_SELECTOR,
        ignoreSelector: '',
        enableScroll: true,
        scrollSpeed: 10,
        handleSelector: '',
        lineClassName: '',
        children: null,
    };

    dragList: HTMLDivElement | null = null;
    dragLine: HTMLDivElement | null = null;
    cacheDragTarget: HTMLElement | null = null;
    scrollElement: HTMLElement | null = null;
    scrollTimerId = -1;
    direction = VERTICAL.BOTTOM;

    constructor(props: SortableProps) {
        super(props);
        this.state = { fromIndex: -1, toIndex: -1 };
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

    onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
        const handleNode = this.getHandleNode(event.target);
        if (!handleNode) return;
        const dragNode =
            this.props.handleSelector && this.props.handleSelector !== this.props.nodeSelector
                ? this.getDragNode(handleNode)
                : handleNode;
        if (!dragNode) return;
        handleNode.setAttribute('draggable', 'false');
        dragNode.setAttribute('draggable', 'true');
        dragNode.ondragstart = this.onDragStart;
        dragNode.ondragend = this.onDragEnd;
    }

    onDragStart(event: DragEvent): void {
        const dragNode = this.getDragNode(event.target);
        if (!dragNode) return;
        const parent = dragNode.parentElement;
        if (!parent || !event.dataTransfer) return;
        event.dataTransfer.setData('Text', '');
        event.dataTransfer.effectAllowed = 'move';
        parent.ondragenter = this.onDragEnter;
        parent.ondragover = (dragEvent) => {
            dragEvent.preventDefault();
            return true;
        };
        const index = siblingIndex(dragNode, this.props.ignoreSelector || '');
        this.setState({ fromIndex: index, toIndex: index });
        this.scrollElement = findScrollableParent(parent);
    }

    onDragEnter(event: DragEvent): void {
        const dragNode = this.getDragNode(event.target);
        let index = -1;
        if (dragNode) {
            index = siblingIndex(dragNode, this.props.ignoreSelector || '');
            if (this.props.enableScroll) this.resolveAutoScroll(event, dragNode);
        } else {
            this.stopAutoScroll();
        }
        this.cacheDragTarget = dragNode;
        this.setState({ toIndex: index });
        this.fixDragLine(dragNode);
    }

    onDragEnd(event: DragEvent): void {
        const dragNode = this.getDragNode(event.target);
        this.stopAutoScroll();
        if (dragNode) {
            dragNode.removeAttribute('draggable');
            dragNode.ondragstart = null;
            dragNode.ondragend = null;
            if (dragNode.parentElement) {
                dragNode.parentElement.ondragenter = null;
                dragNode.parentElement.ondragover = null;
            }
            if (this.state.fromIndex >= 0 && this.state.fromIndex !== this.state.toIndex) {
                this.props.onDragEnd?.(this.state.fromIndex, this.state.toIndex);
            }
        }
        this.hideDragLine();
        this.setState({ fromIndex: -1, toIndex: -1 });
    }

    protected getDragNode(element: EventTarget | null): HTMLElement | null {
        return closest(element, this.props.nodeSelector || DEFAULT_NODE_SELECTOR, this.dragList);
    }

    protected getHandleNode(element: EventTarget | null): HTMLElement | null {
        return closest(
            element,
            this.props.handleSelector || this.props.nodeSelector || DEFAULT_NODE_SELECTOR,
            this.dragList,
        );
    }

    protected getDragLine(): HTMLDivElement {
        if (!this.dragLine) {
            this.dragLine = window.document.createElement('div');
            this.dragLine.setAttribute('style', VERTICAL_LINE_STYLE);
            window.document.body.appendChild(this.dragLine);
        }
        this.dragLine.className = this.props.lineClassName || '';
        return this.dragLine;
    }

    protected resolveAutoScroll(event: DragEvent, dragNode: HTMLElement): void {
        if (!this.scrollElement) return;
        const bounds = this.scrollElement.getBoundingClientRect();
        const threshold = dragNode.offsetHeight * (2 / 3);
        this.direction = 0;
        if (event.pageY > bounds.top + bounds.height - threshold) this.direction = VERTICAL.BOTTOM;
        else if (event.pageY < bounds.top + threshold) this.direction = VERTICAL.TOP;
        if (this.direction) {
            if (this.scrollTimerId < 0)
                this.scrollTimerId = window.setInterval(this.autoScroll, 20);
        } else {
            this.stopAutoScroll();
        }
    }

    protected stopAutoScroll(): void {
        window.clearInterval(this.scrollTimerId);
        this.scrollTimerId = -1;
        this.fixDragLine(this.cacheDragTarget);
    }

    protected autoScroll(): void {
        if (!this.scrollElement) return;
        const current = this.scrollElement.scrollTop;
        if (this.direction === VERTICAL.BOTTOM) {
            this.scrollElement.scrollTop = current + (this.props.scrollSpeed || 10);
            if (current === this.scrollElement.scrollTop) this.stopAutoScroll();
        } else if (this.direction === VERTICAL.TOP) {
            this.scrollElement.scrollTop = current - (this.props.scrollSpeed || 10);
            if (this.scrollElement.scrollTop <= 0) this.stopAutoScroll();
        } else {
            this.stopAutoScroll();
        }
    }

    protected hideDragLine(): void {
        if (this.dragLine) this.dragLine.style.display = 'none';
    }

    protected fixDragLine(target: HTMLElement | null): void {
        const line = this.getDragLine();
        if (!target || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) {
            this.hideDragLine();
            return;
        }
        const bounds = target.getBoundingClientRect();
        const position =
            this.state.toIndex < this.state.fromIndex ? bounds.top : bounds.top + bounds.height;
        if (this.props.enableScroll && this.scrollElement) {
            const scrollBounds = this.scrollElement.getBoundingClientRect();
            if (
                position < scrollBounds.top - 2 ||
                position > scrollBounds.top + scrollBounds.height + 2
            ) {
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
            <div
                role="presentation"
                onMouseDown={this.onMouseDown}
                ref={(element) => {
                    this.dragList = element;
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

class DragColumn extends Sortable {
    protected getDragLine(): HTMLDivElement {
        const line = super.getDragLine();
        if (!line.dataset.horizontal) {
            line.setAttribute('style', `${line.getAttribute('style')}${HORIZONTAL_LINE_STYLE}`);
            line.dataset.horizontal = 'true';
        }
        return line;
    }

    protected resolveAutoScroll(event: DragEvent, dragNode: HTMLElement): void {
        if (!this.scrollElement) return;
        const bounds = this.scrollElement.getBoundingClientRect();
        const threshold = (2 * dragNode.offsetWidth) / 3;
        this.direction = 0;
        if (event.pageX > bounds.left + bounds.width - threshold) this.direction = HORIZONTAL.RIGHT;
        else if (event.pageX < bounds.left + threshold) this.direction = HORIZONTAL.LEFT;
        if (this.direction) {
            if (this.scrollTimerId < 0)
                this.scrollTimerId = window.setInterval(this.autoScroll, 20);
        } else {
            this.stopAutoScroll();
        }
    }

    protected autoScroll(): void {
        if (!this.scrollElement) return;
        const current = this.scrollElement.scrollLeft;
        if (this.direction === HORIZONTAL.RIGHT) {
            this.scrollElement.scrollLeft = current + (this.props.scrollSpeed || 10);
            if (current === this.scrollElement.scrollLeft) this.stopAutoScroll();
        } else if (this.direction === HORIZONTAL.LEFT) {
            this.scrollElement.scrollLeft = current - (this.props.scrollSpeed || 10);
            if (this.scrollElement.scrollLeft <= 0) this.stopAutoScroll();
        } else {
            this.stopAutoScroll();
        }
    }

    protected fixDragLine(target: HTMLElement | null): void {
        const line = this.getDragLine();
        if (!target || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) {
            this.hideDragLine();
            return;
        }
        const bounds = target.getBoundingClientRect();
        const position =
            this.state.toIndex < this.state.fromIndex ? bounds.left : bounds.left + bounds.width;
        if (this.props.enableScroll && this.scrollElement) {
            const scrollBounds = this.scrollElement.getBoundingClientRect();
            if (
                position < scrollBounds.left - 2 ||
                position > scrollBounds.left + scrollBounds.width + 2
            ) {
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
(Sortable as typeof Sortable & { DragColumn: typeof DragColumn }).DragColumn = DragColumn;

export { Sortable, DragColumn };
export default Sortable;

import React from 'react';
import classNames from 'classnames';

type StyleValue = React.CSSProperties | undefined;
type RenderableChild = React.ReactNode;

interface TouchableProps {
    children: React.ReactElement;
    disabled?: boolean;
    activeClassName?: string;
    activeStyle?: React.CSSProperties | false;
}

interface MobileListBriefProps {
    children?: RenderableChild;
    style?: StyleValue;
}

interface MobileListItemProps extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children' | 'onClick'
> {
    prefixCls?: string;
    className?: string;
    activeStyle?: React.CSSProperties | false;
    error?: boolean;
    align?: 'top' | 'middle' | 'bottom';
    wrap?: boolean;
    disabled?: boolean;
    children?: RenderableChild;
    multipleLine?: boolean;
    thumb?: string | React.ReactNode;
    extra?: RenderableChild;
    arrow?: 'horizontal' | 'down' | 'up';
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    platform?: 'ios' | 'android';
}

interface MobileListState {
    coverRippleStyle: React.CSSProperties;
    rippleClicked: boolean;
}

interface MobileListProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    children?: RenderableChild;
    renderHeader?: RenderableChild | (() => RenderableChild);
    renderFooter?: RenderableChild | (() => RenderableChild);
}

class Touchable extends React.Component<TouchableProps, { active: boolean }> {
    static defaultProps = { disabled: false };

    state = { active: false };

    componentDidUpdate() {
        if (this.props.disabled && this.state.active) this.setState({ active: false });
    }

    triggerEvent(eventName: string, active: boolean, event: React.SyntheticEvent) {
        const handlerName = `on${eventName}`;
        const child = this.props.children;
        const handler = child.props[handlerName as keyof typeof child.props];
        if (typeof handler === 'function') {
            (handler as (event: React.SyntheticEvent) => void)(event);
        }
        if (active !== this.state.active) this.setState({ active });
    }

    onTouchStart = (event: React.TouchEvent) => this.triggerEvent('TouchStart', true, event);
    onTouchMove = (event: React.TouchEvent) => this.triggerEvent('TouchMove', false, event);
    onTouchEnd = (event: React.TouchEvent) => this.triggerEvent('TouchEnd', false, event);
    onTouchCancel = (event: React.TouchEvent) => this.triggerEvent('TouchCancel', false, event);
    onMouseDown = (event: React.MouseEvent) => this.triggerEvent('MouseDown', true, event);
    onMouseUp = (event: React.MouseEvent) => this.triggerEvent('MouseUp', false, event);
    onMouseLeave = (event: React.MouseEvent) => this.triggerEvent('MouseLeave', false, event);

    render() {
        const { children, disabled, activeClassName, activeStyle } = this.props;
        const eventHandlers = disabled
            ? undefined
            : {
                  onTouchStart: this.onTouchStart,
                  onTouchMove: this.onTouchMove,
                  onTouchEnd: this.onTouchEnd,
                  onTouchCancel: this.onTouchCancel,
                  onMouseDown: this.onMouseDown,
                  onMouseUp: this.onMouseUp,
                  onMouseLeave: this.onMouseLeave,
              };
        const child = React.Children.only(children);
        if (!disabled && this.state.active) {
            let { style, className } = child.props;
            if (activeStyle !== false && activeStyle) style = { ...style, ...activeStyle };
            className = classNames(className, activeClassName);
            return React.cloneElement(child, { className, style, ...eventHandlers });
        }
        return React.cloneElement(child, eventHandlers);
    }
}

export class MobileListBrief extends React.Component<MobileListBriefProps> {
    render() {
        return (
            <div className="am-list-brief" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

export class MobileListItem extends React.Component<MobileListItemProps, MobileListState> {
    static defaultProps = {
        prefixCls: 'am-list',
        align: 'middle',
        error: false,
        multipleLine: false,
        wrap: false,
        platform: 'ios',
    };

    static Brief = MobileListBrief;

    state: MobileListState = {
        coverRippleStyle: { display: 'none' },
        rippleClicked: false,
    };

    private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }

    onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const { onClick, platform } = this.props;
        if (onClick && platform === 'android') {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
            const target = event.currentTarget;
            const size = Math.max(target.offsetHeight, target.offsetWidth);
            const bounds = target.getBoundingClientRect();
            const left = event.clientX - bounds.left - target.offsetWidth / 2;
            const top = event.clientY - bounds.top - target.offsetWidth / 2;
            this.setState(
                {
                    coverRippleStyle: {
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}px`,
                        top: `${top}px`,
                    },
                    rippleClicked: true,
                },
                () => {
                    this.debounceTimeout = setTimeout(() => {
                        this.setState({
                            coverRippleStyle: { display: 'none' },
                            rippleClicked: false,
                        });
                    }, 1000);
                },
            );
        }
        if (onClick) onClick(event);
    };

    render() {
        const {
            prefixCls,
            className,
            activeStyle,
            error,
            align,
            wrap,
            disabled,
            children,
            multipleLine,
            thumb,
            extra,
            arrow,
            onClick,
            platform,
            ...restProps
        } = this.props;
        const touchHandlers: React.DOMAttributes<HTMLDivElement> = {};
        if ('onTouchStart' in restProps) touchHandlers.onTouchStart = restProps.onTouchStart;
        if ('onTouchStartCapture' in restProps)
            touchHandlers.onTouchStartCapture = restProps.onTouchStartCapture;
        if ('onTouchMove' in restProps) touchHandlers.onTouchMove = restProps.onTouchMove;
        if ('onTouchMoveCapture' in restProps)
            touchHandlers.onTouchMoveCapture = restProps.onTouchMoveCapture;
        if ('onTouchEnd' in restProps) touchHandlers.onTouchEnd = restProps.onTouchEnd;
        if ('onTouchEndCapture' in restProps)
            touchHandlers.onTouchEndCapture = restProps.onTouchEndCapture;
        if ('onTouchCancel' in restProps) touchHandlers.onTouchCancel = restProps.onTouchCancel;
        if ('onTouchCancelCapture' in restProps)
            touchHandlers.onTouchCancelCapture = restProps.onTouchCancelCapture;
        const itemClassName = classNames(`${prefixCls}-item`, className, {
            [`${prefixCls}-item-disabled`]: disabled,
            [`${prefixCls}-item-error`]: error,
            [`${prefixCls}-item-top`]: align === 'top',
            [`${prefixCls}-item-middle`]: align === 'middle',
            [`${prefixCls}-item-bottom`]: align === 'bottom',
        });
        const rippleClassName = classNames(`${prefixCls}-ripple`, {
            [`${prefixCls}-ripple-animate`]: this.state.rippleClicked,
        });
        const lineClassName = classNames(`${prefixCls}-line`, {
            [`${prefixCls}-line-multiple`]: multipleLine,
            [`${prefixCls}-line-wrap`]: wrap,
        });
        const arrowClassName = classNames(`${prefixCls}-arrow`, {
            [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
            [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
            [`${prefixCls}-arrow-vertical-up`]: arrow === 'up',
        });
        return (
            <Touchable
                {...touchHandlers}
                disabled={disabled || !onClick}
                activeStyle={activeStyle}
                activeClassName={`${prefixCls}-item-active`}
            >
                <div {...restProps} onClick={this.onClick} className={itemClassName}>
                    {thumb && (
                        <div className={`${prefixCls}-thumb`}>
                            {typeof thumb === 'string' ? <img src={thumb} /> : thumb}
                        </div>
                    )}
                    <div className={lineClassName}>
                        {children !== undefined && (
                            <div className={`${prefixCls}-content`}>{children}</div>
                        )}
                        {extra !== undefined && <div className={`${prefixCls}-extra`}>{extra}</div>}
                        {arrow && <div className={arrowClassName} aria-hidden="true" />}
                    </div>
                    <div style={this.state.coverRippleStyle} className={rippleClassName} />
                </div>
            </Touchable>
        );
    }
}

export class MobileList extends React.Component<MobileListProps> {
    static Item = MobileListItem;
    static defaultProps = { prefixCls: 'am-list' };

    render() {
        const { prefixCls, children, className, style, renderHeader, renderFooter, ...restProps } =
            this.props;
        return (
            <div className={classNames(prefixCls, className)} style={style} {...restProps}>
                {renderHeader && (
                    <div className={`${prefixCls}-header`}>
                        {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
                    </div>
                )}
                {children && <div className={`${prefixCls}-body`}>{children}</div>}
                {renderFooter && (
                    <div className={`${prefixCls}-footer`}>
                        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
                    </div>
                )}
            </div>
        );
    }
}

export default MobileList;

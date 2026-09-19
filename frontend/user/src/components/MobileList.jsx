import React from 'react';
import classNames from 'classnames';

// Recovered mobile order-list primitives.
class Touchable extends React.Component {
  static defaultProps = { disabled: false };

  state = { active: false };

  componentDidUpdate() {
    if (this.props.disabled && this.state.active) this.setState({ active: false });
  }

  triggerEvent(eventName, active, event) {
    const handlerName = `on${eventName}`;
    const child = this.props.children;
    if (child.props[handlerName]) child.props[handlerName](event);
    if (active !== this.state.active) this.setState({ active });
  }

  onTouchStart = event => this.triggerEvent('TouchStart', true, event);
  onTouchMove = event => this.triggerEvent('TouchMove', false, event);
  onTouchEnd = event => this.triggerEvent('TouchEnd', false, event);
  onTouchCancel = event => this.triggerEvent('TouchCancel', false, event);
  onMouseDown = event => this.triggerEvent('MouseDown', true, event);
  onMouseUp = event => this.triggerEvent('MouseUp', false, event);
  onMouseLeave = event => this.triggerEvent('MouseLeave', false, event);

  render() {
    const { children, disabled, activeClassName, activeStyle } = this.props;
    const eventHandlers = disabled ? undefined : {
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

export class MobileListBrief extends React.Component {
  render() {
    return React.createElement('div', { className: 'am-list-brief', style: this.props.style }, this.props.children);
  }
}

export class MobileListItem extends React.Component {
  static defaultProps = {
    prefixCls: 'am-list',
    align: 'middle',
    error: false,
    multipleLine: false,
    wrap: false,
    platform: 'ios',
  };

  static Brief = MobileListBrief;

  state = {
    coverRippleStyle: { display: 'none' },
    rippleClicked: false,
  };

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  onClick = event => {
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
      this.setState({
        coverRippleStyle: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}px`,
          top: `${top}px`,
        },
        rippleClicked: true,
      }, () => {
        this.debounceTimeout = setTimeout(() => {
          this.setState({
            coverRippleStyle: { display: 'none' },
            rippleClicked: false,
          });
        }, 1000);
      });
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
    const touchHandlers = {};
    Object.keys(restProps).forEach(key => {
      if (/onTouch/i.test(key)) touchHandlers[key] = restProps[key];
    });
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
    const item = React.createElement(
      'div',
      { ...restProps, onClick: this.onClick, className: itemClassName },
      thumb ? React.createElement(
        'div',
        { className: `${prefixCls}-thumb` },
        typeof thumb === 'string' ? React.createElement('img', { src: thumb }) : thumb,
      ) : null,
      React.createElement(
        'div',
        { className: lineClassName },
        children !== undefined ? React.createElement('div', { className: `${prefixCls}-content` }, children) : null,
        extra !== undefined ? React.createElement('div', { className: `${prefixCls}-extra` }, extra) : null,
        arrow ? React.createElement('div', { className: arrowClassName, 'aria-hidden': 'true' }) : null,
      ),
      React.createElement('div', { style: this.state.coverRippleStyle, className: rippleClassName }),
    );
    return React.createElement(Touchable, {
      ...touchHandlers,
      disabled: disabled || !onClick,
      activeStyle,
      activeClassName: `${prefixCls}-item-active`,
    }, item);
  }
}

export class MobileList extends React.Component {
  static Item = MobileListItem;
  static defaultProps = { prefixCls: 'am-list' };

  render() {
    const {
      prefixCls,
      children,
      className,
      style,
      renderHeader,
      renderFooter,
      ...restProps
    } = this.props;
    return React.createElement(
      'div',
      { className: classNames(prefixCls, className), style, ...restProps },
      renderHeader ? React.createElement('div', { className: `${prefixCls}-header` }, typeof renderHeader === 'function' ? renderHeader() : renderHeader) : null,
      children ? React.createElement('div', { className: `${prefixCls}-body` }, children) : null,
      renderFooter ? React.createElement('div', { className: `${prefixCls}-footer` }, typeof renderFooter === 'function' ? renderFooter() : renderFooter) : null,
    );
  }
}

export default MobileList;

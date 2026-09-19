"use strict";

const React = require("./reactRuntime.js");
const RcMenuItem = require("./MenuItem.js").default;
const Tooltip = require("./antdTooltip.js").default;
const MenuContext = require("./antdMenuContext.js");
const SiderContext = require("./antdSiderContext.js");

class AntdMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = event => {
      this.menuItem.onKeyDown(event);
    };

    this.saveMenuItem = menuItem => {
      this.menuItem = menuItem;
    };

    this.renderItem = siderContext => {
      const { siderCollapsed } = siderContext;
      const { level, children, rootPrefixCls, title, ...restProps } = this.props;

      return React.createElement(MenuContext.Consumer, null, menuContext => {
        const tooltipProps = {
          title: title || (level === 1 ? children : "")
        };
        if (!siderCollapsed && !menuContext.inlineCollapsed) {
          tooltipProps.title = null;
          tooltipProps.visible = false;
        }

        return React.createElement(Tooltip, Object.assign({}, tooltipProps, {
          placement: "right",
          overlayClassName: `${rootPrefixCls}-inline-collapsed-tooltip`
        }), React.createElement(RcMenuItem, Object.assign({}, restProps, {
          title,
          ref: this.saveMenuItem
        })));
      });
    };
  }

  render() {
    return React.createElement(SiderContext.Consumer, null, this.renderItem);
  }
}

AntdMenuItem.isMenuItem = true;

module.exports = AntdMenuItem;

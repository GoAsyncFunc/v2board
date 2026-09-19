"use strict";

const React = require("./reactRuntime.js");
const RcMenu = require("./RcMenu.js").default;
const RcMenuItemGroup = require("./MenuItemGroup.js").default;
const RcMenuDivider = require("./MenuDivider.js").default;
const classNames = require("./classNames.js");
const omitProps = require("./omitProps.js").a;
const { polyfill } = require("./reactLifecyclesCompat.js");
const warning = require("./antdWarning.js").a;
const requestAnimationFrame = require("./requestAnimationFrame.js").a;
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const MenuContext = require("./antdMenuContext.js");
const SiderContext = require("./antdSiderContext.js");
const collapseMotion = require("./antdCollapseMotion.js");
const AntdMenuItem = require("./AntdMenuItem.js");
const AntdSubMenu = require("./AntdSubMenu.js");

class InternalMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = event => {
      this.restoreModeVerticalFromInline();
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(event);
      }
    };

    this.handleTransitionEnd = event => {
      const widthCollapsed = event.propertyName === "width"
        && event.target === event.currentTarget;
      const targetClassName = event.target.className;
      const className = Object.prototype.toString.call(targetClassName) === "[object SVGAnimatedString]"
        ? targetClassName.animVal
        : targetClassName;
      const iconScaled = event.propertyName === "font-size"
        && className.indexOf("anticon") >= 0;
      if (widthCollapsed || iconScaled) {
        this.restoreModeVerticalFromInline();
      }
    };

    this.handleClick = event => {
      this.handleOpenChange([]);
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };

    this.handleOpenChange = openKeys => {
      this.setOpenKeys(openKeys);
      if (this.props.onOpenChange) {
        this.props.onOpenChange(openKeys);
      }
    };

    this.renderMenu = config => {
      const { getPopupContainer, getPrefixCls } = config;
      const {
        prefixCls: customPrefixCls,
        className,
        theme,
        collapsedWidth
      } = this.props;
      const passProps = omitProps(this.props, ["collapsedWidth", "siderCollapsed"]);
      const menuMode = this.getRealMenuMode();
      const prefixCls = getPrefixCls("menu", customPrefixCls);
      const menuClassName = classNames(
        className,
        `${prefixCls}-${theme}`,
        { [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed() }
      );
      const menuProps = Object.assign({
        openKeys: this.state.openKeys,
        onOpenChange: this.handleOpenChange,
        className: menuClassName,
        mode: menuMode
      }, this.getOpenMotionProps(menuMode));

      if (menuMode !== "inline") {
        menuProps.onClick = this.handleClick;
      }
      const hideMenu = this.getInlineCollapsed()
        && (collapsedWidth === 0 || collapsedWidth === "0" || collapsedWidth === "0px");
      if (hideMenu) {
        menuProps.openKeys = [];
      }

      return React.createElement(RcMenu, Object.assign({
        getPopupContainer
      }, passProps, menuProps, {
        prefixCls,
        onTransitionEnd: this.handleTransitionEnd,
        onMouseEnter: this.handleMouseEnter
      }));
    };

    warning(
      !("onOpen" in props || "onClose" in props),
      "Menu",
      "`onOpen` and `onClose` are removed, please use `onOpenChange` instead, see: https://u.ant.design/menu-on-open-change."
    );
    warning(
      !("inlineCollapsed" in props && props.mode !== "inline"),
      "Menu",
      "`inlineCollapsed` should only be used when `mode` is inline."
    );
    warning(
      !(props.siderCollapsed !== undefined && "inlineCollapsed" in props),
      "Menu",
      "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."
    );

    let openKeys;
    if ("openKeys" in props) {
      openKeys = props.openKeys;
    } else if ("defaultOpenKeys" in props) {
      openKeys = props.defaultOpenKeys;
    }
    this.state = {
      openKeys: openKeys || [],
      switchingModeFromInline: false,
      inlineOpenKeys: [],
      prevProps: props
    };
  }

  static getDerivedStateFromProps(nextProps, previousState) {
    const previousProps = previousState.prevProps;
    const nextState = { prevProps: nextProps };

    if (previousProps.mode === "inline" && nextProps.mode !== "inline") {
      nextState.switchingModeFromInline = true;
    }
    if ("openKeys" in nextProps) {
      nextState.openKeys = nextProps.openKeys;
    } else {
      const collapsed = nextProps.inlineCollapsed && !previousProps.inlineCollapsed
        || nextProps.siderCollapsed && !previousProps.siderCollapsed;
      if (collapsed) {
        nextState.switchingModeFromInline = true;
        nextState.inlineOpenKeys = previousState.openKeys;
        nextState.openKeys = [];
      }

      const expanded = !nextProps.inlineCollapsed && previousProps.inlineCollapsed
        || !nextProps.siderCollapsed && previousProps.siderCollapsed;
      if (expanded) {
        nextState.openKeys = previousState.inlineOpenKeys;
        nextState.inlineOpenKeys = [];
      }
    }
    return nextState;
  }

  componentWillUnmount() {
    requestAnimationFrame.cancel(this.mountRafId);
  }

  setOpenKeys(openKeys) {
    if (!("openKeys" in this.props)) {
      this.setState({ openKeys });
    }
  }

  getRealMenuMode() {
    const inlineCollapsed = this.getInlineCollapsed();
    if (this.state.switchingModeFromInline && inlineCollapsed) {
      return "inline";
    }
    return inlineCollapsed ? "vertical" : this.props.mode;
  }

  getInlineCollapsed() {
    return this.props.siderCollapsed !== undefined
      ? this.props.siderCollapsed
      : this.props.inlineCollapsed;
  }

  getOpenMotionProps(menuMode) {
    const { openTransitionName, openAnimation, motion } = this.props;
    if (motion) {
      return { motion };
    }
    if (openAnimation) {
      warning(
        typeof openAnimation === "string",
        "Menu",
        "`openAnimation` do not support object. Please use `motion` instead."
      );
      return { openAnimation };
    }
    if (openTransitionName) {
      return { openTransitionName };
    }
    if (menuMode === "horizontal") {
      return { motion: { motionName: "slide-up" } };
    }
    if (menuMode === "inline") {
      return { motion: collapseMotion };
    }
    return {
      motion: {
        motionName: this.state.switchingModeFromInline ? "" : "zoom-big"
      }
    };
  }

  restoreModeVerticalFromInline() {
    if (this.state.switchingModeFromInline) {
      this.setState({ switchingModeFromInline: false });
    }
  }

  render() {
    return React.createElement(MenuContext.Provider, {
      value: {
        inlineCollapsed: this.getInlineCollapsed() || false,
        antdMenuTheme: this.props.theme
      }
    }, React.createElement(ConfigConsumer, null, this.renderMenu));
  }
}

InternalMenu.defaultProps = {
  className: "",
  theme: "light",
  focusable: false
};

polyfill(InternalMenu);

class AntdMenu extends React.Component {
  render() {
    return React.createElement(SiderContext.Consumer, null, context => (
      React.createElement(InternalMenu, Object.assign({}, this.props, context))
    ));
  }
}

AntdMenu.Divider = RcMenuDivider;
AntdMenu.Item = AntdMenuItem;
AntdMenu.SubMenu = AntdSubMenu;
AntdMenu.ItemGroup = RcMenuItemGroup;

exports.__esModule = true;
exports.default = AntdMenu;
exports.a = AntdMenu;

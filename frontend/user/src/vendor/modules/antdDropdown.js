"use strict";

const React = require("./reactRuntime.js");
const RcDropdown = require("./RcDropdown.js").a;
const classNames = require("./classNames.js");
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const warning = require("./antdWarning.js").a;
const Icon = require("../Icon.js").a;
const AntdDropdownButton = require("./AntdDropdownButton.js");

class AntdDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.renderOverlay = prefixCls => {
      const { overlay } = this.props;
      const overlayNode = React.Children.only(
        typeof overlay === "function" ? overlay() : overlay
      );
      const {
        mode,
        selectable = false,
        focusable = true
      } = overlayNode.props;

      warning(
        !mode || mode === "vertical",
        "Dropdown",
        `mode="${mode}" is not supported for Dropdown's Menu.`
      );

      const expandIcon = React.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, React.createElement(Icon, {
        type: "right",
        className: `${prefixCls}-menu-submenu-arrow-icon`
      }));

      return typeof overlayNode.type === "string"
        ? overlay
        : React.cloneElement(overlayNode, {
          mode: "vertical",
          selectable,
          focusable,
          expandIcon
        });
    };

    this.renderDropdown = config => {
      const {
        getPopupContainer: getContextPopupContainer,
        getPrefixCls
      } = config;
      const {
        prefixCls: customPrefixCls,
        children,
        trigger,
        disabled,
        getPopupContainer
      } = this.props;
      const prefixCls = getPrefixCls("dropdown", customPrefixCls);
      const child = React.Children.only(children);
      const dropdownTrigger = React.cloneElement(child, {
        className: classNames(child.props.className, `${prefixCls}-trigger`),
        disabled
      });
      const triggerActions = disabled ? [] : trigger;
      const alignPoint = triggerActions
        && triggerActions.indexOf("contextMenu") !== -1
        ? true
        : undefined;

      return React.createElement(RcDropdown, Object.assign({
        alignPoint
      }, this.props, {
        prefixCls,
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        transitionName: this.getTransitionName(),
        trigger: triggerActions,
        overlay: () => this.renderOverlay(prefixCls)
      }), dropdownTrigger);
    };
  }

  getTransitionName() {
    const { placement = "", transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    return placement.indexOf("top") >= 0 ? "slide-down" : "slide-up";
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderDropdown);
  }
}

AntdDropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  placement: "bottomLeft"
};
AntdDropdown.Button = AntdDropdownButton;

exports.__esModule = true;
exports.default = AntdDropdown;
exports.a = AntdDropdown;

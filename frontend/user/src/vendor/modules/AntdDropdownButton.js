"use strict";

const React = require("./reactRuntime.js");
const classNames = require("./classNames.js");
const Button = require("./antdButton.js").default;
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const Icon = require("../Icon.js").a;

const ButtonGroup = Button.Group;

class AntdDropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.renderButton = config => {
      const Dropdown = require("./antdDropdown.js").default;
      const {
        getPopupContainer: getContextPopupContainer,
        getPrefixCls
      } = config;
      const {
        prefixCls: customPrefixCls,
        type,
        disabled,
        onClick,
        htmlType,
        children,
        className,
        overlay,
        trigger,
        align,
        visible,
        onVisibleChange,
        placement,
        getPopupContainer,
        href,
        icon = React.createElement(Icon, { type: "ellipsis" }),
        title,
        ...restProps
      } = this.props;
      const prefixCls = getPrefixCls("dropdown-button", customPrefixCls);
      const dropdownProps = {
        align,
        overlay,
        disabled,
        trigger: disabled ? [] : trigger,
        onVisibleChange,
        placement,
        getPopupContainer: getPopupContainer || getContextPopupContainer
      };
      if ("visible" in this.props) {
        dropdownProps.visible = visible;
      }

      return React.createElement(ButtonGroup, Object.assign({}, restProps, {
        className: classNames(prefixCls, className)
      }), React.createElement(Button, {
        type,
        disabled,
        onClick,
        htmlType,
        href,
        title
      }, children), React.createElement(Dropdown, dropdownProps,
        React.createElement(Button, { type }, icon)
      ));
    };
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderButton);
  }
}

AntdDropdownButton.defaultProps = {
  placement: "bottomRight",
  type: "default"
};

module.exports = AntdDropdownButton;

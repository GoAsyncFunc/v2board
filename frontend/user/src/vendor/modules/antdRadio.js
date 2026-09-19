"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const RcCheckbox = require("./RcCheckbox.js").a;
const classNames = require("./classNames.js");
const shallowEqual = require("./shallowEqualWithComparator.js");
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const AntdRadioGroup = require("./AntdRadioGroup.js");
const AntdRadioButton = require("./AntdRadioButton.js");

class AntdRadio extends React.Component {
  constructor(props) {
    super(props);

    this.saveCheckbox = checkbox => {
      this.rcCheckbox = checkbox;
    };

    this.onChange = event => {
      if (this.props.onChange) {
        this.props.onChange(event);
      }
      const { radioGroup } = this.context;
      if (radioGroup && radioGroup.onChange) {
        radioGroup.onChange(event);
      }
    };

    this.renderRadio = config => {
      const {
        prefixCls: customPrefixCls,
        className,
        children,
        style,
        ...restProps
      } = this.props;
      const { radioGroup } = this.context;
      const prefixCls = config.getPrefixCls("radio", customPrefixCls);
      const radioProps = Object.assign({}, restProps);
      if (radioGroup) {
        radioProps.name = radioGroup.name;
        radioProps.onChange = this.onChange;
        radioProps.checked = this.props.value === radioGroup.value;
        radioProps.disabled = this.props.disabled || radioGroup.disabled;
      }
      const wrapperClassName = classNames(className, {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-checked`]: radioProps.checked,
        [`${prefixCls}-wrapper-disabled`]: radioProps.disabled
      });

      return React.createElement("label", {
        className: wrapperClassName,
        style,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave
      }, React.createElement(RcCheckbox, Object.assign({}, radioProps, {
        prefixCls,
        ref: this.saveCheckbox
      })), children !== undefined ? React.createElement("span", null, children) : null);
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps)
      || !shallowEqual(this.state, nextState)
      || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderRadio);
  }
}

AntdRadio.defaultProps = {
  type: "radio"
};
AntdRadio.contextTypes = {
  radioGroup: PropTypes.any
};
AntdRadio.Button = AntdRadioButton;
AntdRadio.Group = AntdRadioGroup;

exports.__esModule = true;
exports.default = AntdRadio;
exports.a = AntdRadio;

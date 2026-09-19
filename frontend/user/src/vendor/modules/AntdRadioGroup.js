"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const classNames = require("./classNames.js");
const shallowEqual = require("./shallowEqualWithComparator.js");
const { polyfill } = require("./reactLifecyclesCompat.js");
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;

function getCheckedValue(children) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, radio => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

class AntdRadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.onRadioChange = event => {
      const previousValue = this.state.value;
      const value = event.target.value;
      if (!("value" in this.props)) {
        this.setState({ value });
      }
      if (this.props.onChange && value !== previousValue) {
        this.props.onChange(event);
      }
    };

    this.renderGroup = config => {
      const AntdRadio = require("./antdRadio.js").default;
      const {
        prefixCls: customPrefixCls,
        className = "",
        options,
        buttonStyle
      } = this.props;
      const prefixCls = config.getPrefixCls("radio", customPrefixCls);
      const groupPrefixCls = `${prefixCls}-group`;
      const groupClassName = classNames(
        groupPrefixCls,
        `${groupPrefixCls}-${buttonStyle}`,
        { [`${groupPrefixCls}-${this.props.size}`]: this.props.size },
        className
      );
      let children = this.props.children;

      if (options && options.length > 0) {
        children = options.map(option => {
          if (typeof option === "string") {
            return React.createElement(AntdRadio, {
              key: option,
              prefixCls,
              disabled: this.props.disabled,
              value: option,
              checked: this.state.value === option
            }, option);
          }
          return React.createElement(AntdRadio, {
            key: `radio-group-value-options-${option.value}`,
            prefixCls,
            disabled: option.disabled || this.props.disabled,
            value: option.value,
            checked: this.state.value === option.value
          }, option.label);
        });
      }

      return React.createElement("div", {
        className: groupClassName,
        style: this.props.style,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        id: this.props.id
      }, children);
    };

    let value;
    if ("value" in props) {
      value = props.value;
    } else if ("defaultValue" in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = { value };
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return { value: nextProps.value };
    }
    const checkedValue = getCheckedValue(nextProps.children);
    return checkedValue ? { value: checkedValue.value } : null;
  }

  getChildContext() {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderGroup);
  }
}

AntdRadioGroup.defaultProps = {
  buttonStyle: "outline"
};
AntdRadioGroup.childContextTypes = {
  radioGroup: PropTypes.any
};

polyfill(AntdRadioGroup);

module.exports = AntdRadioGroup;

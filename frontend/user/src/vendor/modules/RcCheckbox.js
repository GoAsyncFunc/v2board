var React = require("./reactRuntime.js");
var PropTypes = require("./propTypesRuntime.js");
var classNames = require("./classNames.js");
var lifecycleCompat = require("./reactLifecyclesCompat.js");

class RcCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "checked" in props ? props.checked : props.defaultChecked
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveInput = this.saveInput.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return "checked" in props ? Object.assign({}, state, { checked: props.checked }) : null;
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  handleChange(event) {
    var checked = event.target.checked;
    if (this.props.disabled) return;

    if (!("checked" in this.props)) this.setState({ checked: checked });
    if (this.props.onChange) {
      this.props.onChange({
        target: Object.assign({}, this.props, { checked: checked }),
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        nativeEvent: event.nativeEvent
      });
    }
  }

  saveInput(input) {
    this.input = input;
  }

  render() {
    var props = this.props;
    var checked = this.state.checked;
    var inputProps = Object.keys(props).reduce(function collectGlobalProps(result, key) {
      if (key.substr(0, 5) === "aria-" || key.substr(0, 5) === "data-" || key === "role") {
        result[key] = props[key];
      }
      return result;
    }, {});

    return React.createElement("span", {
      className: classNames(props.prefixCls, props.className, {
        [props.prefixCls + "-checked"]: checked,
        [props.prefixCls + "-disabled"]: props.disabled
      }),
      style: props.style
    }, React.createElement("input", Object.assign({
      name: props.name,
      id: props.id,
      type: props.type,
      readOnly: props.readOnly,
      disabled: props.disabled,
      tabIndex: props.tabIndex,
      className: props.prefixCls + "-input",
      checked: !!checked,
      onClick: props.onClick,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onChange: this.handleChange,
      autoFocus: props.autoFocus,
      ref: this.saveInput,
      value: props.value
    }, inputProps)), React.createElement("span", {
      className: props.prefixCls + "-inner"
    }));
  }
}

RcCheckbox.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  value: PropTypes.any
};

RcCheckbox.defaultProps = {
  prefixCls: "rc-checkbox",
  className: "",
  style: {},
  type: "checkbox",
  defaultChecked: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
};

lifecycleCompat.polyfill(RcCheckbox);
exports["a"] = RcCheckbox;

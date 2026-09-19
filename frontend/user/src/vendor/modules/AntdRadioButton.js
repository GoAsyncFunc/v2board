"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;

class AntdRadioButton extends React.Component {
  constructor(props) {
    super(props);

    this.renderRadioButton = config => {
      const AntdRadio = require("./antdRadio.js").default;
      const { prefixCls: customPrefixCls, ...radioProps } = this.props;
      const prefixCls = config.getPrefixCls("radio-button", customPrefixCls);
      if (this.context.radioGroup) {
        radioProps.checked = this.props.value === this.context.radioGroup.value;
        radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
      }
      return React.createElement(AntdRadio, Object.assign({ prefixCls }, radioProps));
    };
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderRadioButton);
  }
}

AntdRadioButton.contextTypes = {
  radioGroup: PropTypes.any
};

module.exports = AntdRadioButton;

var React = require("./reactRuntime.js");
var PropTypes = require("./propTypesRuntime.js");

class TooltipContent extends React.Component {
  componentDidUpdate() {
    if (this.props.trigger) this.props.trigger.forcePopupAlign();
  }

  render() {
    var overlay = this.props.overlay;
    return React.createElement("div", {
      className: this.props.prefixCls + "-inner",
      id: this.props.id,
      role: "tooltip"
    }, typeof overlay === "function" ? overlay() : overlay);
  }
}

TooltipContent.propTypes = {
  prefixCls: PropTypes.string,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  id: PropTypes.string,
  trigger: PropTypes.any
};

module.exports = TooltipContent;

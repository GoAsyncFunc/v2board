var React = require("./reactRuntime.js");
var Empty = require("./Empty.js");

function renderEmpty(componentName) {
  var ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
  return React.createElement(ConfigConsumer, null, function renderWithConfig(config) {
    var prefixCls = config.getPrefixCls("empty");
    switch (componentName) {
      case "Table":
      case "List":
        return React.createElement(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE });
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE,
          className: prefixCls + "-small"
        });
      default:
        return React.createElement(Empty, null);
    }
  });
}

module.exports = renderEmpty;

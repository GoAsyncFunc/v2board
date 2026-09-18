var React = require("./reactRuntime.js");
var createReactContext = require("./createReactContext.js");
var renderEmpty = require("./renderEmpty.js");

var ConfigContext = createReactContext({
  getPrefixCls: function getPrefixCls(suffixCls, customPrefixCls) {
    return customPrefixCls || "ant-" + suffixCls;
  },
  renderEmpty: renderEmpty
});
var ConfigConsumer = ConfigContext.Consumer;

function withConfigConsumer(config) {
  return function wrapWithConfigConsumer(Component) {
    function ConfiguredComponent(props) {
      return React.createElement(ConfigConsumer, null, function renderWithConfig(configProps) {
        var prefixCls = configProps.getPrefixCls(config.prefixCls, props.prefixCls);
        return React.createElement(Component, Object.assign({}, configProps, props, {
          prefixCls: prefixCls
        }));
      });
    }

    var constructor = Component.constructor;
    var name = constructor && constructor.displayName || Component.name || "Component";
    ConfiguredComponent.displayName = "withConfigConsumer(" + name + ")";
    return ConfiguredComponent;
  };
}

exports.ConfigContext = ConfigContext;
exports.ConfigConsumer = ConfigConsumer;
exports.withConfigConsumer = withConfigConsumer;
exports["b"] = ConfigContext;
exports["a"] = ConfigConsumer;
exports["c"] = withConfigConsumer;

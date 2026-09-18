const {
  defineExport
} = require("../../app/moduleInterop.js");

var React = require("./reactRuntime.js"),
  PropTypes = require("./propTypesRuntime.js"),
  defaultLocaleData = require("./antdEnglishLocale.js")["a"];

function assign(target) {
  for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
    var source = arguments[sourceIndex];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
    }
  }
  return target;
}

class LocaleReceiver extends React.Component {
  getLocale() {
    var componentName = this.props.componentName,
      defaultLocale = this.props.defaultLocale,
      locale = defaultLocale || defaultLocaleData[componentName || "global"],
      antLocale = this.context.antLocale,
      localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return assign(assign({}, "function" === typeof locale ? locale() : locale), localeFromContext || {});
  }

  getLocaleCode() {
    var antLocale = this.context.antLocale,
      localeCode = antLocale && antLocale.locale;
    if (antLocale && antLocale.exist && !localeCode) return defaultLocaleData.locale;
    return localeCode;
  }

  render() {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.antLocale);
  }
}

LocaleReceiver.defaultProps = {
  componentName: "global"
};
LocaleReceiver.contextTypes = {
  antLocale: PropTypes.object
};

defineExport(exports, "a", function () {
  return LocaleReceiver;
});

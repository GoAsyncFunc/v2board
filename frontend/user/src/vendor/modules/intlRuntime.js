let legacyModule = module,
  legacyExports = exports;
function getEnumerableKeys(object, includeSymbols) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    includeSymbols && (symbols = symbols.filter(function (symbol) {
      return Object.getOwnPropertyDescriptor(object, symbol).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function copyProperties(target) {
  for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
    var source = null != arguments[sourceIndex] ? arguments[sourceIndex] : {};
    sourceIndex % 2 ? getEnumerableKeys(Object(source), !0).forEach(function (key) {
      defineEnumerableProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : getEnumerableKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function defineEnumerableProperty(target, key, value) {
  return key in target ? Object.defineProperty(target, key, {
    value: value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target;
}
var intlObject,
  intlExports = require("./4a525065.js"),
  createLocaleContext = require("./antdCreateReactContext.js");
function setLocale(locale) {
  var reload = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
    globalObject = window,
    languageSeparator = globalObject.g_langSeparator,
    separator = void 0 === languageSeparator ? "-" : languageSeparator,
    localePattern = new RegExp("^([a-z]{2})".concat(separator, "?([A-Z]{2})?$"));
  if (void 0 !== locale && !localePattern.test(locale)) throw new Error("setLocale lang format error");
  if (getLocale() !== locale && (window.g_lang = locale, window.localStorage.setItem("umi_locale", locale || ""), intlObject && !reload && intlObject.reloadAppLocale(), reload && window.location.reload(), window.dispatchEvent)) {
    var languageChangeEvent = new Event("languagechange");
    window.dispatchEvent(languageChangeEvent);
  }
}
function getLocale() {
  var globalObject = window,
    languageSeparator = globalObject.g_langSeparator,
    separator = void 0 === languageSeparator ? "-" : languageSeparator,
    globalLocale = globalObject.g_lang,
    storedLocale = "undefined" !== typeof localStorage ? window.localStorage.getItem("umi_locale") : "",
    hasNavigatorLanguage = "undefined" !== typeof navigator && "string" === typeof navigator.language,
    navigatorLocale = hasNavigatorLanguage ? navigator.language.split("-").join(separator) : "";
  return storedLocale || globalLocale || navigatorLocale;
}
var messageApi,
  localeContext = createLocaleContext({
    lang: getLocale()
  }),
  messageExports = {};
function setIntlObject(value) {
  messageApi = value;
}
function setLocaleContext(value) {
  intlObject = value;
}
[
  "formatMessage",
  "formatHTMLMessage",
  "formatDate",
  "formatTime",
  "formatRelative",
  "formatNumber",
  "formatPlural",
  "LangContext",
  "now",
  "onError"
].forEach(function (methodName) {
  messageExports[methodName] = function () {
    var method;
    return messageApi && messageApi[methodName] ? (method = messageApi[methodName]).call.apply(method, [messageApi].concat(Array.prototype.slice.call(arguments))) : (console && console.warn && console.warn("[umi-plugin-locale] ".concat(methodName, " not initialized yet, you should use it after react app mounted.")), null);
  };
}), legacyModule.exports = copyProperties({}, intlExports, {}, messageExports, {
  setLocale: setLocale,
  getLocale: getLocale,
  _setIntlObject: setIntlObject,
  LangContext: localeContext,
  _setLocaleContext: setLocaleContext
});

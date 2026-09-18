let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
legacyExports.canUseDOM = !("undefined" === typeof window || !window.document || !window.document.createElement), legacyExports.getConfirmation = function (e, t) {
  return t(window.confirm(e));
}, legacyExports.supportsHistory = function () {
  var e = window.navigator.userAgent;
  return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && window.history && "pushState" in window.history;
}, legacyExports.supportsPopStateOnHashChange = function () {
  return -1 === window.navigator.userAgent.indexOf("Trident");
}, legacyExports.supportsGoWithoutReloadUsingHash = function () {
  return -1 === window.navigator.userAgent.indexOf("Firefox");
}, legacyExports.isExtraneousPopstateEvent = function (e) {
  return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS");
};

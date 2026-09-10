let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = ["minLines", "maxLines", "readOnly", "highlightActiveLine", "tabSize", "enableBasicAutocompletion", "enableLiveAutocompletion", "enableSnippets"];
legacyExports.editorOptions = r;
var i = ["onChange", "onFocus", "onInput", "onBlur", "onCopy", "onPaste", "onSelectionChange", "onCursorChange", "onScroll", "handleOptions", "updateRef"];
legacyExports.editorEvents = i;
var o = function () {
  var e;
  return window.ace ? (e = window.ace, e.acequire = window.ace.require || window.ace.acequire) : e = require("./62552f73.js"), e;
};
legacyExports.getAceInstance = o;
var a = function (e, t) {
  var n = null;
  return function () {
    var r = this,
      i = arguments;
    clearTimeout(n), n = setTimeout(function () {
      e.apply(r, i);
    }, t);
  };
};
legacyExports.debounce = a;

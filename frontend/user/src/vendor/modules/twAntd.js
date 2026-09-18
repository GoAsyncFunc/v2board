let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./paginationLocaleZhHant.js"),
  calendarLocale = require("./calendarLocaleZhHant.js"),
  o = {
    placeholder: "\u8acb\u9078\u64c7\u6642\u9593"
  },
  l = o;
function a() {
  return a = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, a.apply(this, arguments);
}
var i = {
  lang: a({
    placeholder: "\u8acb\u9078\u64c7\u65e5\u671f",
    rangePlaceholder: ["\u958b\u59cb\u65e5\u671f", "\u7d50\u675f\u65e5\u671f"]
  }, calendarLocale),
  timePickerLocale: a({}, l)
};
i.lang.ok = "\u78ba \u5b9a";
var u = i,
  s = u,
  h = {
    locale: "zh-tw",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    Table: {
      filterTitle: "\u7be9\u9078\u5668",
      filterConfirm: "\u78ba \u5b9a",
      filterReset: "\u91cd \u7f6e",
      selectAll: "\u5168\u90e8\u9078\u53d6",
      selectInvert: "\u53cd\u5411\u9078\u53d6"
    },
    Modal: {
      okText: "\u78ba \u5b9a",
      cancelText: "\u53d6 \u6d88",
      justOkText: "OK"
    },
    Popconfirm: {
      okText: "\u78ba \u5b9a",
      cancelText: "\u53d6 \u6d88"
    },
    Transfer: {
      searchPlaceholder: "\u641c\u5c0b\u8cc7\u6599",
      itemUnit: "\u9805\u76ee",
      itemsUnit: "\u9805\u76ee"
    },
    Upload: {
      uploading: "\u6b63\u5728\u4e0a\u50b3...",
      removeFile: "\u522a\u9664\u6a94\u6848",
      uploadError: "\u4e0a\u50b3\u5931\u6557",
      previewFile: "\u6a94\u6848\u9810\u89bd",
      downloadFile: "\u4e0b\u8f7d\u6587\u4ef6"
    },
    Empty: {
      description: "\u7121\u6b64\u8cc7\u6599"
    },
    PageHeader: {
      back: "\u8fd4\u56de"
    }
  };
legacyExports["default"] = h;

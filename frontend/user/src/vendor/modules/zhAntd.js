let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./paginationLocaleZhHans.js"),
  calendarLocale = require("./calendarLocaleZhHans.js"),
  o = {
    placeholder: "\u8bf7\u9009\u62e9\u65f6\u95f4"
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
    placeholder: "\u8bf7\u9009\u62e9\u65e5\u671f",
    rangePlaceholder: ["\u5f00\u59cb\u65e5\u671f", "\u7ed3\u675f\u65e5\u671f"]
  }, calendarLocale),
  timePickerLocale: a({}, l)
};
i.lang.ok = "\u786e \u5b9a";
var u = i,
  s = u,
  h = {
    locale: "zh-cn",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    global: {
      placeholder: "\u8bf7\u9009\u62e9"
    },
    Table: {
      filterTitle: "\u7b5b\u9009",
      filterConfirm: "\u786e\u5b9a",
      filterReset: "\u91cd\u7f6e",
      selectAll: "\u5168\u9009\u5f53\u9875",
      selectInvert: "\u53cd\u9009\u5f53\u9875",
      sortTitle: "\u6392\u5e8f",
      expand: "\u5c55\u5f00\u884c",
      collapse: "\u5173\u95ed\u884c"
    },
    Modal: {
      okText: "\u786e\u5b9a",
      cancelText: "\u53d6\u6d88",
      justOkText: "\u77e5\u9053\u4e86"
    },
    Popconfirm: {
      cancelText: "\u53d6\u6d88",
      okText: "\u786e\u5b9a"
    },
    Transfer: {
      searchPlaceholder: "\u8bf7\u8f93\u5165\u641c\u7d22\u5185\u5bb9",
      itemUnit: "\u9879",
      itemsUnit: "\u9879"
    },
    Upload: {
      uploading: "\u6587\u4ef6\u4e0a\u4f20\u4e2d",
      removeFile: "\u5220\u9664\u6587\u4ef6",
      uploadError: "\u4e0a\u4f20\u9519\u8bef",
      previewFile: "\u9884\u89c8\u6587\u4ef6",
      downloadFile: "\u4e0b\u8f7d\u6587\u4ef6"
    },
    Empty: {
      description: "\u6682\u65e0\u6570\u636e"
    },
    Icon: {
      icon: "\u56fe\u6807"
    },
    Text: {
      edit: "\u7f16\u8f91",
      copy: "\u590d\u5236",
      copied: "\u590d\u5236\u6210\u529f",
      expand: "\u5c55\u5f00"
    },
    PageHeader: {
      back: "\u8fd4\u56de"
    }
  };
legacyExports["default"] = h;

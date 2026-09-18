let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./paginationLocaleJa.js"),
  calendarLocale = require("./calendarLocaleJa.js"),
  o = {
    placeholder: "\u6642\u523b\u3092\u9078\u629e"
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
      placeholder: "\u65e5\u4ed8\u3092\u9078\u629e",
      rangePlaceholder: ["\u958b\u59cb\u65e5\u4ed8", "\u7d42\u4e86\u65e5\u4ed8"]
    }, calendarLocale),
    timePickerLocale: a({}, l)
  },
  u = i,
  s = u,
  h = {
    locale: "ja",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    Table: {
      filterTitle: "\u30e1\u30cb\u30e5\u30fc\u3092\u30d5\u30a3\u30eb\u30bf\u30fc",
      filterConfirm: "OK",
      filterReset: "\u30ea\u30bb\u30c3\u30c8",
      selectAll: "\u3059\u3079\u3066\u3092\u9078\u629e",
      selectInvert: "\u9078\u629e\u3092\u53cd\u8ee2"
    },
    Modal: {
      okText: "OK",
      cancelText: "\u30ad\u30e3\u30f3\u30bb\u30eb",
      justOkText: "OK"
    },
    Popconfirm: {
      okText: "OK",
      cancelText: "\u30ad\u30e3\u30f3\u30bb\u30eb"
    },
    Transfer: {
      searchPlaceholder: "\u3053\u3053\u3092\u691c\u7d22",
      itemUnit: "\u30a2\u30a4\u30c6\u30e0",
      itemsUnit: "\u30a2\u30a4\u30c6\u30e0"
    },
    Upload: {
      uploading: "\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u4e2d...",
      removeFile: "\u30d5\u30a1\u30a4\u30eb\u3092\u524a\u9664",
      uploadError: "\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u30a8\u30e9\u30fc",
      previewFile: "\u30d5\u30a1\u30a4\u30eb\u3092\u30d7\u30ec\u30d3\u30e5\u30fc",
      downloadFile: "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30d5\u30a1\u30a4\u30eb"
    },
    Empty: {
      description: "\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093"
    }
  };
legacyExports["default"] = h;

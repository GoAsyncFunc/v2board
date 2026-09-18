let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./7a6a3171.js"),
  r = require("./58596168.js"),
  o = {
    placeholder: "\u0627\u0646\u062a\u062e\u0627\u0628 \u0632\u0645\u0627\u0646"
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
      placeholder: "\u0627\u0646\u062a\u062e\u0627\u0628 \u062a\u0627\u0631\u06cc\u062e",
      rangePlaceholder: ["\u062a\u0627\u0631\u06cc\u062e \u0634\u0631\u0648\u0639", "\u062a\u0627\u0631\u06cc\u062e \u067e\u0627\u06cc\u0627\u0646"]
    }, r["a"]),
    timePickerLocale: a({}, l)
  },
  u = i,
  s = u,
  h = {
    locale: "fa",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    Table: {
      filterTitle: "\u0645\u0646\u0648\u06cc \u0641\u06cc\u0644\u062a\u0631",
      filterConfirm: "\u062a\u0627\u06cc\u06cc\u062f",
      filterReset: "\u067e\u0627\u06a9 \u06a9\u0631\u062f\u0646",
      selectAll: "\u0627\u0646\u062a\u062e\u0627\u0628 \u0635\u0641\u062d\u0647\u200c\u06cc \u06a9\u0646\u0648\u0646\u06cc",
      selectInvert: "\u0645\u0639\u06a9\u0648\u0633 \u06a9\u0631\u062f\u0646 \u0627\u0646\u062a\u062e\u0627\u0628\u200c\u0647\u0627 \u062f\u0631 \u0635\u0641\u062d\u0647 \u06cc \u06a9\u0646\u0648\u0646\u06cc"
    },
    Modal: {
      okText: "\u062a\u0627\u06cc\u06cc\u062f",
      cancelText: "\u0644\u063a\u0648",
      justOkText: "\u062a\u0627\u06cc\u06cc\u062f"
    },
    Popconfirm: {
      okText: "\u062a\u0627\u06cc\u06cc\u062f",
      cancelText: "\u0644\u063a\u0648"
    },
    Transfer: {
      searchPlaceholder: "\u062c\u0633\u062a\u062c\u0648",
      itemUnit: "",
      itemsUnit: ""
    },
    Upload: {
      uploading: "\u062f\u0631 \u062d\u0627\u0644 \u0622\u067e\u0644\u0648\u062f...",
      removeFile: "\u062d\u0630\u0641 \u0641\u0627\u06cc\u0644",
      uploadError: "\u062e\u0637\u0627 \u062f\u0631 \u0622\u067e\u0644\u0648\u062f",
      previewFile: "\u0645\u0634\u0627\u0647\u062f\u0647\u200c\u06cc \u0641\u0627\u06cc\u0644",
      downloadFile: "\u062f\u0631\u06cc\u0627\u0641\u062a \u0641\u0627\u06cc\u0644"
    },
    Empty: {
      description: "\u062f\u0627\u062f\u0647\u200c\u0627\u06cc \u0645\u0648\u062c\u0648\u062f \u0646\u06cc\u0633\u062a"
    }
  };
legacyExports["default"] = h;

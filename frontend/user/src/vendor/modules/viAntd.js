let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./paginationLocaleVi.js"),
  r = require("./7a526348.js"),
  o = {
    placeholder: "Ch\u1ecdn th\u1eddi gian"
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
      placeholder: "Ch\u1ecdn th\u1eddi \u0111i\u1ec3m",
      rangePlaceholder: ["Ng\xe0y b\u1eaft \u0111\u1ea7u", "Ng\xe0y k\u1ebft th\xfac"]
    }, r["a"]),
    timePickerLocale: a({}, l)
  },
  u = i,
  s = u,
  h = {
    locale: "vi",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    Table: {
      filterTitle: "B\u1ed9 ",
      filterConfirm: "OK",
      filterReset: "T\u1ea1o L\u1ea1i",
      selectAll: "Ch\u1ecdn T\u1ea5t C\u1ea3",
      selectInvert: "Ch\u1ecdn Ng\u01b0\u1ee3c L\u1ea1i"
    },
    Modal: {
      okText: "OK",
      cancelText: "Hu\u1ef7",
      justOkText: "OK"
    },
    Popconfirm: {
      okText: "OK",
      cancelText: "Hu\u1ef7"
    },
    Transfer: {
      searchPlaceholder: "T\xecm \u1edf \u0111\xe2y",
      itemUnit: "m\u1ee5c",
      itemsUnit: "m\u1ee5c"
    },
    Upload: {
      uploading: "\u0110ang t\u1ea3i l\xean...",
      removeFile: "G\u1ee1 b\u1ecf t\u1eadp tin",
      uploadError: "L\u1ed7i t\u1ea3i l\xean",
      previewFile: "Xem th\u1eed t\u1eadp tin",
      downloadFile: "T\u1ea3i t\u1eadp tin"
    },
    Empty: {
      description: "Tr\u1ed1ng"
    }
  };
legacyExports["default"] = h;

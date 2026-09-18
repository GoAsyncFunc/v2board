let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./52422f41.js"),
  r = require("./4376744f.js"),
  o = {
    placeholder: "\ub0a0\uc9dc \uc120\ud0dd"
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
      placeholder: "\ub0a0\uc9dc \uc120\ud0dd",
      rangePlaceholder: ["\uc2dc\uc791\uc77c", "\uc885\ub8cc\uc77c"]
    }, r["a"]),
    timePickerLocale: a({}, l)
  },
  u = i,
  s = u,
  h = {
    locale: "ko",
    Pagination: n["a"],
    DatePicker: u,
    TimePicker: l,
    Calendar: s,
    Table: {
      filterTitle: "\ud544\ud130 \uba54\ub274",
      filterConfirm: "\ud655\uc778",
      filterReset: "\ucd08\uae30\ud654",
      selectAll: "\ubaa8\ub450 \uc120\ud0dd",
      selectInvert: "\uc120\ud0dd \ubc18\uc804"
    },
    Modal: {
      okText: "\ud655\uc778",
      cancelText: "\ucde8\uc18c",
      justOkText: "\ud655\uc778"
    },
    Popconfirm: {
      okText: "\ud655\uc778",
      cancelText: "\ucde8\uc18c"
    },
    Transfer: {
      searchPlaceholder: "\uc5ec\uae30\uc5d0 \uac80\uc0c9\ud558\uc138\uc694",
      itemUnit: "\uac1c",
      itemsUnit: "\uac1c"
    },
    Upload: {
      uploading: "\uc5c5\ub85c\ub4dc \uc911...",
      removeFile: "\ud30c\uc77c \uc0ad\uc81c",
      uploadError: "\uc5c5\ub85c\ub4dc \uc2e4\ud328",
      previewFile: "\ud30c\uc77c \ubbf8\ub9ac\ubcf4\uae30",
      downloadFile: "\ud30c\uc77c \ub2e4\uc6b4\ub85c\ub4dc"
    },
    Empty: {
      description: "\ub370\uc774\ud130 \uc5c6\uc74c"
    }
  };
legacyExports["default"] = h;

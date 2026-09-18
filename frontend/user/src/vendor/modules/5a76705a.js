let legacyModule = module,
  legacyExports = exports;
var n = require("./paginationLocaleEn.js"),
  r = require("./antdDateLocaleEn.js"),
  o = {
    placeholder: "Select time"
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
      placeholder: "Select date",
      rangePlaceholder: ["Start date", "End date"]
    }, r["a"]),
    timePickerLocale: a({}, l)
  },
  u = i,
  s = u;
legacyExports["a"] = {
  locale: "en",
  Pagination: n["a"],
  DatePicker: u,
  TimePicker: l,
  Calendar: s,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  }
};

var paginationLocale = require("./paginationLocaleEn.js")["a"],
  datePickerLanguage = require("./antdDateLocaleEn.js")["a"],
  timePickerLocale = {
    placeholder: "Select time"
  },
  datePickerLocale = {
    lang: Object.assign({
      placeholder: "Select date",
      rangePlaceholder: ["Start date", "End date"]
    }, datePickerLanguage),
    timePickerLocale: Object.assign({}, timePickerLocale)
  };

exports["a"] = {
  locale: "en",
  Pagination: paginationLocale,
  DatePicker: datePickerLocale,
  TimePicker: timePickerLocale,
  Calendar: datePickerLocale,
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

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var tableModule = interopDefault(require("./RcTable.js")),
  columnModule = interopDefault(require("./nullFunction.js")),
  columnGroupModule = interopDefault(require("./TableColumnGroup.js")),
  tableUtils = require("./rcTableUtils.js");

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.Column = columnModule.default;
exports.ColumnGroup = columnGroupModule.default;
exports.INTERNAL_COL_DEFINE = tableUtils.INTERNAL_COL_DEFINE;
exports.default = tableModule.default;

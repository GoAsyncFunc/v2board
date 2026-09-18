let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
require("./54326f53.js");
var r = require("./57394854.js"),
  i = require("./reactRuntime.js"),
  o = interopDefault(i);
class a extends o.a.Component {
  render() {
    return o.a.createElement(r["a"], {
      spinning: this.props.loading,
      indicator: o.a.createElement("div", {
        className: "spinner-grow text-primary"
      })
    }, this.props.children);
  }
}

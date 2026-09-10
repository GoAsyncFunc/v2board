let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("../iconStyles.js");
var r = require("../Icon.js"),
  o = require("./71317449.js"),
  i = interopDefault(o);
class a extends i.a.Component {
  render() {
    return i.a.createElement("div", {
      className: this.props.className
    }, i.a.createElement(r["a"], {
      type: "loading"
    }));
  }
}
legacyExports["a"] = a;

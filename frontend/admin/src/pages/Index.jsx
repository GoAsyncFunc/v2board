let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports), defineExport(legacyExports, "default", function () {
  return s;
});
var r = require("../vendor/modules/71317449.js"),
  i = interopDefault(r),
  o = require("../vendor/routerHistory.js"),
  a = interopDefault(o);
class s extends i.a.Component {
  componentDidMount() {
    a.a.push("/login");
  }
  render() {
    return <div></div>;
  }
}

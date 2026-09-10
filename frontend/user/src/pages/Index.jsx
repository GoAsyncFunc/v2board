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
  o = interopDefault(r),
  i = (require("../layouts/MainLayout.jsx"), require("../vendor/routerHistory.js")),
  a = interopDefault(i);
class s extends o.a.Component {
  componentDidMount() {
    window.settings.homepage || a.a.push("/login");
  }
  decode(e) {
    var t = window.atob(e);
    return decodeURI(t);
  }
  render() {
    return window.settings.homepage ? <div dangerouslySetInnerHTML={{
      __html: this.decode(window.settings.homepage)
    }}></div> : <div style={{
      textAlign: "center",
      paddingTop: 50
    }}>
                <a href={"https://github.com/wyx2685/v2board"}>{"v2board"}</a>
                {" is best."}
            </div>;
  }
}

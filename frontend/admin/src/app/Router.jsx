let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("./moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "routes", function () {
  return u;
}), defineExport(legacyExports, "default", function () {
  return f;
});
var r = require("../vendor/modules/71317449.js"),
  i = interopDefault(r),
  o = require("../vendor/modules/43727734.js"),
  a = interopDefault(o),
  s = require("./history.js"),
  l = require("../vendor/dva.js"),
  c = l["c"].ConnectedRouter,
  u = require("./routes.js").default;
window.g_routes = u;
var h = require("../vendor/modules/50737a47.js");
h.applyForEach("patchRoutes", {
  initialValue: u
});
class f extends i.a.Component {
  unListen() {}
  constructor(e) {
    function t(e, t) {
      h.applyForEach("onRouteChange", {
        initialValue: {
          routes: u,
          location: e,
          action: t
        }
      });
    }
    super(e), this.unListen = s["default"].listen(t);
    var n = s["default"].listen.toString().indexOf("callback(history.location, history.action)") > -1;
    n || t(s["default"].location);
  }
  componentWillUnmount() {
    this.unListen();
  }
  render() {
    var e = this.props || {};
    return i.a.createElement(c, {
      history: s["default"]
    }, a()(u, e));
  }
}

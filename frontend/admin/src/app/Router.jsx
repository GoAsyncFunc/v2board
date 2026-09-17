let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("./moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "routes", function () {
  return appRoutes;
}), defineExport(legacyExports, "default", function () {
  return Router;
});
var reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  routeRendererModule = require("../vendor/modules/43727734.js"),
  routeRenderer = interopDefault(routeRendererModule),
  history = require("./history.js"),
  dva = require("../vendor/dva.js"),
  ConnectedRouter = dva["c"].ConnectedRouter,
  appRoutes = require("./routes.js").default;
window.g_routes = appRoutes;
var plugin = require("../vendor/modules/50737a47.js");
plugin.applyForEach("patchRoutes", {
  initialValue: appRoutes
});
class Router extends ReactComponent.a.Component {
  unListen() {}
  constructor(props) {
    function onRouteChange(location, action) {
      plugin.applyForEach("onRouteChange", {
        initialValue: {
          routes: appRoutes,
          location,
          action
        }
      });
    }
    super(props), this.unListen = history["default"].listen(onRouteChange);
    var supportsInitialCallback = history["default"].listen.toString().indexOf("callback(history.location, history.action)") > -1;
    supportsInitialCallback || onRouteChange(history["default"].location);
  }
  componentWillUnmount() {
    this.unListen();
  }
  render() {
    var props = this.props || {};
    return ReactComponent.a.createElement(ConnectedRouter, {
      history: history["default"]
    }, routeRenderer()(appRoutes, props));
  }
}

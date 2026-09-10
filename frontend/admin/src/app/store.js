let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("./moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "_onCreate", function () {
  return h;
}), defineExport(legacyExports, "getApp", function () {
  return f;
}), defineExport(legacyExports, "_DvaContainer", function () {
  return d;
});
var r = require("../vendor/modules/70307045.js"),
  i = interopDefault(r),
  o = require("../vendor/dva.js"),
  a = require("../vendor/modules/71317449.js"),
  s = require("../vendor/modules/30576135.js"),
  l = interopDefault(s),
  c = require("./history.js"),
  u = null;
function h() {
  var e = require("../vendor/modules/50737a47.js"),
    t = e.mergeConfig("dva");
  return u = Object(o["a"])(i()({
    history: c["default"]
  }, t.config || {}, window.g_useSSR ? {
    initialState: window.g_initialData
  } : {})), u.use(l()()), (t.plugins || []).forEach(e => {
    u.use(e);
  }), u.model(i()({
    namespace: "auth"
  }, require("../models/auth.js").default)), u.model(i()({
    namespace: "config"
  }, require("../models/config.js").default)), u.model(i()({
    namespace: "coupon"
  }, require("../models/coupon.js").default)), u.model(i()({
    namespace: "giftcard"
  }, require("../models/giftcard.js").default)), u.model(i()({
    namespace: "knowledge"
  }, require("../models/knowledge.js").default)), u.model(i()({
    namespace: "layout"
  }, require("../models/layout.js").default)), u.model(i()({
    namespace: "notice"
  }, require("../models/notice.js").default)), u.model(i()({
    namespace: "order"
  }, require("../models/order.js").default)), u.model(i()({
    namespace: "passport"
  }, require("../models/passport.js").default)), u.model(i()({
    namespace: "payment"
  }, require("../models/payment.js").default)), u.model(i()({
    namespace: "plan"
  }, require("../models/plan.js").default)), u.model(i()({
    namespace: "serverGroup"
  }, require("../models/serverGroup.js").default)), u.model(i()({
    namespace: "serverHysteria"
  }, require("../models/serverHysteria.js").default)), u.model(i()({
    namespace: "serverTuic"
  }, require("../models/serverTuic.js").default)), u.model(i()({
    namespace: "serverManage"
  }, require("../models/serverManage.js").default)), u.model(i()({
    namespace: "serverRoute"
  }, require("../models/serverRoute.js").default)), u.model(i()({
    namespace: "serverShadowsocks"
  }, require("../models/serverShadowsocks.js").default)), u.model(i()({
    namespace: "serverTrojan"
  }, require("../models/serverTrojan.js").default)), u.model(i()({
    namespace: "serverVless"
  }, require("../models/serverVless.js").default)), u.model(i()({
    namespace: "serverVmess"
  }, require("../models/serverVmess.js").default)), u.model(i()({
    namespace: "serverAnyTLS"
  }, require("../models/serverAnyTLS.js").default)), u.model(i()({
    namespace: "serverV2node"
  }, require("../models/serverV2node.js").default)), u.model(i()({
    namespace: "stat"
  }, require("../models/stat.js").default)), u.model(i()({
    namespace: "system"
  }, require("../models/system.js").default)), u.model(i()({
    namespace: "theme"
  }, require("../models/theme.js").default)), u.model(i()({
    namespace: "ticket"
  }, require("../models/ticket.js").default)), u.model(i()({
    namespace: "user"
  }, require("../models/user.js").default)), u;
}
function f() {
  return u;
}
class d extends a["Component"] {
  render() {
    var e = f();
    return e.router(() => this.props.children), e.start()();
  }
}

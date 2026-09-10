let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("./moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "_onCreate", function () {
  return f;
}), defineExport(legacyExports, "getApp", function () {
  return p;
}), defineExport(legacyExports, "_DvaContainer", function () {
  return d;
});
var r = require("../vendor/modules/70307045.js"),
  o = interopDefault(r),
  i = require("../vendor/dva.js"),
  a = require("../vendor/modules/71317449.js"),
  s = require("../vendor/modules/30576135.js"),
  c = interopDefault(s),
  u = require("./history.js"),
  l = null;
function f() {
  var e = require("../vendor/modules/50737a47.js"),
    t = e.mergeConfig("dva");
  return l = Object(i["a"])(o()({
    history: u["default"]
  }, t.config || {}, window.g_useSSR ? {
    initialState: window.g_initialData
  } : {})), l.use(c()()), (t.plugins || []).forEach(e => {
    l.use(e);
  }), l.model(o()({
    namespace: "comm"
  }, require("../models/comm.js").default)), l.model(o()({
    namespace: "coupon"
  }, require("../models/coupon.js").default)), l.model(o()({
    namespace: "guest"
  }, require("../models/guest.js").default)), l.model(o()({
    namespace: "invite"
  }, require("../models/invite.js").default)), l.model(o()({
    namespace: "knowledge"
  }, require("../models/knowledge.js").default)), l.model(o()({
    namespace: "layout"
  }, require("../models/layout.js").default)), l.model(o()({
    namespace: "notice"
  }, require("../models/notice.js").default)), l.model(o()({
    namespace: "order"
  }, require("../models/order.js").default)), l.model(o()({
    namespace: "passport"
  }, require("../models/passport.js").default)), l.model(o()({
    namespace: "plan"
  }, require("../models/plan.js").default)), l.model(o()({
    namespace: "server"
  }, require("../models/server.js").default)), l.model(o()({
    namespace: "stat"
  }, require("../models/stat.js").default)), l.model(o()({
    namespace: "telegram"
  }, require("../models/telegram.js").default)), l.model(o()({
    namespace: "ticket"
  }, require("../models/ticket.js").default)), l.model(o()({
    namespace: "tutorial"
  }, require("../models/tutorial.js").default)), l.model(o()({
    namespace: "user"
  }, require("../models/user.js").default)), l;
}
function p() {
  return l;
}
class d extends a["Component"] {
  render() {
    var e = p();
    return e.router(() => this.props.children), e.start()();
  }
}

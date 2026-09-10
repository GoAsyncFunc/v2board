let legacyModule = module,
  legacyExports = exports;
var r = require("./62597459.js"),
  i = require("./4c63584c.js"),
  o = require("./69526a57.js"),
  a = require("./596c3763.js"),
  s = require("./344e4f34.js"),
  l = require("./66577761.js"),
  u = require("./6e37796e.js"),
  c = require("./7a4d3351.js"),
  f = require("./49776253.js"),
  d = s["m"](),
  h = Object(c["a"])(),
  p = function () {
    function e() {
      this.group = new i["a"](), this.uid = o["c"]("viewChart"), this.renderTask = Object(u["a"])({
        plan: v,
        reset: y
      }), this.renderTask.context = {
        view: this
      };
    }
    return e.prototype.init = function (e, t) {}, e.prototype.render = function (e, t, n, r) {
      0;
    }, e.prototype.highlight = function (e, t, n, r) {
      var i = e.getData(r && r.dataType);
      i && m(i, r, "emphasis");
    }, e.prototype.downplay = function (e, t, n, r) {
      var i = e.getData(r && r.dataType);
      i && m(i, r, "normal");
    }, e.prototype.remove = function (e, t) {
      this.group.removeAll();
    }, e.prototype.dispose = function (e, t) {}, e.prototype.updateView = function (e, t, n, r) {
      this.render(e, t, n, r);
    }, e.prototype.updateLayout = function (e, t, n, r) {
      this.render(e, t, n, r);
    }, e.prototype.updateVisual = function (e, t, n, r) {
      this.render(e, t, n, r);
    }, e.prototype.eachRendered = function (e) {
      Object(f["traverseElements"])(this.group, e);
    }, e.markUpdateMethod = function (e, t) {
      d(e).updateMethod = t;
    }, e.protoInitialize = function () {
      var t = e.prototype;
      t.type = "chart";
    }(), e;
  }();
function g(e, t, n) {
  e && Object(l["v"])(e) && ("emphasis" === t ? l["o"] : l["z"])(e, n);
}
function m(e, t, n) {
  var i = s["s"](e, t),
    o = t && null != t.highlightKey ? Object(l["s"])(t.highlightKey) : null;
  null != i ? Object(r["j"])(s["p"](i), function (t) {
    g(e.getItemGraphicEl(t), n, o);
  }) : e.eachItemGraphicEl(function (e) {
    g(e, n, o);
  });
}
function v(e) {
  return h(e.model);
}
function y(e) {
  var t = e.model,
    n = e.ecModel,
    r = e.api,
    i = e.payload,
    o = t.pipelineContext.progressiveRender,
    a = e.view,
    s = i && d(i).updateMethod,
    l = o ? "incrementalPrepareRender" : s && a[s] ? s : "render";
  return "render" !== l && a[l](t, n, r, i), b[l];
}
a["b"](p, ["dispose"]), a["c"](p);
var b = {
  incrementalPrepareRender: {
    progress: function (e, t) {
      t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
    }
  },
  render: {
    forceFirstProgress: !0,
    progress: function (e, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    }
  }
};
legacyExports["a"] = p;

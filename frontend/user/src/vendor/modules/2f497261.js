let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return g;
});
require("./62627350.js");
var r = require("./2f774774.js"),
  o = (require("./32717463.js"), require("../Modal.js")),
  i = (require("./2b4c3642.js"), require("./322f5270.js")),
  a = (require("./6d69595a.js"), require("./74737172.js")),
  s = require("./71317449.js"),
  c = interopDefault(s),
  u = require("../siteHelpers.js"),
  l = require("./2b515243.js"),
  f = interopDefault(l),
  p = require("../i18n.js"),
  d = require("./44314466.js"),
  h = interopDefault(d),
  m = require("./32746750.js"),
  v = interopDefault(m),
  y = require("./4172412b.js");
class g extends c.a.Component {
  constructor(e) {
    super(e), this.state = {};
  }
  renderSubscribeBox() {
    var e = this.props.subscribeUrl,
      t = [];
    return t.push({
      title: "Hiddify",
      href: "hiddify://import/" + e + "&flag=sing" + "#" + window.settings.title
    }), t.push({
      title: "Sing-box",
      href: "sing-box://import-remote-profile?url=" + encodeURIComponent(e) + "#" + window.settings.title
    }), (Object(u["i"])() || Object(u["j"])()) && (t.push({
      title: "Shadowrocket",
      href: "shadowrocket://add/sub://" + window.btoa(e + "&flag=shadowrocket").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") + "?remark=" + window.settings.title
    }), t.push({
      title: "QuantumultX",
      href: "quantumult-x:///update-configuration?remote-resource=" + encodeURI(JSON.stringify({
        server_remote: [e + ", tag=" + window.settings.title]
      }))
    }), t.push({
      title: "Surge",
      href: "surge:///install-config?url=" + encodeURIComponent(e) + "&name=" + window.settings.title
    }), t.push({
      title: "Stash",
      href: "stash://install-config?url=" + encodeURIComponent(e) + "&name=" + window.settings.title
    })), Object(u["k"])() && t.push({
      title: "ClashX",
      href: "clash://install-config?url=" + encodeURIComponent(e) + "&name=" + window.settings.title
    }), Object(u["n"])() && t.push({
      title: "ClashMeta",
      href: "clash://install-config?url=" + encodeURIComponent(e + "&flag=meta") + "&name=" + window.settings.title
    }), Object(u["g"])() && (t.push({
      title: "NekoBox For Android",
      href: "clash://install-config?url=" + encodeURIComponent(e + "&flag=meta") + "&name=" + window.settings.title
    }) && t.push({
      title: "ClashMeta For Android",
      href: "clash://install-config?url=" + encodeURIComponent(e + "&flag=meta") + "&name=" + window.settings.title
    }), t.push({
      title: "Surfboard",
      href: "surge:///install-config?url=" + encodeURIComponent(e) + "&name=" + window.settings.title
    })), c.a.createElement("div", {
      className: v.a.oneClickSubscribe,
      ref: "subscribeBox"
    }, c.a.createElement("div", {
      key: "1",
      className: "".concat(v.a.item, " subsrcibe-for-link"),
      onClick: () => {
        f()(this.props.subscribeUrl), a["a"].success(Object(p["formatMessage"])({
          id: "\u590d\u5236\u6210\u529f"
        }));
      }
    }, c.a.createElement("div", null, c.a.createElement("i", {
      className: "fa fa-copy mr-2"
    })), c.a.createElement("div", null, Object(p["formatMessage"])({
      id: "\u590d\u5236\u8ba2\u9605\u5730\u5740"
    }))), c.a.createElement("div", {
      key: "2",
      className: "".concat(v.a.item, " subscribe-for-qrcode"),
      onClick: () => this.setState({
        showQrSubscribe: !0
      })
    }, c.a.createElement("div", null, c.a.createElement("i", {
      className: "fa fa-qrcode mr-2"
    })), c.a.createElement("div", null, Object(p["formatMessage"])({
      id: "\u626b\u63cf\u4e8c\u7ef4\u7801\u8ba2\u9605"
    }))), t.map(e => {
      var t;
      return c.a.createElement("div", {
        className: "".concat(v.a.item, " ").concat(e.title.replace(" ", "-").toLowerCase()),
        key: Math.random(),
        onClick: () => {
          window.location.href = e.href;
        }
      }, c.a.createElement("div", null, c.a.createElement("img", {
        src: "".concat((null === (t = window.settings) || void 0 === t ? void 0 : t.assets_path) || "", "/./images/icon/").concat(e.title, ".png")
      })), c.a.createElement("div", null, Object(p["formatMessage"])({
        id: "\u5bfc\u5165\u5230"
      }), " ", e.title));
    }), c.a.createElement("div", {
      style: {
        padding: 10
      }
    }, c.a.createElement(i["a"], {
      size: "large",
      onClick: () => y["router"].push("/knowledge"),
      block: !0,
      type: "primary"
    }, Object(p["formatMessage"])({
      id: "\u4e0d\u4f1a\u4f7f\u7528\uff0c\u67e5\u770b\u4f7f\u7528\u6559\u7a0b"
    }))));
  }
  render() {
    var e;
    return c.a.createElement(c.a.Fragment, null, c.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        showSubscribe: !0
      }, () => setTimeout(() => this.forceUpdate(), 100))
    }), c.a.createElement(o["a"], {
      closable: !1,
      centered: !0,
      width: 300,
      visible: this.state.showQrSubscribe,
      footer: !1,
      style: {
        textAlign: "center"
      },
      onCancel: () => this.setState({
        showQrSubscribe: !1
      }),
      zIndex: 2e3
    }, c.a.createElement(h.a, {
      value: this.props.subscribeUrl,
      renderAs: "canvas"
    }), c.a.createElement("div", {
      style: {
        marginTop: 10
      }
    }, Object(p["formatMessage"])({
      id: "\u4f7f\u7528\u652f\u6301\u626b\u7801\u7684\u5ba2\u6237\u7aef\u8fdb\u884c\u8ba2\u9605"
    }))), Object(u["l"])() ? c.a.createElement(r["a"], {
      placement: "bottom",
      closable: !1,
      visible: this.state.showSubscribe,
      footer: !1,
      width: 300,
      height: null === (e = this.refs.subscribeBox) || void 0 === e ? void 0 : e.offsetHeight,
      onClose: () => this.setState({
        showSubscribe: !1
      }),
      bodyStyle: {
        padding: 0
      }
    }, this.renderSubscribeBox()) : c.a.createElement(o["a"], {
      visible: this.state.showSubscribe,
      closable: !1,
      footer: !1,
      width: 300,
      onCancel: () => this.setState({
        showSubscribe: !1
      }),
      bodyStyle: {
        padding: 0
      },
      centered: !0
    }, this.renderSubscribeBox()));
  }
}

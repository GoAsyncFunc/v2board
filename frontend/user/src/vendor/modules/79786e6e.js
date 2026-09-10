let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  o = (require("../iconStyles.js"), require("../Icon.js")),
  i = require("./71317449.js"),
  a = interopDefault(i),
  s = require("../reactRedux.js"),
  c = require("./2b515243.js"),
  u = interopDefault(c),
  l = require("../i18n.js");
class f extends a.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  show() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible && this.props.dispatch({
        type: "telegram/getBotInfo"
      });
    });
  }
  render() {
    var e = this.props.telegram.botInfo,
      t = this.props.user.subscribe;
    return a.a.createElement(a.a.Fragment, null, a.a.cloneElement(this.props.children, {
      onClick: () => {
        this.show();
      }
    }), a.a.createElement(r["a"], {
      okText: Object(l["formatMessage"])({
        id: "\u6211\u77e5\u9053\u4e86"
      }),
      cancelButtonProps: {
        hidden: !0
      },
      title: Object(l["formatMessage"])({
        id: "\u7ed1\u5b9aTelegram"
      }),
      visible: this.state.visible,
      onOk: () => this.show(),
      onCancel: () => this.show()
    }, e.username ? a.a.createElement(a.a.Fragment, null, a.a.createElement("h2", {
      className: "content-heading pt-1"
    }, a.a.createElement("i", {
      className: "fa fa-arrow-right text-info mr-1"
    }), " ", Object(l["formatMessage"])({
      id: "\u7b2c\u4e00\u6b65"
    })), a.a.createElement("div", null, Object(l["formatMessage"])({
      id: "\u6253\u5f00Telegram\u641c\u7d22"
    }), a.a.createElement("a", {
      href: "https://t.me/".concat(e.username)
    }, "@", e.username)), a.a.createElement("h2", {
      className: "content-heading"
    }, a.a.createElement("i", {
      className: "fa fa-arrow-right text-info mr-1"
    }), " ", Object(l["formatMessage"])({
      id: "\u7b2c\u4e8c\u6b65"
    })), a.a.createElement("div", null, Object(l["formatMessage"])({
      id: "\u5411\u673a\u5668\u4eba\u53d1\u9001\u4f60\u7684"
    }), a.a.createElement("br", null), a.a.createElement("code", {
      onClick: () => u()("/bind " + t.subscribe_url)
    }, "/bind ", t.subscribe_url))) : a.a.createElement(o["a"], {
      type: "loading",
      style: {
        fontSize: 16
      }
    })));
  }
}
legacyExports["a"] = Object(s["c"])(e => {
  var t = e.telegram,
    n = e.user;
  return {
    telegram: t,
    user: n
  };
})(f);

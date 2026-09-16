const {
  formatDate
} = require('../components/DateTimeDisplay.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  a = require("../vendor/modules/71317449.js"),
  s = interopDefault(a),
  c = require("../layouts/MainLayout.jsx"),
  u = require("../vendor/reactRedux.js"),
  l = require("../vendor/i18n.js"),
  f = require("../vendor/modules/77642f52.js"),
  p = interopDefault(f),
  d = (require("../vendor/modules/62627350.js"), require("../vendor/modules/2f774774.js")),
  h = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  m = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  v = require("../vendor/modules/314d3348.js"),
  y = interopDefault(v),
  g = require("../vendor/siteHelpers.js"),
  b = new y.a({
    html: !0,
    linkify: !0,
    typographer: !0
  });
class w extends s.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  componentDidMount() {
    this.props.autoOpen && this.show();
  }
  getKnowledge(e) {
    this.props.dispatch({
      type: "knowledge/fetchById",
      id: e,
      language: Object(l["getLocale"])()
    });
  }
  show() {
    this.getKnowledge(this.props.id), this.setState({
      visible: !0
    }), window.copy = e => {
      Object(g["a"])(e), m["a"].success(Object(l["formatMessage"])({
        id: "复制成功"
      }));
    }, window.jump = e => {
      this.getKnowledge(e);
    };
  }
  hide() {
    this.props.dispatch({
      type: "knowledge/setState",
      payload: {
        knowledge: {}
      }
    }), this.setState({
      visible: !1
    }), window.copy = void 0, window.jump = void 0;
  }
  render() {
    var e = this.state.visible,
      t = this.props.knowledge,
      n = t.knowledge,
      r = t.fetchByIdLoading;
    return s.a.createElement(s.a.Fragment, null, s.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), s.a.createElement(d["a"], {
      visible: e,
      title: n.title || "Loading...",
      width: "80%",
      onClose: this.hide.bind(this)
    }, r ? s.a.createElement(h["a"], {
      type: "loading"
    }) : <div className={"custom-html-style"} dangerouslySetInnerHTML={{
      __html: b.render(n.body || "")
    }}></div>));
  }
}
var x = Object(u["c"])(e => {
  var t = e.knowledge;
  return {
    knowledge: t
  };
})(w);
class O extends s.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "knowledge/fetch",
      language: Object(l["getLocale"])()
    }), this.inputDelayTimer = void 0;
  }
  onSearch(e) {
    this.inputDelayTimer && clearTimeout(this.inputDelayTimer), this.inputDelayTimer = setTimeout(function () {
      this.inputDelayTimer = void 0, this.props.dispatch({
        type: "knowledge/fetch",
        language: Object(l["getLocale"])(),
        keyword: e || void 0
      });
    }.bind(this), 300);
  }
  render() {
    var e = this.props.knowledge,
      t = e.knowledges,
      n = e.fetchLoading,
      r = this.props.location.query.id;
    return s.a.createElement(c["a"], o()({}, this.props, {
      title: Object(l["formatMessage"])({
        id: "使用文档"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"v2board-knowledge-search-bar"}>
                        {s.a.createElement(i["a"].Search, {
            onChange: e => {
              this.onSearch(e.target.value);
            },
            className: "mb-3",
            size: "large",
            enterButton: !0,
            placeholder: Object(l["formatMessage"])({
              id: "搜索文档"
            })
          })}
                    </div>
                    {n ? <div className={"spinner-grow text-primary"} role={"status"}>
                            <span className={"sr-only"}>{"Loading..."}</span>
                        </div> : Object.keys(t).map(e => {
          return <div className={"row mb-3 mb-md-0"}>
                                    <div className={"col-md-12"}>
                                        <div className={"block block-rounded "}>
                                            <div className={"block-header block-header-default"}>
                                                <h3 className={"block-title"}>
                                                    {e}
                                                </h3>
                                            </div>
                                            <div className={"list-group"}>
                                                {t[e] && t[e].map(e => {
                    return s.a.createElement(x, {
                      autoOpen: parseInt(r) === parseInt(e.id),
                      id: e.id
                    }, <a className={"list-group-item list-group-item-action"} style={{
                      borderRadius: "unset",
                      border: "unset",
                      borderBottom: "1px solid #e2e8f2"
                    }}>
                                                                <h5 className={"font-size-base mb-1"}>
                                                                    {e.title}
                                                                </h5>
                                                                <small>
                                                                    {Object(l["formatMessage"])({
                          id: "最后更新: {date}"
                        }, {
                          date: formatDate(e.updated_at)
                        })}
                                                                </small>
                                                            </a>);
                  })}
                                            </div>
                                        </div>
                                    </div>
                                </div>;
        })}
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(u["c"])(e => {
  var t = e.knowledge;
  return {
    knowledge: t
  };
})(O);

let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  a = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  s = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  l = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  c = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  h = require("../vendor/modules/71317449.js"),
  f = interopDefault(h),
  d = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/modules/77642f52.js"),
  m = interopDefault(p),
  g = require("../vendor/reactRedux.js"),
  v = require("../vendor/modules/71716f75.js"),
  y = (require("../vendor/modules/62627350.js"), require("../vendor/modules/2f774774.js")),
  b = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  w = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  x = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  _ = require("../vendor/modules/5642306f.js"),
  E = interopDefault(_),
  S = require("../vendor/modules/314d3348.js"),
  k = interopDefault(S),
  C = (require("../vendor/modules/69386f52.js"), require("../vendor/modules/7449346c.js"));
function O(e) {
  if ("function" !== typeof WeakMap) return null;
  var t = new WeakMap(),
    n = new WeakMap();
  return (O = function (e) {
    return e ? n : t;
  })(e);
}
function T(e, t) {
  if (!t && e && e.__esModule) return e;
  if (null === e || "object" !== typeof e && "function" !== typeof e) return {
    default: e
  };
  var n = O(t);
  if (n && n.has(e)) return n.get(e);
  var r = {},
    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var o in e) if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
    var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
    a && (a.get || a.set) ? Object.defineProperty(r, o, a) : r[o] = e[o];
  }
  return r.default = e, n && n.set(e, r), r;
}
var L = E()({
    loader: () => Promise.resolve().then(() => T(require("../vendor/modules/5a4d3043.js")))
  }),
  A = new k.a({
    html: !0,
    linkify: !0,
    typographer: !0
  });
class P extends f.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      selectedTab: !1
    };
  }
  componentDidMount() {}
  formChange(e, t) {
    var n = this.props.knowledge.knowledge;
    n[e] = t, this.props.dispatch({
      type: "knowledge/setState",
      payload: {
        knowledge: n
      }
    });
  }
  show() {
    this.props.id && this.props.dispatch({
      type: "knowledge/fetchById",
      id: this.props.id
    }), this.setState({
      visible: !0
    }), this.key = Math.random();
  }
  hide() {
    this.props.dispatch({
      type: "knowledge/setState",
      payload: {
        knowledge: {}
      }
    }), this.setState({
      visible: !1
    });
  }
  save() {
    this.props.dispatch({
      type: "knowledge/save",
      callback: () => {
        x["a"].success("保存成功");
      }
    });
  }
  render() {
    var e = this.state.visible,
      t = this.props.knowledge,
      n = t.knowledge,
      r = (t.categorys, t.fetchByIdLoading),
      i = t.saveLoading,
      o = this.props.id;
    return f.a.createElement(f.a.Fragment, null, f.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), f.a.createElement(y["a"], {
      width: "80%",
      visible: e,
      title: o ? "编辑知识" : "新增知识",
      id: "knowledge",
      onClose: () => this.hide()
    }, r ? f.a.createElement(u["a"], {
      type: "loading"
    }) : <div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"标题"}
                            </label>
                            {f.a.createElement(w["a"], {
          placeholder: "请输入知识标题",
          value: n.title,
          onChange: e => this.formChange("title", e.target.value)
        })}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"分类"}
                            </label>
                            {f.a.createElement(w["a"], {
          placeholder: "请输入分类，分类将会自动归集",
          value: n.category,
          onChange: e => this.formChange("category", e.target.value)
        })}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"语言"}
                            </label>
                            {f.a.createElement(b["a"], {
          placeholder: "请选择知识语言",
          defaultValue: n.language || 1,
          style: {
            width: "100%"
          },
          value: n.language,
          onChange: e => this.formChange("language", e)
        }, Object.keys(C["a"].i18nText).sort().map(e => {
          return f.a.createElement(b["a"].Option, {
            value: e
          }, C["a"].i18nText[e]);
        }))}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"内容"}
                            </label>
                            <L key={this.key} style={{
          height: "500px"
        }} renderHTML={e => A.render(e)} value={n.body} onChange={e => this.formChange("body", e.text)} config={{
          view: {
            menu: !0,
            md: !0,
            fullScreen: !0,
            hideMenu: !0
          }
        }}></L>
                        </div>
                    </div>, <div className={"v2board-drawer-action"}>
                    {f.a.createElement(a["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.hide()
      }, "取消")}
                    {f.a.createElement(a["a"], {
        loading: i,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
var j = Object(g["c"])(e => {
    var t = e.knowledge;
    return {
      knowledge: t
    };
  })(P),
  M = require("../vendor/modules/76333265.js");
class R extends f.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {
        steps: []
      }
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "knowledge/fetch"
    }), this.props.dispatch({
      type: "knowledge/getCategory"
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible || this.setState({
        submit: {
          steps: []
        }
      });
    });
  }
  show(e) {
    this.props.dispatch({
      type: "knowledge/show",
      id: e
    });
  }
  drop(e) {
    this.props.dispatch({
      type: "knowledge/drop",
      id: e.id
    });
  }
  render() {
    var e = this.props.knowledge,
      t = e.knowledges,
      n = e.fetchLoading,
      r = (e.categorys, [{
        title: "排序",
        dataIndex: "sort",
        key: "sort",
        render: e => {
          return f.a.createElement(f.a.Fragment, null, f.a.createElement(u["a"], {
            type: "menu",
            style: {
              cursor: "move"
            }
          }));
        }
      }, {
        title: "文章ID",
        dataIndex: "id",
        key: "id"
      }, {
        title: "显示",
        dataIndex: "show",
        key: "show",
        render: (e, t) => {
          return f.a.createElement(c["a"], {
            size: "small",
            onChange: () => this.show(t.id),
            checked: e
          });
        }
      }, {
        title: "标题",
        dataIndex: "title",
        key: "title"
      }, {
        title: "分类",
        dataIndex: "category",
        key: "category"
      }, {
        title: "更新时间",
        dataIndex: "updated_at",
        key: "updated_at",
        align: "right",
        render: e => {
          return m()(1e3 * e).format("YYYY/MM/DD HH:mm");
        }
      }, {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t, n) => {
          return f.a.createElement(f.a.Fragment, null, f.a.createElement(j, {
            id: t.id
          }, <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                    </a>), f.a.createElement(l["a"], {
            type: "vertical"
          }), <a href={"javascript:void(0);"} onClick={() => {
            s["a"].confirm({
              title: "警告",
              content: "确定要删除该条项目吗？",
              onOk: () => this.drop(t),
              okText: "确定",
              cancelText: "取消"
            });
          }}>
                                    {"删除"}
                                </a>);
        }
      }]),
      h = this;
    return f.a.createElement(d["a"], i()({}, this.props, {
      title: "知识库管理"
    }), f.a.createElement(M["a"], {
      loading: n
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {f.a.createElement(j, null, f.a.createElement(a["a"], null, f.a.createElement(u["a"], {
            type: "plus"
          }), "新增"))}
                        </div>
                        {f.a.createElement(v["a"], {
          onDragEnd: (e, t) => {
            h.props.dispatch({
              type: "knowledge/sort",
              fromIndex: e,
              toIndex: t
            });
          },
          nodeSelector: "tr",
          handleSelector: "i"
        }, f.a.createElement(o["a"], {
          tableLayout: "auto",
          dataSource: t,
          pagination: !1,
          columns: r,
          scroll: {
            x: 750
          }
        }))}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(g["c"])(e => {
  var t = e.knowledge;
  return {
    knowledge: t
  };
})(R);

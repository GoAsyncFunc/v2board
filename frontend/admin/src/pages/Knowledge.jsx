const {
  createReadonlyKnowledgeColumns
} = require('../components/KnowledgeDisplayColumns.jsx');
const readonlyColumns = createReadonlyKnowledgeColumns();
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var loadingModule = require("../vendor/modules/6a65685a.js"),
  loading = interopDefault(loadingModule),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  table = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  modal = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  checkbox = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/antdSwitch.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  mainLayout = require("../layouts/MainLayout.jsx"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  reactRedux = require("../vendor/reactRedux.js"),
  sortable = require("../vendor/modules/71716f75.js"),
  drawer = (require("../vendor/modules/62627350.js"), require("../vendor/modules/antdDrawer.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  notification = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/antdMessage.js")),
  markdownModule = require("../vendor/modules/5642306f.js"),
  markdown = interopDefault(markdownModule),
  markdownRendererModule = require("../vendor/modules/314d3348.js"),
  markdownRenderer = interopDefault(markdownRendererModule),
  locale = (require("../vendor/modules/69386f52.js"), require("../vendor/modules/7449346c.js")),
  loadingIndicator = require("../vendor/modules/76333265.js");
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
var L = markdown()({
    loader: () => Promise.resolve().then(() => T(require("../vendor/modules/5a4d3043.js")))
  }),
  A = new markdownRenderer.a({
    html: !0,
    linkify: !0,
    typographer: !0
  });
class KnowledgeEditor extends ReactComponent.a.Component {
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
        notification["a"].success("保存成功");
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
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(drawer["a"], {
      width: "80%",
      visible: e,
      title: o ? "编辑知识" : "新增知识",
      id: "knowledge",
      onClose: () => this.hide()
    }, r ? ReactComponent.a.createElement(icon["a"], {
      type: "loading"
    }) : <div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"标题"}
                            </label>
                            {ReactComponent.a.createElement(input["a"], {
          placeholder: "请输入知识标题",
          value: n.title,
          onChange: e => this.formChange("title", e.target.value)
        })}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"分类"}
                            </label>
                            {ReactComponent.a.createElement(input["a"], {
          placeholder: "请输入分类，分类将会自动归集",
          value: n.category,
          onChange: e => this.formChange("category", e.target.value)
        })}
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"example-text-input-alt"}>
                                {"语言"}
                            </label>
                            {ReactComponent.a.createElement(select["a"], {
          placeholder: "请选择知识语言",
          defaultValue: n.language || 1,
          style: {
            width: "100%"
          },
          value: n.language,
          onChange: e => this.formChange("language", e)
        }, Object.keys(locale["a"].i18nText).sort().map(e => {
          return ReactComponent.a.createElement(select["a"].Option, {
            value: e
          }, locale["a"].i18nText[e]);
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
                    {ReactComponent.a.createElement(button["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.hide()
      }, "取消")}
                    {ReactComponent.a.createElement(button["a"], {
        loading: i,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
var j = Object(reactRedux["c"])(e => {
    var t = e.knowledge;
    return {
      knowledge: t
    };
  })(KnowledgeEditor),
  M = require("../vendor/modules/76333265.js");
class KnowledgePage extends ReactComponent.a.Component {
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
          return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.createElement(icon["a"], {
            type: "menu",
            style: {
              cursor: "move"
            }
          }));
        }
      }, readonlyColumns["id"], {
        title: "显示",
        dataIndex: "show",
        key: "show",
        render: (e, t) => {
          return ReactComponent.a.createElement(checkbox["a"], {
            size: "small",
            onChange: () => this.show(t.id),
            checked: e
          });
        }
      }, readonlyColumns["title"], readonlyColumns["category"], readonlyColumns["updated_at"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t, n) => {
          return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.createElement(j, {
            id: t.id
          }, <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                    </a>), ReactComponent.a.createElement(divider["a"], {
            type: "vertical"
          }), <a href={"javascript:void(0);"} onClick={() => {
            modal["a"].confirm({
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
    return ReactComponent.a.createElement(mainLayout["a"], objectAssign()({}, this.props, {
      title: "知识库管理"
    }), ReactComponent.a.createElement(loadingIndicator["a"], {
      loading: n
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {ReactComponent.a.createElement(j, null, ReactComponent.a.createElement(button["a"], null, ReactComponent.a.createElement(icon["a"], {
            type: "plus"
          }), "新增"))}
                        </div>
                        {ReactComponent.a.createElement(sortable["a"], {
          onDragEnd: (e, t) => {
            h.props.dispatch({
              type: "knowledge/sort",
              fromIndex: e,
              toIndex: t
            });
          },
          nodeSelector: "tr",
          handleSelector: "i"
        }, ReactComponent.a.createElement(table["a"], {
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
legacyExports["default"] = Object(reactRedux["c"])(e => {
  var t = e.knowledge;
  return {
    knowledge: t
  };
})(KnowledgePage);

const {
  createReadonlyNoticeColumns
} = require('../components/NoticeDisplayColumns.jsx');
const readonlyColumns = createReadonlyNoticeColumns();
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
  o = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  a = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  s = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  l = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  c = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  h = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  f = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  d = require("../vendor/modules/70307045.js"),
  p = interopDefault(d),
  m = require("../vendor/modules/71317449.js"),
  g = interopDefault(m),
  v = require("../layouts/MainLayout.jsx"),
  y = require("../vendor/modules/77642f52.js"),
  b = interopDefault(y),
  w = require("../vendor/reactRedux.js"),
  x = require("../vendor/modules/76333265.js");
class _ extends g.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {},
      notices: []
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "notice/fetch"
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible || this.setState({
        submit: {}
      });
    });
  }
  save() {
    this.props.dispatch({
      type: "notice/save",
      params: p()({}, this.state.submit),
      callback: () => {
        this.modalVisible();
      }
    });
  }
  drop(e) {
    this.props.dispatch({
      type: "notice/drop",
      id: e.id
    });
  }
  render() {
    var e = this.props.notice,
      t = e.notices,
      n = e.fetchLoading,
      r = [readonlyColumns["id"], {
        title: "显示",
        dataIndex: "show",
        key: "show",
        render: (e, t) => {
          return g.a.createElement(f["a"], {
            size: "small",
            onChange: () => this.props.dispatch({
              type: "notice/show",
              id: t.id
            }),
            checked: e
          });
        }
      }, readonlyColumns["title"], readonlyColumns["created_at"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, n, r) => {
          return <div>
                                <a onClick={() => this.setState({
              submit: t[r]
            }, () => this.modalVisible())} href={"javascript:void(0);"}>
                                    {"编辑"}
                                </a>
                                {g.a.createElement(h["a"], {
              type: "vertical"
            })}
                                <a onClick={() => this.drop(n)} href={"javascript:void(0);"}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return g.a.createElement(v["a"], i()({}, this.props, {
      title: "公告管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, g.a.createElement(x["a"], {
      loading: n
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {g.a.createElement(c["a"], {
            onClick: () => this.modalVisible()
          }, g.a.createElement(u["a"], {
            type: "plus"
          }), " 添加公告")}
                        </div>
                        {g.a.createElement(l["a"], {
          tableLayout: "auto",
          dataSource: t,
          pagination: !1,
          columns: r,
          scroll: {
            x: 950
          }
        })}
                    </div>
                </div>), g.a.createElement(o["a"], {
      title: "".concat(this.state.submit.id ? "编辑公告" : "新建公告"),
      visible: this.state.visible,
      onCancel: () => this.modalVisible(),
      onOk: () => this.state.saveLoading || this.save(),
      okText: this.state.saveLoading ? g.a.createElement(u["a"], {
        type: "loading"
      }) : "提交",
      cancelText: "取消"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"标题"}</label>
                        {g.a.createElement(s["a"], {
          placeholder: "请输入公告标题",
          value: this.state.submit.title,
          onChange: e => {
            this.setState({
              submit: p()({}, this.state.submit, {
                title: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"公告内容"}
                        </label>
                        {g.a.createElement(s["a"].TextArea, {
          rows: 12,
          value: this.state.submit.content,
          placeholder: "请输入公告内容",
          onChange: e => {
            this.setState({
              submit: p()({}, this.state.submit, {
                content: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"example-text-input-alt"}>
                            {"公告标签"}
                        </label>
                        {g.a.createElement(a["a"], {
          mode: "tags",
          value: this.state.submit.tags || [],
          style: {
            width: "100%"
          },
          placeholder: "输入后回车添加标签",
          onChange: e => {
            this.setState({
              submit: p()({}, this.state.submit, {
                tags: e.length > 0 ? e : null
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"图片URL"}
                        </label>
                        {g.a.createElement(s["a"], {
          placeholder: "请输入图片URL",
          value: this.state.submit.img_url,
          onChange: e => {
            this.setState({
              submit: p()({}, this.state.submit, {
                img_url: e.target.value
              })
            });
          }
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(w["c"])(e => {
  var t = e.notice;
  return {
    notice: t
  };
})(_);

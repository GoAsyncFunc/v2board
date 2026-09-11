const {
  createRouteActionColumn
} = require('../components/RouteActionColumn.jsx');
const {
  createReadonlyServerRouteColumns
} = require('../components/ServerRouteDisplayColumns.jsx');
const readonlyColumns = createReadonlyServerRouteColumns();
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
  s = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  l = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  c = require("../vendor/modules/70307045.js"),
  u = interopDefault(c),
  h = require("../vendor/modules/71317449.js"),
  f = interopDefault(h),
  d = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/reactRedux.js"),
  m = (require("../vendor/modules/387a4e6a.js"), require("../vendor/modules/76333265.js")),
  g = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  v = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  y = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  b = require("../vendor/modules/7449346c.js");
class w extends f.a.Component {
  constructor(e) {
    super(e), this.state = {
      route: e.route || {},
      visible: !1
    };
  }
  save() {
    var e = u()({}, this.state.route);
    if (Array.isArray(e.match)) {
      e.match = e.match.filter(e => !!e);
    } else if (e.match && "string" === typeof e.match) {
      e.match = e.match.split(",").filter(e => !!e);
    } else {
      e.match = [];
    }
    this.props.dispatch({
      type: "serverRoute/save",
      params: e,
      callback: () => {
        this.setState({
          visible: !1
        });
      }
    });
  }
  render() {
    var e,
      t,
      n,
      r = this.props.serverRoute.fetchLoading;
    return f.a.createElement(f.a.Fragment, null, f.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), f.a.createElement(g["a"], {
      title: "".concat(this.state.route.id ? "编辑路由" : "创建路由"),
      visible: this.state.visible,
      onCancel: () => this.setState({
        visible: !1
      }),
      onOk: () => r || this.save(),
      okText: r ? f.a.createElement(s["a"], {
        type: "loading"
      }) : "提交",
      cancelText: "取消"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"备注"}</label>
                        {f.a.createElement(y["a"], {
          placeholder: "请输入备注",
          value: this.state.route.remarks,
          onChange: e => {
            this.setState({
              route: u()({}, this.state.route, {
                remarks: e.target.value
              })
            });
          }
        })}
                    </div>
                    {"default_out" != this.state.route.action && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"匹配值"}
                                <a href={"https://xtls.github.io/config/routing.html#ruleobject"}>
                                    {f.a.createElement(a["a"], {
              type: "link"
            })}
                                    {"填写参考"}
                                </a>
                            </label>
                            {f.a.createElement(y["a"].TextArea, {
          rows: 5,
          placeholder: (() => {
            const action = this.state.route.action;
            if (action === "protocol") {
              return "http\ntls\nquic\nbittorrent";
            }
            if (action === "block_port") {
              return "53\n443\n1000-2000";
            }
            if (["route_ip", "block_ip"].includes(action)) {
              return "127.0.0.1(单一匹配)\n10.0.0.0/8(范围匹配)\ngeoip:cn(预定义列表匹配)";
            }
            return "example.com(关键字匹配)\ndomain:example.com(子域名匹配)\ngeosite:netflix(预定义域名列表)";
          })(),
          value: "object" === typeof this.state.route.match ? null === (e = this.state.route.match) || void 0 === e ? void 0 : e.join("\n") : null === (t = this.state.route.match) || void 0 === t ? void 0 : null === (n = t.split(",")) || void 0 === n ? void 0 : n.join("\n"),
          onChange: e => {
            var t;
            this.setState({
              route: u()({}, this.state.route, {
                match: null === (t = e.target.value) || void 0 === t ? void 0 : t.split("\n")
              })
            });
          }
        })}
                        </div>}
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"动作"}</label>
                        <div>
                            {f.a.createElement(v["a"], {
            value: this.state.route.action,
            placeholder: "请选择动作",
            style: {
              width: "100%"
            },
            onChange: e => this.setState({
              route: u()({}, this.state.route, {
                action: e
              })
            })
          }, f.a.createElement(v["a"].Option, {
            value: "block"
          }, b["a"].routeActionText["block"]), f.a.createElement(v["a"].Option, {
            value: "block_ip"
          }, b["a"].routeActionText["block_ip"]), f.a.createElement(v["a"].Option, {
            value: "block_port"
          }, b["a"].routeActionText["block_port"]), f.a.createElement(v["a"].Option, {
            value: "protocol"
          }, b["a"].routeActionText["protocol"]), f.a.createElement(v["a"].Option, {
            value: "dns"
          }, b["a"].routeActionText["dns"]), f.a.createElement(v["a"].Option, {
            value: "route"
          }, b["a"].routeActionText["route"]), f.a.createElement(v["a"].Option, {
            value: "route_ip"
          }, b["a"].routeActionText["route_ip"]), f.a.createElement(v["a"].Option, {
            value: "default_out"
          }, b["a"].routeActionText["default_out"]))}
                        </div>
                    </div>
                    {"dns" === this.state.route.action && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"DNS服务器"}
                            </label>
                            {f.a.createElement(y["a"], {
          placeholder: "请输入用于解析的DNS服务器地址",
          value: this.state.route.action_value,
          onChange: e => {
            this.setState({
              route: u()({}, this.state.route, {
                action_value: e.target.value
              })
            });
          }
        })}
                        </div>}
                    {("route" === this.state.route.action || "route_ip" === this.state.route.action || "default_out" === this.state.route.action) && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"Xray出站配置"}
                                <a href={"https://xtls.github.io/config/outbound.html"}>
                                    {f.a.createElement(a["a"], {
              type: "link"
            })}
                                    {"填写参考"}
                                </a>
                            </label>
                            {f.a.createElement(y["a"].TextArea, {
          rows: 8,
          placeholder: JSON.stringify({
            tag: "ss_out",
            sendThrough: "0.0.0.0",
            protocol: "shadowsocks",
            settings: {
              email: "love@xray.com",
              address: "8.8.8.8",
              port: 5555,
              method: "chacha20-ietf-poly1305",
              password: "abcdefghijklmnopqrstuvwxyz",
              level: 0
            }
          }, null, 4),
          value: this.state.route.action_value,
          onChange: e => {
            this.setState({
              route: u()({}, this.state.route, {
                action_value: e.target.value
              })
            });
          }
        })}
                        </div>}
                </div>));
  }
}
var x = Object(p["c"])(e => {
  var t = e.serverRoute;
  return {
    serverRoute: t
  };
})(w);
class _ extends f.a.Component {
  constructor(e) {
    super(e), this.state = {
      route: {}
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "serverRoute/fetch"
    });
  }
  save() {
    var e = u()({}, this.state.submit);
    this.props.dispatch({
      type: "serverRoute/save",
      params: e,
      callback: () => {
        this.modalVisible();
      }
    });
  }
  drop(e) {
    this.props.dispatch({
      type: "serverRoute/drop",
      id: e
    });
  }
  render() {
    var e = this.props.serverRoute,
      t = e.routes,
      n = e.fetchLoading,
      r = [readonlyColumns["id"], readonlyColumns["remarks"], readonlyColumns["match"], createRouteActionColumn(b["a"].routeActionText), {
        title: "操作",
        dataIndex: "action2",
        key: "action2",
        align: "right",
        render: (e, t) => {
          return <div>
                                {f.a.createElement(x, {
              route: t,
              key: t.id
            }, <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                    </a>)}
                                {f.a.createElement(l["a"], {
              type: "vertical"
            })}
                                <a href={"javascript:void(0);"} onClick={() => this.drop(t.id)}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return f.a.createElement(d["a"], i()({}, this.props, {
      title: "路由管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, f.a.createElement(m["a"], {
      loading: n
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {f.a.createElement(x, null, f.a.createElement(a["a"], {
            onClick: () => this.modalVisible()
          }, f.a.createElement(s["a"], {
            type: "plus"
          }), " 添加路由"))}
                        </div>
                        {f.a.createElement(o["a"], {
          tableLayout: "auto",
          columns: r,
          dataSource: t,
          pagination: !1
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(p["c"])(e => {
  var t = e.serverRoute;
  return {
    serverRoute: t
  };
})(_);

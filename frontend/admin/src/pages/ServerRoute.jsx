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
var objectAssignModule = require("../vendor/modules/6a65685a.js"),
  objectAssign = interopDefault(objectAssignModule),
  table = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  objectAssignModule2 = require("../vendor/modules/70307045.js"),
  objectAssign2 = interopDefault(objectAssignModule2),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  MainLayout = require("../layouts/MainLayout.jsx"),
  reactRedux = require("../vendor/reactRedux.js"),
  LoadingContainer = (require("../vendor/modules/387a4e6a.js"), require("../vendor/modules/76333265.js")),
  Modal = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  Select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  Input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  settings = require("../vendor/modules/7449346c.js");
class RouteEditor extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      route: e.route || {},
      visible: !1
    };
  }
  save() {
    var e = objectAssign2()({}, this.state.route);
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
    var e, t, n,
      routeLoading = this.props.serverRoute.fetchLoading;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), ReactComponent.a.createElement(Modal["a"], {
      title: "".concat(this.state.route.id ? "编辑路由" : "创建路由"),
      visible: this.state.visible,
      onCancel: () => this.setState({
        visible: !1
      }),
      onOk: () => routeLoading || this.save(),
      okText: routeLoading ? ReactComponent.a.createElement(icon["a"], {
        type: "loading"
      }) : "提交",
      cancelText: "取消"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"备注"}</label>
                        {ReactComponent.a.createElement(Input["a"], {
          placeholder: "请输入备注",
          value: this.state.route.remarks,
          onChange: e => {
            this.setState({
              route: objectAssign2()({}, this.state.route, {
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
                                    {ReactComponent.a.createElement(button["a"], {
              type: "link"
            })}
                                    {"填写参考"}
                                </a>
                            </label>
                            {ReactComponent.a.createElement(Input["a"].TextArea, {
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
              route: objectAssign2()({}, this.state.route, {
                match: null === (t = e.target.value) || void 0 === t ? void 0 : t.split("\n")
              })
            });
          }
        })}
                        </div>}
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"动作"}</label>
                        <div>
                            {ReactComponent.a.createElement(Select["a"], {
            value: this.state.route.action,
            placeholder: "请选择动作",
            style: {
              width: "100%"
            },
            onChange: e => this.setState({
              route: objectAssign2()({}, this.state.route, {
                action: e
              })
            })
          }, ReactComponent.a.createElement(Select["a"].Option, {
            value: "block"
          }, settings["a"].routeActionText["block"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "block_ip"
          }, settings["a"].routeActionText["block_ip"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "block_port"
          }, settings["a"].routeActionText["block_port"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "protocol"
          }, settings["a"].routeActionText["protocol"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "dns"
          }, settings["a"].routeActionText["dns"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "route"
          }, settings["a"].routeActionText["route"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "route_ip"
          }, settings["a"].routeActionText["route_ip"]), ReactComponent.a.createElement(Select["a"].Option, {
            value: "default_out"
          }, settings["a"].routeActionText["default_out"]))}
                        </div>
                    </div>
                    {"dns" === this.state.route.action && <div className={"form-group"}>
                            <label for={"example-text-input-alt"}>
                                {"DNS服务器"}
                            </label>
                            {ReactComponent.a.createElement(Input["a"], {
          placeholder: "请输入用于解析的DNS服务器地址",
          value: this.state.route.action_value,
          onChange: e => {
            this.setState({
              route: objectAssign2()({}, this.state.route, {
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
                                    {ReactComponent.a.createElement(button["a"], {
              type: "link"
            })}
                                    {"填写参考"}
                                </a>
                            </label>
                            {ReactComponent.a.createElement(Input["a"].TextArea, {
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
              route: objectAssign2()({}, this.state.route, {
                action_value: e.target.value
              })
            });
          }
        })}
                        </div>}
                </div>));
  }
}
var ConnectedRouteEditor = Object(reactRedux["c"])(e => {
  var t = e.serverRoute;
  return {
    serverRoute: t
  };
})(RouteEditor);
class ServerRoutePage extends ReactComponent.a.Component {
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
    var e = objectAssign2()({}, this.state.submit);
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
    var serverRoute = this.props.serverRoute,
      routes = serverRoute.routes,
      fetchLoading = serverRoute.fetchLoading,
      columns = [readonlyColumns["id"], readonlyColumns["remarks"], readonlyColumns["match"], createRouteActionColumn(settings["a"].routeActionText), {
        title: "操作",
        dataIndex: "action2",
        key: "action2",
        align: "right",
        render: (value, record) => {
          return <div>
                                {ReactComponent.a.createElement(ConnectedRouteEditor, {
              route: record,
              key: record.id
            }, <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                    </a>)}
                                {ReactComponent.a.createElement(divider["a"], {
              type: "vertical"
            })}
                                <a href={"javascript:void(0);"} onClick={() => this.drop(record.id)}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return ReactComponent.a.createElement(MainLayout["a"], objectAssign()({}, this.props, {
      title: "路由管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, ReactComponent.a.createElement(LoadingContainer["a"], {
      loading: fetchLoading
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {ReactComponent.a.createElement(ConnectedRouteEditor, null, ReactComponent.a.createElement(button["a"], {
            onClick: () => this.modalVisible()
          }, ReactComponent.a.createElement(icon["a"], {
            type: "plus"
          }), " 添加路由"))}
                        </div>
                        {ReactComponent.a.createElement(table["a"], {
          tableLayout: "auto",
          columns,
          dataSource: routes,
          pagination: !1
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(reactRedux["c"])(e => {
  var t = e.serverRoute;
  return {
    serverRoute: t
  };
})(ServerRoutePage);

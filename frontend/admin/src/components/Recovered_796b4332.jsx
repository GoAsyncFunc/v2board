let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/62627350.js");
var drawer = require("../vendor/modules/antdDrawer.js"),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  tooltip = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  permissionGroup = (require("../vendor/modules/6c633544.js"), require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js")),
  jsonEditor = interopDefault(require("../vendor/modules/6c633544.js"));
class TrojanEditor extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        tls: 0,
        rate: 1
      },
      visible: !1,
      childDrawer: {
        visible: !1
      }
    };
  }
  onShow() {
    if (this.setState({
      visible: !this.state.visible
    }), this.state.server.network_settings && "object" === typeof this.state.server.network_settings) {
      var e = this.state.server;
      e.network_settings = JSON.stringify(e["network_settings"], null, 2), this.setState({
        server: e
      });
    }
  }
  save() {
    var e = this.state.server;
    e.network_settings = e.network_settings ? "string" === typeof e.network_settings && JSON.parse(e.network_settings) : null;
    this.props.dispatch({
      type: "serverTrojan/save",
      params: e,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: objectAssign()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  changeServer(e, t) {
    this.setState({
      server: objectAssign()({}, this.state.server, {
        [e]: t
      })
    });
  }
  renderChildDrawer() {
    var e = this.state.server,
      t = e.network_settings;
    switch (this.state.childDrawer.type) {
      case "network_settings":
        var presets = {
          tcp: "",
          ws: JSON.stringify({
            path: "/",
            headers: {
              Host: "v2ray.com"
            }
          }, null, 4),
          grpc: JSON.stringify({
            serviceName: "GunService"
          }, null, 4)
        };
        return <div id={"v2ray-protocol"}>
                        <div className={"form-group"}>
                            <label>
                                {"协议详细配置"}
                                <a href={"https://www.v2ray.com/chapter_02/05_transport.html"}>
                                    {ReactComponent.a.createElement(icon["a"], {
                  type: "link"
                })}
                                    {"参考"}
                                </a>
                            </label>
                            {ReactComponent.a.createElement(jsonEditor.a, {
              placeholder: (null === presets || void 0 === presets ? void 0 : presets[this.state.server.network]) || "",
              mode: "json",
              theme: "github",
              fontSize: 14,
              showPrintMargin: !0,
              showGutter: !0,
              highlightActiveLine: !0,
              value: t || "",
              onChange: e => this.formChange("network_settings", e),
              setOptions: {
                enableBasicAutocompletion: !1,
                enableLiveAutocompletion: !1,
                enableSnippets: !1,
                showLineNumbers: !0,
                tabSize: 2
              },
              ref: "editor"
            })}
                        </div>
                    </div>;
    }
  }
  formChange(e, t) {
    this.setState({
      server: objectAssign()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverTrojan.saveLoading,
      n = this.props.serverManage.servers,
      groups = this.props.serverGroup.groups,
      routes = this.props.serverRoute.routes;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.onShow()
    }), ReactComponent.a.createElement(drawer["a"], {
      id: "server",
      maskClosable: !0,
      title: e.id ? "编辑节点" : "新建节点",
      width: "80%",
      visible: this.state.visible,
      onClose: () => this.onShow()
    }, <div>
                    <div className={"row"}>
                        <div className={"form-group col-8"}>
                            <label>{"节点名称"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "tags",
          value: e.tags || [],
          style: {
            width: "100%"
          },
          placeholder: "输入后回车添加标签",
          onChange: e => this.formChange("tags", e.length > 0 ? e : null)
        })}
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {"权限组 "}
                            {ReactComponent.a.createElement(permissionGroup["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, groups.map(e => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {ReactComponent.a.createElement(tooltip["a"], {
              placement: "top",
              title: "使用自签名证书需要允许不安全，用户才可以连接"
            }, "允许不安全 ", ReactComponent.a.createElement(icon["a"], {
              type: "question-circle"
            }))}
                            </label>
                            {ReactComponent.a.createElement(select["a"], {
            value: parseInt(e.allow_insecure) ? 1 : 0,
            placeholder: "允许不安全",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("allow_insecure", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            key: 0,
            value: 0
          }, "否"), ReactComponent.a.createElement(select["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"服务器名称指示(sni)"}</label>
                        {ReactComponent.a.createElement(input["a"], {
          placeholder: "当节点地址与证书不一致时用于证书验证",
          value: e.server_name,
          onChange: e => this.formChange("server_name", e.target.value)
        })}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>
                                {"传输协议 "}
                                <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑协议配置", "network_settings")}>
                                    {"编辑配置"}
                                </a>
                            </label>
                            {ReactComponent.a.createElement(select["a"], {
            value: e.network,
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            value: "tcp"
          }, "TCP"), ReactComponent.a.createElement(select["a"].Option, {
            value: "ws"
          }, "WebSocket"), ReactComponent.a.createElement(select["a"].Option, {
            value: "grpc"
          }, "gRPC"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {ReactComponent.a.createElement(tooltip["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {ReactComponent.a.createElement(select["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, ReactComponent.a.createElement(select["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("trojan" === t.type && t.id !== e.id) return ReactComponent.a.createElement(select["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, routes.map(e => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {ReactComponent.a.createElement(button["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {ReactComponent.a.createElement(button["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, ReactComponent.a.createElement(drawer["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
legacyExports["a"] = Object(reactRedux["c"])(e => {
  var t = e.serverTrojan,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverTrojan: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(TrojanEditor);

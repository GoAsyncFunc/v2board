let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
require("../vendor/modules/62627350.js");
var drawer = require("../vendor/modules/antdDrawer.js"),
  button = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  tooltip = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  notification = (require("../vendor/modules/2f786b65.js"), require("../vendor/notification.js")),
  reactModule = require("../vendor/modules/reactRuntime.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  divider = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js"));
class DnsSettings extends ReactComponent.a.Component {
  constructor(e) {
    super(e), this.state = {
      settings: this.props.settings || {
        servers: [],
        hosts: {}
      }
    };
  }
  addHost() {
    this.state.settings.hosts;
  }
  addServer() {
    var e = this.state.settings.servers,
      t = {
        address: "",
        port: 53,
        domains: [],
        expectIPs: []
      };
    e.push(t), this.setState({
      settings: objectAssign()({}, this.state.settings, {
        servers: e
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  dropServer(e) {
    var t = this.state.settings.servers;
    t.splice(e, 1), this.setState({
      settings: objectAssign()({}, this.state.settings, {
        servers: t
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  changeServer(e, t, n) {
    var r = this.state.settings.servers;
    "domains" === t ? r[e].domains = n.split("\n") : r[e][t] = n, this.setState({
      settings: objectAssign()({}, this.state.settings, {
        servers: r
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  render() {
    var e = this.state.settings.servers;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, <div className={"form-group"}>
                <label>{"DNS服务器表"}</label>
                {e.map((e, t) => {
        var n;
        return <div key={t}>
                            <div className={"row"}>
                                {ReactComponent.a.createElement(divider["a"], {
              type: "horizontal"
            }, e.address || "服务器组".concat(t + 1), " ", ReactComponent.a.createElement(icon["a"], {
              type: "delete",
              style: {
                color: "#ff4d4f"
              },
              onClick: () => this.dropServer(t)
            }))}
                                <div className={"form-group col-md-9 col-xs-12"}>
                                    <label>{"DNS服务器地址"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
                placeholder: "请输入DNS服务器地址",
                value: e.address,
                onChange: e => this.changeServer(t, "address", e.target.value)
              })}
                                </div>
                                <div className={"form-group col-md-3 col-xs-12"}>
                                    <label>{"端口"}</label>
                                    {ReactComponent.a.createElement(input["a"], {
                type: "number",
                placeholder: "端口",
                value: e.port,
                onChange: e => this.changeServer(t, "port", parseInt(e.target.value))
              })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label>{"域名"}</label>
                                {ReactComponent.a.createElement(input["a"].TextArea, {
              rows: 5,
              onChange: e => this.changeServer(t, "domains", e.target.value),
              value: null === (n = e.domains) || void 0 === n ? void 0 : n.join("\n"),
              placeholder: "域名列表，此列表包含的域名，将优先使用此服务器进行查询。一行一条"
            })}
                            </div>
                        </div>;
      })}
                <div>
                    {ReactComponent.a.createElement(button["a"], {
          type: "primary",
          style: {
            width: "100%"
          },
          onClick: () => this.addServer()
        }, "添加")}
                </div>
            </div>);
  }
}
class RuleSettings extends ReactComponent.a.Component {
  constructor(e) {
    super(e);
    var t = this.props.settings;
    "{}" !== JSON.stringify(t) && t || (t = {
      domain: [],
      protocol: []
    }), this.state = {
      settings: t
    };
  }
  change(e, t) {
    var n = this.state.settings;
    t = t.split("\n"), n[e] = t, this.setState({
      settings: n
    }), this.props.onChange(n);
  }
  render() {
    var e = this.state.settings,
      t = e.domain,
      n = e.protocol;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, <div className={"form-group"}>
                <label>{"域名过滤器"}</label>
                {ReactComponent.a.createElement(input["a"].TextArea, {
        value: t && t.join("\n"),
        onChange: e => this.change("domain", e.target.value),
        rows: 5
      })}
            </div>, <div className={"form-group"}>
                <label>{"协议过滤器"}</label>
                {ReactComponent.a.createElement(input["a"].TextArea, {
        value: n && n.join("\n"),
        onChange: e => this.change("protocol", e.target.value),
        rows: 5
      })}
            </div>);
  }
}
require("../vendor/modules/426f5337.js");
var y = require("../vendor/modules/antdSwitch.js");
class TlsSettings extends ReactComponent.a.Component {
  constructor(e) {
    super(e);
    var t = this.props.settings;
    "{}" !== JSON.stringify(t) && t || (t = {
      serverName: "",
      allowInsecure: 0
    }), this.state = {
      settings: t
    };
  }
  change(e, t) {
    var n = this.state.settings;
    n[e] = t, this.setState({
      settings: n
    }), this.props.onChange(this.state.settings);
  }
  render() {
    var e = this.state.settings,
      t = e.serverName,
      n = e.allowInsecure;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, <div>
                <div className={"form-group"}>
                    <label>{"Server Name"}</label>
                    {ReactComponent.a.createElement(input["a"], {
          value: t,
          onChange: e => this.change("serverName", e.target.value),
          placeholder: "不使用请留空"
        })}
                </div>
                <div className={"form-group"}>
                    <label>{"Allow Insecure"}</label>
                    <div>
                        {ReactComponent.a.createElement(y["a"], {
            checked: parseInt(n),
            onChange: e => this.change("allowInsecure", e ? "1" : "0")
          })}
                    </div>
                </div>
            </div>);
  }
}
var w = require("../vendor/modules/6c633544.js"),
  x = interopDefault(w),
  _ = (require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js"));
class VmessEditor extends ReactComponent.a.Component {
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
    }), this.state.server.networkSettings && "object" === typeof this.state.server.networkSettings) {
      var e = this.state.server;
      e.networkSettings = JSON.stringify(e["networkSettings"], null, 2), this.setState({
        server: e
      });
    }
  }
  save() {
    try {
      var e,
        t,
        n = this.state.server;
      n.networkSettings = n.networkSettings ? "string" === typeof n.networkSettings && JSON.parse(n.networkSettings) : null, (null === (e = n.dnsSettings) || void 0 === e ? void 0 : null === (t = e.servers) || void 0 === t ? void 0 : t.length) || (n.dnsSettings = null), console.log(n), this.props.dispatch({
        type: "serverVmess/save",
        params: n,
        callback: () => {
          this.onShow();
        }
      });
    } catch (e) {
      notification["a"].error({
        message: "请求失败",
        description: "传输协议配置格式有误"
      });
    }
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
      t = e.networkSettings,
      n = e.ruleSettings,
      r = e.tlsSettings,
      i = e.dnsSettings;
    switch (this.state.childDrawer.type) {
      case "networkSettings":
        var o = {
          tcp: JSON.stringify({
            header: {
              type: "http",
              request: {
                path: ["/"],
                headers: {
                  Host: ["www.baidu.com", "www.bing.com"]
                }
              },
              response: {}
            }
          }, null, 4),
          ws: JSON.stringify({
            path: "/",
            headers: {
              Host: "v2ray.com"
            }
          }, null, 4),
          grpc: JSON.stringify({
            serviceName: "GunService"
          }, null, 4),
          kcp: JSON.stringify({
            header: {
              type: "none"
            },
            seed: ""
          }, null, 4),
          httpupgrade: JSON.stringify({
            path: "/",
            host: "xtls.github.io"
          }, null, 4),
          xhttp: JSON.stringify({
            path: "/",
            host: "xtls.github.io"
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
                            {ReactComponent.a.createElement(x.a, {
              placeholder: (null === o || void 0 === o ? void 0 : o[this.state.server.network]) || "",
              mode: "json",
              theme: "github",
              fontSize: 14,
              showPrintMargin: !0,
              showGutter: !0,
              highlightActiveLine: !0,
              value: t || "",
              onChange: e => this.formChange("networkSettings", e),
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
      case "ruleSettings":
        return ReactComponent.a.createElement(RuleSettings, {
          settings: n,
          onChange: e => this.changeServer("ruleSettings", e)
        });
      case "tlsSettings":
        return ReactComponent.a.createElement(TlsSettings, {
          settings: r,
          onChange: e => this.changeServer("tlsSettings", e)
        });
      case "dnsSettings":
        return ReactComponent.a.createElement(DnsSettings, {
          settings: i,
          onChange: e => this.changeServer("dnsSettings", e)
        });
    }
  }
  formChange(e, t) {
    this.refs.editor && this.refs.editor.editor.resize();
    var n = this.state.server;
    n[e] = t, this.setState({
      server: n
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverVmess.saveLoading,
      n = this.props.serverManage.servers,
      c = this.props.serverGroup.groups,
      u = this.props.serverRoute.routes;
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
                            {ReactComponent.a.createElement(_["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, c.map(e => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-8 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "请输入连接地址",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {"TLS "}
                                <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑TLS配置", "tlsSettings")}>
                                    {"编辑配置"}
                                </a>
                            </label>
                            {ReactComponent.a.createElement(select["a"], {
            value: parseInt(e.tls) ? 1 : 0,
            placeholder: "是否支持TLS",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("tls", e)
          }, ReactComponent.a.createElement(select["a"].Option, {
            key: 0,
            value: 0
          }, "不支持"), ReactComponent.a.createElement(select["a"].Option, {
            key: 1,
            value: 1
          }, "支持"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "非NAT同连接端口",
            value: e.server_port,
            onChange: e => this.formChange("server_port", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>
                                {"传输协议 "}
                                <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑协议配置", "networkSettings")}>
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
          }, "gRPC"), ReactComponent.a.createElement(select["a"].Option, {
            value: "kcp"
          }, "mKCP"), ReactComponent.a.createElement(select["a"].Option, {
            value: "httpupgrade"
          }, "HTTPUpgrade"), ReactComponent.a.createElement(select["a"].Option, {
            value: "xhttp"
          }, "XHTTP"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {ReactComponent.a.createElement(tooltip["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {ReactComponent.a.createElement(icon["a"], {
              type: "read"
            })}
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
          if ("vmess" === t.type && t.id !== e.id) return ReactComponent.a.createElement(select["a"].Option, {
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
        }, u.map(e => {
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
  var t = e.serverVmess,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverVmess: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(VmessEditor);

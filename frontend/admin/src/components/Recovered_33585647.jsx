let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
require("../vendor/modules/62627350.js");
var r = require("../vendor/modules/2f774774.js"),
  i = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  o = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  a = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  s = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  l = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  c = require("../vendor/modules/70307045.js"),
  u = interopDefault(c),
  h = (require("../vendor/modules/2f786b65.js"), require("../vendor/notification.js")),
  f = require("../vendor/modules/71317449.js"),
  d = interopDefault(f),
  p = require("../vendor/reactRedux.js"),
  m = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js"));
class g extends d.a.Component {
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
      settings: u()({}, this.state.settings, {
        servers: e
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  dropServer(e) {
    var t = this.state.settings.servers;
    t.splice(e, 1), this.setState({
      settings: u()({}, this.state.settings, {
        servers: t
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  changeServer(e, t, n) {
    var r = this.state.settings.servers;
    "domains" === t ? r[e].domains = n.split("\n") : r[e][t] = n, this.setState({
      settings: u()({}, this.state.settings, {
        servers: r
      })
    }, () => {
      this.props.onChange(this.state.settings);
    });
  }
  render() {
    var e = this.state.settings.servers;
    return d.a.createElement(d.a.Fragment, null, <div className={"form-group"}>
                <label>{"DNS服务器表"}</label>
                {e.map((e, t) => {
        var n;
        return <div key={t}>
                            <div className={"row"}>
                                {d.a.createElement(m["a"], {
              type: "horizontal"
            }, e.address || "服务器组".concat(t + 1), " ", d.a.createElement(l["a"], {
              type: "delete",
              style: {
                color: "#ff4d4f"
              },
              onClick: () => this.dropServer(t)
            }))}
                                <div className={"form-group col-md-9 col-xs-12"}>
                                    <label>{"DNS服务器地址"}</label>
                                    {d.a.createElement(s["a"], {
                placeholder: "请输入DNS服务器地址",
                value: e.address,
                onChange: e => this.changeServer(t, "address", e.target.value)
              })}
                                </div>
                                <div className={"form-group col-md-3 col-xs-12"}>
                                    <label>{"端口"}</label>
                                    {d.a.createElement(s["a"], {
                type: "number",
                placeholder: "端口",
                value: e.port,
                onChange: e => this.changeServer(t, "port", parseInt(e.target.value))
              })}
                                </div>
                            </div>
                            <div className={"form-group"}>
                                <label>{"域名"}</label>
                                {d.a.createElement(s["a"].TextArea, {
              rows: 5,
              onChange: e => this.changeServer(t, "domains", e.target.value),
              value: null === (n = e.domains) || void 0 === n ? void 0 : n.join("\n"),
              placeholder: "域名列表，此列表包含的域名，将优先使用此服务器进行查询。一行一条"
            })}
                            </div>
                        </div>;
      })}
                <div>
                    {d.a.createElement(i["a"], {
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
class v extends d.a.Component {
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
    return d.a.createElement(d.a.Fragment, null, <div className={"form-group"}>
                <label>{"域名过滤器"}</label>
                {d.a.createElement(s["a"].TextArea, {
        value: t && t.join("\n"),
        onChange: e => this.change("domain", e.target.value),
        rows: 5
      })}
            </div>, <div className={"form-group"}>
                <label>{"协议过滤器"}</label>
                {d.a.createElement(s["a"].TextArea, {
        value: n && n.join("\n"),
        onChange: e => this.change("protocol", e.target.value),
        rows: 5
      })}
            </div>);
  }
}
require("../vendor/modules/426f5337.js");
var y = require("../vendor/modules/53646330.js");
class b extends d.a.Component {
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
    return d.a.createElement(d.a.Fragment, null, <div>
                <div className={"form-group"}>
                    <label>{"Server Name"}</label>
                    {d.a.createElement(s["a"], {
          value: t,
          onChange: e => this.change("serverName", e.target.value),
          placeholder: "不使用请留空"
        })}
                </div>
                <div className={"form-group"}>
                    <label>{"Allow Insecure"}</label>
                    <div>
                        {d.a.createElement(y["a"], {
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
class E extends d.a.Component {
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
      h["a"].error({
        message: "请求失败",
        description: "传输协议配置格式有误"
      });
    }
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: u()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  changeServer(e, t) {
    this.setState({
      server: u()({}, this.state.server, {
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
                                    {d.a.createElement(l["a"], {
                  type: "link"
                })}
                                    {"参考"}
                                </a>
                            </label>
                            {d.a.createElement(x.a, {
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
        return d.a.createElement(v, {
          settings: n,
          onChange: e => this.changeServer("ruleSettings", e)
        });
      case "tlsSettings":
        return d.a.createElement(b, {
          settings: r,
          onChange: e => this.changeServer("tlsSettings", e)
        });
      case "dnsSettings":
        return d.a.createElement(g, {
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
    return d.a.createElement(d.a.Fragment, null, d.a.cloneElement(this.props.children, {
      onClick: () => this.onShow()
    }), d.a.createElement(r["a"], {
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
                            {d.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {d.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {d.a.createElement(a["a"], {
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
                            {d.a.createElement(_["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {d.a.createElement(a["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, c.map(e => {
          return d.a.createElement(a["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-8 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {d.a.createElement(s["a"], {
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
                            {d.a.createElement(a["a"], {
            value: parseInt(e.tls) ? 1 : 0,
            placeholder: "是否支持TLS",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("tls", e)
          }, d.a.createElement(a["a"].Option, {
            key: 0,
            value: 0
          }, "不支持"), d.a.createElement(a["a"].Option, {
            key: 1,
            value: 1
          }, "支持"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {d.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {d.a.createElement(s["a"], {
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
                            {d.a.createElement(a["a"], {
            value: e.network,
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, d.a.createElement(a["a"].Option, {
            value: "tcp"
          }, "TCP"), d.a.createElement(a["a"].Option, {
            value: "ws"
          }, "WebSocket"), d.a.createElement(a["a"].Option, {
            value: "grpc"
          }, "gRPC"), d.a.createElement(a["a"].Option, {
            value: "kcp"
          }, "mKCP"), d.a.createElement(a["a"].Option, {
            value: "httpupgrade"
          }, "HTTPUpgrade"), d.a.createElement(a["a"].Option, {
            value: "xhttp"
          }, "XHTTP"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {d.a.createElement(o["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {d.a.createElement(l["a"], {
              type: "read"
            })}
                                </a>)}
                        </label>
                        {d.a.createElement(a["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, d.a.createElement(a["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("vmess" === t.type && t.id !== e.id) return d.a.createElement(a["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {d.a.createElement(a["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, u.map(e => {
          return d.a.createElement(a["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {d.a.createElement(i["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {d.a.createElement(i["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, d.a.createElement(r["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
legacyExports["a"] = Object(p["c"])(e => {
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
})(E);

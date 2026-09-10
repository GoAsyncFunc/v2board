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
  a = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  s = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  l = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  c = require("../vendor/modules/70307045.js"),
  u = interopDefault(c),
  h = require("../vendor/modules/71317449.js"),
  f = interopDefault(h),
  d = require("../vendor/reactRedux.js"),
  p = (require("../vendor/modules/6c633544.js"), require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js")),
  q = interopDefault(require("../vendor/modules/6c633544.js"));
class m extends f.a.Component {
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
      t = e.network_settings;
    switch (this.state.childDrawer.type) {
      case "network_settings":
        var o = {
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
                                    {f.a.createElement(a["a"], {
                  type: "link"
                })}
                                    {"参考"}
                                </a>
                            </label>
                            {f.a.createElement(q.a, {
              placeholder: (null === o || void 0 === o ? void 0 : o[this.state.server.network]) || "",
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
      server: u()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverTrojan.saveLoading,
      n = this.props.serverManage.servers,
      c = this.props.serverGroup.groups,
      u = this.props.serverRoute.routes;
    return f.a.createElement(f.a.Fragment, null, f.a.cloneElement(this.props.children, {
      onClick: () => this.onShow()
    }), f.a.createElement(r["a"], {
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
                            {f.a.createElement(l["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {f.a.createElement(l["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {f.a.createElement(s["a"], {
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
                            {f.a.createElement(p["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {f.a.createElement(s["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, c.map(e => {
          return f.a.createElement(s["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {f.a.createElement(l["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {f.a.createElement(l["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {f.a.createElement(l["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {f.a.createElement(o["a"], {
              placement: "top",
              title: "使用自签名证书需要允许不安全，用户才可以连接"
            }, "允许不安全 ", f.a.createElement(a["a"], {
              type: "question-circle"
            }))}
                            </label>
                            {f.a.createElement(s["a"], {
            value: parseInt(e.allow_insecure) ? 1 : 0,
            placeholder: "允许不安全",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("allow_insecure", e)
          }, f.a.createElement(s["a"].Option, {
            key: 0,
            value: 0
          }, "否"), f.a.createElement(s["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"服务器名称指示(sni)"}</label>
                        {f.a.createElement(l["a"], {
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
                            {f.a.createElement(s["a"], {
            value: e.network,
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, f.a.createElement(s["a"].Option, {
            value: "tcp"
          }, "TCP"), f.a.createElement(s["a"].Option, {
            value: "ws"
          }, "WebSocket"), f.a.createElement(s["a"].Option, {
            value: "grpc"
          }, "gRPC"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {f.a.createElement(o["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {f.a.createElement(s["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, f.a.createElement(s["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("trojan" === t.type && t.id !== e.id) return f.a.createElement(s["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {f.a.createElement(s["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, u.map(e => {
          return f.a.createElement(s["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {f.a.createElement(i["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {f.a.createElement(i["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, f.a.createElement(r["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
legacyExports["a"] = Object(d["c"])(e => {
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
})(m);

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
  l = require("../vendor/modules/70307045.js"),
  c = interopDefault(l),
  u = require("../vendor/modules/71317449.js"),
  h = interopDefault(u),
  f = require("../vendor/reactRedux.js"),
  d = (require("../vendor/modules/6c633544.js"), require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js"));
class p extends h.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        cipher: "chacha20-ietf-poly1305",
        rate: 1
      },
      visible: !1,
      childDrawer: {
        visible: !1
      }
    };
  }
  onShow() {
    this.setState({
      visible: !this.state.visible
    });
  }
  save() {
    var e = this.state.server;
    this.props.dispatch({
      type: "serverShadowsocks/save",
      params: e,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: c()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  changeServer(e, t) {
    this.setState({
      server: c()({}, this.state.server, {
        [e]: t
      })
    });
  }
  formChange(e, t) {
    this.setState({
      server: c()({}, this.state.server, {
        [e]: t
      })
    });
  }
  setObfsSettings(e, t) {
    var n = this.state.server,
      r = n.obfs_settings || {};
    r[e] = t, this.setState({
      server: c()({}, this.state.server, {
        obfs_settings: r
      })
    });
  }
  renderObfs() {
    var e = this.state.server;
    switch (e.obfs) {
      case "http":
        var t, n;
        return <div className={"row mt-2"}>
                        <div className={"form-group col-4 mb-0"}>
                            {h.a.createElement(s["a"], {
              placeholder: "路径",
              value: null === (t = e.obfs_settings) || void 0 === t ? void 0 : t.path,
              onChange: e => this.setObfsSettings("path", e.target.value)
            })}
                        </div>
                        <div className={"form-group col-8 mb-0"}>
                            {h.a.createElement(s["a"], {
              placeholder: "Host",
              value: null === (n = e.obfs_settings) || void 0 === n ? void 0 : n.host,
              onChange: e => this.setObfsSettings("host", e.target.value)
            })}
                        </div>
                    </div>;
    }
  }
  render() {
    var e = this.state.server,
      t = this.props.serverShadowsocks.saveLoading,
      n = this.props.serverManage.servers,
      l = this.props.serverGroup.groups,
      c = this.props.serverRoute.routes;
    return h.a.createElement(h.a.Fragment, null, h.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), h.a.createElement(r["a"], {
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
                            {h.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {h.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {h.a.createElement(a["a"], {
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
                            {h.a.createElement(d["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {h.a.createElement(a["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, l.map(e => {
          return h.a.createElement(a["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {h.a.createElement(s["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {h.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {h.a.createElement(s["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"加密算法"}</label>
                        {h.a.createElement(a["a"], {
          value: e.cipher,
          onChange: e => this.formChange("cipher", e),
          style: {
            width: "100%"
          }
        }, h.a.createElement(a["a"].Option, {
          value: "aes-128-gcm"
        }, "aes-128-gcm"), h.a.createElement(a["a"].Option, {
          value: "aes-192-gcm"
        }, "aes-192-gcm"), h.a.createElement(a["a"].Option, {
          value: "aes-256-gcm"
        }, "aes-256-gcm"), h.a.createElement(a["a"].Option, {
          value: "chacha20-ietf-poly1305"
        }, "chacha20-ietf-poly1305"), h.a.createElement(a["a"].Option, {
          value: "2022-blake3-aes-128-gcm"
        }, "2022-blake3-aes-128-gcm"), h.a.createElement(a["a"].Option, {
          value: "2022-blake3-aes-256-gcm"
        }, "2022-blake3-aes-256-gcm"))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"混淆"}</label>
                        {h.a.createElement(a["a"], {
          value: e.obfs || "",
          onChange: e => this.formChange("obfs", e),
          style: {
            width: "100%"
          }
        }, h.a.createElement(a["a"].Option, {
          value: ""
        }, "无"), h.a.createElement(a["a"].Option, {
          value: "http"
        }, "HTTP"))}
                        <div>{this.renderObfs()}</div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {h.a.createElement(o["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {h.a.createElement(a["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, h.a.createElement(a["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("shadowsocks" === t.type && t.id !== e.id) return h.a.createElement(a["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {h.a.createElement(a["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, c.map(e => {
          return h.a.createElement(a["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {h.a.createElement(i["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {h.a.createElement(i["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
legacyExports["a"] = Object(f["c"])(e => {
  var t = e.serverShadowsocks,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverShadowsocks: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(p);

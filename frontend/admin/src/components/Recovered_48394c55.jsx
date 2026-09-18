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
  select = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/antdSelect.js")),
  input = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  objectAssignModule = require("../vendor/modules/70307045.js"),
  objectAssign = interopDefault(objectAssignModule),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  reactRedux = require("../vendor/reactRedux.js"),
  permissionGroup = (require("../vendor/modules/6c633544.js"), require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js"));
class ShadowsocksEditor extends ReactComponent.a.Component {
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
    var server = this.state.server;
    this.props.dispatch({
      type: "serverShadowsocks/save",
      params: server,
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
  formChange(e, t) {
    this.setState({
      server: objectAssign()({}, this.state.server, {
        [e]: t
      })
    });
  }
  setObfsSettings(e, t) {
    var n = this.state.server,
      r = n.obfs_settings || {};
    r[e] = t, this.setState({
      server: objectAssign()({}, this.state.server, {
        obfs_settings: r
      })
    });
  }
  renderObfs() {
    var server = this.state.server;
    switch (server.obfs) {
      case "http":
        var t, n;
        return <div className={"row mt-2"}>
                        <div className={"form-group col-4 mb-0"}>
                            {ReactComponent.a.createElement(input["a"], {
              placeholder: "路径",
              value: null === (t = server.obfs_settings) || void 0 === t ? void 0 : t.path,
              onChange: e => this.setObfsSettings("path", e.target.value)
            })}
                        </div>
                        <div className={"form-group col-8 mb-0"}>
                            {ReactComponent.a.createElement(input["a"], {
              placeholder: "Host",
              value: null === (n = server.obfs_settings) || void 0 === n ? void 0 : n.host,
              onChange: e => this.setObfsSettings("host", e.target.value)
            })}
                        </div>
                    </div>;
    }
  }
  render() {
    var server = this.state.server,
      saveLoading = this.props.serverShadowsocks.saveLoading,
      servers = this.props.serverManage.servers,
      groups = this.props.serverGroup.groups,
      routes = this.props.serverRoute.routes;
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), ReactComponent.a.createElement(drawer["a"], {
      id: "server",
      maskClosable: !0,
      title: server.id ? "编辑节点" : "新建节点",
      width: "80%",
      visible: this.state.visible,
      onClose: () => this.onShow()
    }, <div>
                    <div className={"row"}>
                        <div className={"form-group col-8"}>
                            <label>{"节点名称"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "请输入节点名称",
            value: server.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: server.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "tags",
          value: server.tags || [],
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
          value: server.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, groups.map(group => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: group.id
          }, group.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "地址或IP",
            value: server.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "用户连接端口",
            value: server.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {ReactComponent.a.createElement(input["a"], {
            placeholder: "服务端开放端口",
            value: server.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"加密算法"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          value: server.cipher,
          onChange: e => this.formChange("cipher", e),
          style: {
            width: "100%"
          }
        }, ReactComponent.a.createElement(select["a"].Option, {
          value: "aes-128-gcm"
        }, "aes-128-gcm"), ReactComponent.a.createElement(select["a"].Option, {
          value: "aes-192-gcm"
        }, "aes-192-gcm"), ReactComponent.a.createElement(select["a"].Option, {
          value: "aes-256-gcm"
        }, "aes-256-gcm"), ReactComponent.a.createElement(select["a"].Option, {
          value: "chacha20-ietf-poly1305"
        }, "chacha20-ietf-poly1305"), ReactComponent.a.createElement(select["a"].Option, {
          value: "2022-blake3-aes-128-gcm"
        }, "2022-blake3-aes-128-gcm"), ReactComponent.a.createElement(select["a"].Option, {
          value: "2022-blake3-aes-256-gcm"
        }, "2022-blake3-aes-256-gcm"))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"混淆"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          value: server.obfs || "",
          onChange: e => this.formChange("obfs", e),
          style: {
            width: "100%"
          }
        }, ReactComponent.a.createElement(select["a"].Option, {
          value: ""
        }, "无"), ReactComponent.a.createElement(select["a"].Option, {
          value: "http"
        }, "HTTP"))}
                        <div>{this.renderObfs()}</div>
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
          value: server.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, ReactComponent.a.createElement(select["a"].Option, {
          value: ""
        }, "无"), servers.map(serverOption => {
          if ("shadowsocks" === serverOption.type && serverOption.id !== server.id) return ReactComponent.a.createElement(select["a"].Option, {
            key: Math.random(),
            value: serverOption.id
          }, serverOption.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {ReactComponent.a.createElement(select["a"], {
          mode: "multiple",
          value: server.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, routes.map(route => {
          return ReactComponent.a.createElement(select["a"].Option, {
            key: route.id
          }, route.remarks);
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
        loading: saveLoading,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
legacyExports["a"] = Object(reactRedux["c"])(e => {
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
})(ShadowsocksEditor);

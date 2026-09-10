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
  o = (require("../vendor/modules/4d777032.js"), require("../vendor/modules/5658456a.js")),
  a = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  s = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  l = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  c = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  u = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  h = (require("../vendor/modules/41776870.js"), require("../vendor/modules/4b725473.js")),
  f = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/53646330.js")),
  d = (require("../vendor/modules/71566450.js"), require("../vendor/modules/6a73432b.js")),
  p = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/42764b73.js")),
  m = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  g = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/6d723332.js")),
  v = require("../vendor/modules/71317449.js"),
  y = interopDefault(v),
  b = require("../layouts/MainLayout.jsx"),
  w = require("../components/Recovered_48394c55.jsx"),
  x = require("../vendor/modules/71716f75.js"),
  _ = require("../vendor/reactRedux.js"),
  E = require("../vendor/modules/2b515243.js"),
  S = interopDefault(E),
  k = require("../components/Recovered_33585647.jsx"),
  C = require("../components/Recovered_796b4332.jsx"),
  O = require("../vendor/modules/42364a6b.js"),
  T = interopDefault(O),
  L = require("../vendor/siteHelpers.js"),
  A = require("../vendor/modules/414d6762.js"),
  P = interopDefault(A),
  j = require("../components/Recovered_4f613657.jsx"),
  M = require("../vendor/modules/76333265.js"),
  R = (require("../vendor/modules/62627350.js"), require("../vendor/modules/2f774774.js")),
  N = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  D = require("../vendor/modules/70307045.js"),
  I = interopDefault(D),
  $ = require("../vendor/modules/6c633544.js"),
  F = interopDefault($),
  B = (require("../vendor/modules/56655761.js"), require("../vendor/modules/756d4e66.js"), require("../vendor/modules/387a4e6a.js"));
class V extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        insecure: 0,
        version: 1,
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
      type: "serverHysteria/save",
      params: e,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: I()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  changeServer(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  formChange(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverHysteria.saveLoading,
      n = this.props.serverManage.servers,
      r = this.props.serverGroup.groups,
      i = this.props.serverRoute.routes;
    return y.a.createElement(y.a.Fragment, null, y.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), y.a.createElement(R["a"], {
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
                            {y.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {y.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {y.a.createElement(N["a"], {
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
                            {y.a.createElement(B["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, r.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-3 col-xs-12"}>
                            <label>{"HYSTERIA版本"}</label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.version) ? parseInt(e.version) : 1,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("version", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 1
          }, "v1"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 2
          }, "v2"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {y.a.createElement(u["a"], {
              placement: "top",
              title: "使用自签名证书需要允许不安全，用户才可以连接"
            }, "允许不安全 ", y.a.createElement(m["a"], {
              type: "question-circle"
            }))}
                            </label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.insecure) ? 1 : 0,
            placeholder: "允许不安全",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("insecure", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"服务器名称指示(sni)"}</label>
                        {y.a.createElement(s["a"], {
          placeholder: "当节点地址与证书不一致时用于证书验证",
          value: e.server_name,
          onChange: e => this.formChange("server_name", e.target.value)
        })}
                    </div>
                    <div className={"row"}>
                        {parseInt(e.version) == 1 && <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"混淆方式obfs"}</label>
                                {y.a.createElement(N["a"], {
            value: e.obfs,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("obfs", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "xplus"
          }, "xplus"))}
                            </div>}
                        {parseInt(e.version) == 1 && e.obfs === "xplus" && <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"混淆密码obfsParam"}</label>
                                {y.a.createElement(s["a"], {
            value: e.obfs_password,
            placeholder: "留空自动生成",
            onChange: e => this.formChange("obfs_password", e.target.value)
          })}
                            </div>}
                        {parseInt(e.version) == 2 && <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"混淆方式obfs"}</label>
                                {y.a.createElement(N["a"], {
            value: e.obfs,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("obfs", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "salamander"
          }, "salamander"))}
                            </div>}
                        {parseInt(e.version) == 2 && e.obfs === "salamander" && <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"混淆密码obfs_password"}</label>
                                    {y.a.createElement(s["a"], {
            value: e.obfs_password,
            placeholder: "留空自动生成",
            onChange: e => this.formChange("obfs_password", e.target.value)
          })}
                                </div>}
                    </div>
                    <div className={"form-group"}>
                        <label>{"上行带宽"}</label>
                        {y.a.createElement(s["a"], {
          addonAfter: "Mbps",
          placeholder: "服务端发送带宽,留空或填0使用BBR",
          value: e.up_mbps,
          onChange: e => this.formChange("up_mbps", e.target.value)
        })}
                    </div>
                    <div className={"form-group"}>
                        <label>{"下行带宽"}</label>
                        {y.a.createElement(s["a"], {
          addonAfter: "Mbps",
          placeholder: "服务端接收带宽,留空或填0使用BBR",
          value: e.down_mbps,
          onChange: e => this.formChange("down_mbps", e.target.value)
        })}
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {y.a.createElement(u["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("hysteria" === t.type && t.id !== e.id) return y.a.createElement(N["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, i.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {y.a.createElement(l["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {y.a.createElement(l["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
var W = Object(_["c"])(e => {
    var t = e.serverHysteria,
      n = e.serverGroup,
      r = e.serverManage,
      i = e.serverRoute;
    return {
      serverHysteria: t,
      serverGroup: n,
      serverManage: r,
      serverRoute: i
    };
  })(V),
  H = (require("../vendor/modules/2f786b65.js"), require("../vendor/notification.js"));
class U extends y.a.Component {
  constructor(e) {
    super(e);
    var t = this.props.settings;
    "{}" !== JSON.stringify(t) && t || (t = {
      server_name: "",
      cert_mode: "self",
      provider: "",
      dns_env: "",
      reject_unknown_sni: "0",
      allow_insecure: "0"
    }), this.state = {
      tls: this.props.tls,
      settings: t,
      cert_apply: this.props.cert_apply
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
      t = e.server_name,
      n = e.allow_insecure,
      pv = e.private_key,
      pb = e.public_key,
      sd = e.short_id,
      pt = e.server_port,
      ds = e.dest,
      xv = e.xver,
      fp = e.fingerprint,
      tls = this.state.tls,
      cert_apply = this.state.cert_apply;
    return y.a.createElement(y.a.Fragment, null, <div>
                <div className={"form-group"}>
                    <label>{"Server Name(SNI)"}</label>
                    {y.a.createElement(s["a"], {
          value: t,
          onChange: e => this.change("server_name", e.target.value),
          placeholder: tls == 2 ? "REALITY必填，与后端保持一致" : ""
        })}
                </div>
                {tls == 1 && cert_apply && <div className={"form-group"}>
                        <label>{"证书模式Cert Mode"}</label>
                        {y.a.createElement(N["a"], {
          value: e.cert_mode ?? "self",
          style: {
            width: "100%"
          },
          onChange: e => this.change("cert_mode", e)
        }, y.a.createElement(N["a"].Option, {
          value: "self"
        }, "自签名"), y.a.createElement(N["a"].Option, {
          value: "remote"
        }, "自签名(面板下发)"), y.a.createElement(N["a"].Option, {
          value: "http"
        }, "HTTP申请"), y.a.createElement(N["a"].Option, {
          value: "dns"
        }, "DNS申请"), y.a.createElement(N["a"].Option, {
          value: "none"
        }, "无证书(关闭TLS)"))}
                    </div>}
                {e.cert_mode == "dns" && cert_apply && <div className={"form-group"}>
                        <label>
                            {"DNS解析提供商Provider "}
                            <a target={"_blank"} href={"https://go-acme.github.io/lego/dns/index.html"} rel={"noreferrer"}>
                                {"填写参考"}
                            </a>
                        </label>
                        {y.a.createElement(s["a"], {
          value: e.provider,
          onChange: e => this.change("provider", e.target.value),
          placeholder: "书写格式cloudflare"
        })}
                    </div>}
                {e.cert_mode == "dns" && cert_apply && <div className={"form-group"}>
                        <label>{"DNS env"}</label>
                        {y.a.createElement(s["a"], {
          value: e.dns_env,
          onChange: e => this.change("dns_env", e.target.value),
          placeholder: "书写格式CF_DNS_API_TOKEN=xxxxxxx如有多条使用逗号,分隔"
        })}
                    </div>}
                {tls == 1 && e.cert_mode != "none" && cert_apply && <div className={"form-group"}>
                        <label>{"证书公钥文件地址Cert File Path"}</label>
                        {y.a.createElement(s["a"], {
          value: e.cert_file,
          onChange: e => this.change("cert_file", e.target.value),
          placeholder: "留空在/etc/v2node/目录自动生成"
        })}
                    </div>}
                {tls == 1 && e.cert_mode != "none" && cert_apply && <div className={"form-group"}>
                        <label>{"证书私钥文件地址Key File Path"}</label>
                        {y.a.createElement(s["a"], {
          value: e.key_file,
          onChange: e => this.change("key_file", e.target.value),
          placeholder: "留空在/etc/v2node/目录自动生成"
        })}
                    </div>}
                {tls == 1 && e.cert_mode == "remote" && cert_apply && <div className={"form-group"}>
                        <label>{"pinnedPeerCertSha256"}</label>
                        {y.a.createElement(s["a"], {
          value: e.pinned_peer_cert_sha256,
          readOnly: true,
          style: {
            backgroundColor: "#f5f5f5a0",
            cursor: "text"
          },
          placeholder: "自动生成"
        })}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"Server Address"}</label>
                        {y.a.createElement(s["a"], {
          value: ds,
          onChange: e => this.change("dest", e.target.value),
          placeholder: "REALITY目标地址,默认使用SNI"
        })}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"Server Port"}</label>
                        {y.a.createElement(s["a"], {
          value: pt,
          onChange: e => this.change("server_port", e.target.value),
          placeholder: "REALITY目标端口,默认443"
        })}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"Proxy Protocol"}</label>
                        {y.a.createElement(N["a"], {
          value: parseInt(xv) ? parseInt(xv) : 0,
          style: {
            width: "100%"
          },
          onChange: e => this.change("xver", e)
        }, y.a.createElement(N["a"].Option, {
          key: 0,
          value: 0
        }, "0"), y.a.createElement(N["a"].Option, {
          key: 1,
          value: 1
        }, "1"), y.a.createElement(N["a"].Option, {
          key: 2,
          value: 2
        }, "2"))}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"Private Key"}</label>
                        {y.a.createElement(s["a"], {
          value: pv,
          onChange: e => this.change("private_key", e.target.value),
          placeholder: "留空自动生成"
        })}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"Public Key"}</label>
                        {y.a.createElement(s["a"], {
          value: pb,
          onChange: e => this.change("public_key", e.target.value),
          placeholder: "留空自动生成"
        })}
                    </div>}
                {tls == 2 && <div className={"form-group"}>
                        <label>{"ShortId"}</label>
                        {y.a.createElement(s["a"], {
          value: sd,
          onChange: e => this.change("short_id", e.target.value),
          placeholder: "留空自动生成"
        })}
                    </div>}
                <div className={"form-group"}>
                    <label>{"FingerPrint"}</label>
                    {y.a.createElement(N["a"], {
          value: fp,
          style: {
            width: "100%"
          },
          onChange: e => this.change("fingerprint", e),
          placeholder: "TLS指纹默认Chrome"
        }, y.a.createElement(N["a"].Option, {
          key: 0,
          value: "chrome"
        }, "Chrome"), y.a.createElement(N["a"].Option, {
          key: 1,
          value: "firefox"
        }, "Firefox"), y.a.createElement(N["a"].Option, {
          key: 2,
          value: "safari"
        }, "Safari"), y.a.createElement(N["a"].Option, {
          key: 3,
          value: "ios"
        }, "IOS"), y.a.createElement(N["a"].Option, {
          key: 4,
          value: "android"
        }, "Android"), y.a.createElement(N["a"].Option, {
          key: 5,
          value: "edge"
        }, "Edge"), y.a.createElement(N["a"].Option, {
          key: 6,
          value: "360"
        }, "360"), y.a.createElement(N["a"].Option, {
          key: 7,
          value: "qq"
        }, "QQ"))}
                </div>
                {tls == 1 && cert_apply && <div className={"form-group"}>
                        <label>{"Reject unknown sni"}</label>
                        <div>
                            {y.a.createElement(f["a"], {
            checked: parseInt(e.reject_unknown_sni),
            onChange: e => this.change("reject_unknown_sni", e ? "1" : "0")
          })}
                        </div>
                    </div>}
                <div className={"form-group"}>
                    <label>{"Allow Insecure"}</label>
                    <div>
                        {y.a.createElement(f["a"], {
            checked: parseInt(n),
            onChange: e => this.change("allow_insecure", e ? "1" : "0")
          })}
                    </div>
                </div>
                <div className={"form-group"}>
                    <label>{"ECH (Encrypted Client Hello)"}</label>
                    {y.a.createElement(N["a"], {
          value: e.ech || "",
          style: {
            width: "100%"
          },
          onChange: e => this.change("ech", e),
          placeholder: "选择 ECH 模式"
        }, y.a.createElement(N["a"].Option, {
          key: 0,
          value: ""
        }, "无"), y.a.createElement(N["a"].Option, {
          key: 1,
          value: "cloudflare"
        }, "Cloudflare"), y.a.createElement(N["a"].Option, {
          key: 2,
          value: "custom"
        }, "自定义 SNI"))}
                </div>
                {e.ech === "cloudflare" && <div className={"form-group"} style={{
        background: "#f6ffed",
        padding: "8px 12px",
        borderRadius: "4px",
        border: "1px solid #b7eb8f"
      }}>
                        <span style={{
          color: "#52c41a"
        }}>
                            {"✓ Cloudflare 托管 ECH，密钥由 Cloudflare 自动管理，客户端从 DNS 自动获取配置，服务端无需配置"}
                        </span>
                    </div>}
                {e.ech === "custom" && <div className={"form-group"}>
                        <label>{"ECH Server Name (伪装域名/外层SNI)"}</label>
                        {y.a.createElement(s["a"], {
          value: e.ech_server_name || "",
          onChange: e => this.change("ech_server_name", e.target.value),
          placeholder: "必填"
        })}
                    </div>}
                {e.ech === "custom" && <div className={"form-group"}>
                        <label>{"ECH Key (服务端私钥)"}</label>
                        {y.a.createElement(s["a"], {
          value: e.ech_key || "",
          onChange: e => this.change("ech_key", e.target.value),
          placeholder: "留空自动生成"
        })}
                    </div>}
                {e.ech === "custom" && <div className={"form-group"}>
                        <label>{"ECH Config (客户端配置)"}</label>
                        {y.a.createElement(s["a"], {
          value: e.ech_config || "",
          onChange: e => this.change("ech_config", e.target.value),
          placeholder: "留空自动生成"
        })}
                    </div>}
            </div>);
  }
}
class EncryptionSettings extends y.a.Component {
  constructor(e) {
    super(e);
    var t = this.props.settings;
    "{}" !== JSON.stringify(t) && t || (t = {
      mode: "native",
      rtt: "0rtt",
      ticket: "600s",
      server_padding: null,
      client_padding: null,
      private_key: null,
      password: null
    }), this.state = {
      encryption: this.props.encryption,
      settings: t
    }, this.props.onChange(this.state.settings);
  }
  change(e, t) {
    var n = this.state.settings;
    n[e] = t, this.setState({
      settings: n
    }), this.props.onChange(this.state.settings);
  }
  render() {
    var e = this.state.settings,
      m = e.mode,
      r = e.rtt,
      tt = e.ticket,
      sp = e.server_padding,
      cp = e.client_padding,
      pv = e.private_key,
      pwd = e.password,
      encryption = this.props.encryption;
    return y.a.createElement(y.a.Fragment, null, <div>
                <div className={"form-group"}>
                    <label>{"Mode"}</label>
                    {y.a.createElement(N["a"], {
          value: m,
          style: {
            width: "100%"
          },
          onChange: e => this.change("mode", e)
        }, y.a.createElement(N["a"].Option, {
          key: 0,
          value: "native"
        }, "native"), y.a.createElement(N["a"].Option, {
          key: 1,
          value: "xorpub"
        }, "xorpub"), y.a.createElement(N["a"].Option, {
          key: 2,
          value: "random"
        }, "random"))}
                </div>
                <div className={"row"}>
                    <div className={"form-group col-md-6 col-xs-12"}>
                        <label>{"RTT"}</label>
                        {y.a.createElement(N["a"], {
            value: r,
            style: {
              width: "100%"
            },
            onChange: e => this.change("rtt", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "0rtt"
          }, "0rtt"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "1rtt"
          }, "1rtt"))}
                    </div>
                    {r === "0rtt" && <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"Ticket time"}</label>
                            {y.a.createElement(s["a"], {
            value: tt,
            onChange: e => this.change("ticket", e.target.value),
            placeholder: "最长允许时间"
          })}
                        </div>}
                </div>
                <div className={"form-group"}>
                    <label>{"Server Padding"}</label>
                    {y.a.createElement(s["a"], {
          value: sp,
          onChange: e => this.change("server_padding", e.target.value),
          placeholder: "留空使用默认值100-111-1111.75-0-111.50-0-3333"
        })}
                </div>
                <div className={"form-group"}>
                    <label>{"Private Key"}</label>
                    {y.a.createElement(s["a"], {
          value: pv,
          onChange: e => this.change("private_key", e.target.value),
          placeholder: "留空自动生成，需抗量子加密请自行替换"
        })}
                </div>
                <div className={"form-group"}>
                    <label>{"Client Padding"}</label>
                    {y.a.createElement(s["a"], {
          value: cp,
          onChange: e => this.change("client_padding", e.target.value),
          placeholder: "留空使用默认值100-111-1111.75-0-111.50-0-3333"
        })}
                </div>
                <div className={"form-group"}>
                    <label>{"Password"}</label>
                    {y.a.createElement(s["a"], {
          value: pwd,
          onChange: e => this.change("password", e.target.value),
          placeholder: "留空自动生成，需抗量子加密请自行替换"
        })}
                </div>
            </div>);
  }
}
class z extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        tls: 0,
        rate: 1,
        flow: null
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
    try {
      var e = this.state.server;
      e.network_settings = e.network_settings ? "string" === typeof e.network_settings && JSON.parse(e.network_settings) : null, this.props.dispatch({
        type: "serverVless/save",
        params: e,
        callback: () => {
          this.onShow();
        }
      });
    } catch (e) {
      H["a"].error({
        message: "请求失败",
        description: "传输协议配置格式有误"
      });
    }
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: I()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  changeServer(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  renderChildDrawer() {
    var e = this.state.server,
      t = e.network_settings,
      n = e.tls_settings,
      enc = e.encryption_settings;
    switch (this.state.childDrawer.type) {
      case "network_settings":
        var r = {
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
            security: "auto",
            //不支持vless，vmess可选加密类型：auto、aes-128-gcm、chacha20-poly1305、none
            path: "/",
            headers: {
              Host: "xtls.github.io"
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
            host: "xtls.github.io",
            mode: "auto",
            extra: {}
          }, null, 4)
        };
        return <div id={"v2ray-protocol"}>
                        <div className={"form-group"}>
                            <label>
                                {"协议详细配置"}
                                <a href={"https://www.v2ray.com/chapter_02/05_transport.html"}>
                                    {y.a.createElement(m["a"], {
                  type: "link"
                })}
                                    {"参考"}
                                </a>
                            </label>
                            {y.a.createElement(F.a, {
              placeholder: (null === r || void 0 === r ? void 0 : r[this.state.server.network]) || "",
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
      case "tls_settings":
        return <U settings={n} tls={e.tls} onChange={e => this.changeServer("tls_settings", e)}></U>;
      case "encryption_settings":
        return <EncryptionSettings settings={enc} onChange={e => this.changeServer("encryption_settings", e)}></EncryptionSettings>;
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
      t = this.props.serverVless.saveLoading,
      n = this.props.serverManage.servers,
      r = this.props.serverGroup.groups,
      i = this.props.serverRoute.routes;
    return y.a.createElement(y.a.Fragment, null, y.a.cloneElement(this.props.children, {
      onClick: () => this.onShow()
    }), y.a.createElement(R["a"], {
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
                            {y.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {y.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {y.a.createElement(N["a"], {
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
                            {y.a.createElement(B["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, r.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-8 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "请输入连接地址",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {"安全性 "}
                                {parseInt(e.tls) != 0 && <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑安全性配置", "tls_settings")}>
                                        {"编辑配置"}
                                    </a>}
                            </label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.tls) || 0,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("tls", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "无"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "TLS"), y.a.createElement(N["a"].Option, {
            key: 2,
            value: 2
          }, "Reality"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {y.a.createElement(s["a"], {
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
                                <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑协议配置", "network_settings")}>
                                    {"编辑配置"}
                                </a>
                            </label>
                            {y.a.createElement(N["a"], {
            value: e.network,
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, y.a.createElement(N["a"].Option, {
            value: "tcp"
          }, "TCP"), y.a.createElement(N["a"].Option, {
            value: "ws"
          }, "WebSocket"), y.a.createElement(N["a"].Option, {
            value: "grpc"
          }, "gRPC"), y.a.createElement(N["a"].Option, {
            value: "kcp"
          }, "mKCP"), y.a.createElement(N["a"].Option, {
            value: "httpupgrade"
          }, "HTTPUpgrade"), y.a.createElement(N["a"].Option, {
            value: "xhttp"
          }, "XHTTP"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>
                                {"加密方式 "}
                                {e.encryption && <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑加密配置", "encryption_settings")}>
                                        {"编辑配置"}
                                    </a>}
                            </label>
                            {y.a.createElement(N["a"], {
            value: e.encryption,
            placeholder: "选择加密方式",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("encryption", e)
          }, y.a.createElement(N["a"].Option, {
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            value: "mlkem768x25519plus"
          }, "MLKEM768X25519PLUS"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"XTLS流控算法"}</label>
                            {y.a.createElement(N["a"], {
            value: e.flow,
            placeholder: "选择XTLS流控算法",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("flow", e)
          }, y.a.createElement(N["a"].Option, {
            value: null
          }, "无"), e.network == "tcp" && y.a.createElement(N["a"].Option, {
            value: "xtls-rprx-vision"
          }, "xtls-rprx-vision"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {y.a.createElement(u["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {y.a.createElement(m["a"], {
              type: "read"
            })}
                                </a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("vless" === t.type && t.id !== e.id) return y.a.createElement(N["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, i.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {y.a.createElement(l["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {y.a.createElement(l["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, y.a.createElement(R["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
var G = Object(_["c"])(e => {
  var t = e.serverVless,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverVless: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(z);
class wTuic extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        insecure: 0,
        disable_sni: 0,
        udp_relay_mode: "native",
        zero_rtt_handshake: 0,
        congestion_control: "cubic",
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
      type: "serverTuic/save",
      params: e,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: I()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  formChange(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverTuic.saveLoading,
      n = this.props.serverManage.servers,
      r = this.props.serverGroup.groups,
      i = this.props.serverRoute.routes;
    return y.a.createElement(y.a.Fragment, null, y.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), y.a.createElement(R["a"], {
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
                            {y.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {y.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {y.a.createElement(N["a"], {
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
                            {y.a.createElement(B["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, r.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {y.a.createElement(u["a"], {
              placement: "top",
              title: "使用自签名证书需要允许不安全，用户才可以连接"
            }, "允许不安全 ", y.a.createElement(m["a"], {
              type: "question-circle"
            }))}
                            </label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.insecure) ? 1 : 0,
            placeholder: "允许不安全",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("insecure", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"禁用SNI"}</label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.disable_sni) ? 1 : 0,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("disable_sni", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"数据包中继模式"}</label>
                            {y.a.createElement(N["a"], {
            value: e.udp_relay_mode ? e.udp_relay_mode : "native",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("udp_relay_mode", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "native"
          }, "native"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "quic"
          }, "quic"))}
                        </div>
                    </div>
                    {!parseInt(e.disable_sni) && <div className={"form-group"}>
                            <label>{"服务器名称指示(sni)"}</label>
                            {y.a.createElement(s["a"], {
          placeholder: "当节点地址与证书不一致时用于证书验证",
          value: e.server_name,
          onChange: e => this.formChange("server_name", e.target.value)
        })}
                        </div>}
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"拥塞控制算法"}</label>
                            {y.a.createElement(N["a"], {
            value: e.congestion_control ? e.congestion_control : "cubic",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("congestion_control", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "cubic"
          }, "cubic"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "new_reno"
          }, "new_reno"), y.a.createElement(N["a"].Option, {
            key: 2,
            value: "bbr"
          }, "bbr"))}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"客户端启用 0-RTT"}</label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.zero_rtt_handshake) ? 1 : 0,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("zero_rtt_handshake", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {y.a.createElement(u["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("tuic" === t.type && t.id !== e.id) return y.a.createElement(N["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, i.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {y.a.createElement(l["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {y.a.createElement(l["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>));
  }
}
var mTuic = Object(_["c"])(e => {
  var t = e.serverTuic,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverTuic: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(wTuic);
class wAnyTLS extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        insecure: 0,
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
      type: "serverAnyTLS/save",
      params: e,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: I()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  renderChildDrawer() {
    var e = this.state.server,
      t = e.padding_scheme;
    var r = {
      default: JSON.stringify(["stop=8", "0=30-30", "1=100-400", "2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000", "3=9-9,500-1000", "4=500-1000", "5=500-1000", "6=500-1000", "7=500-1000"], null, 4)
    };
    return <div id={"anytls-padding-scheme"}>
                <div className={"form-group"}>
                    {y.a.createElement(F.a, {
          placeholder: (null === r || void 0 === r ? void 0 : r["default"]) || "",
          mode: "json",
          theme: "github",
          fontSize: 14,
          showPrintMargin: !0,
          showGutter: !0,
          highlightActiveLine: !0,
          value: t || "",
          onChange: e => this.formChange("padding_scheme", e),
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
  formChange(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverAnyTLS.saveLoading,
      n = this.props.serverManage.servers,
      r = this.props.serverGroup.groups,
      i = this.props.serverRoute.routes;
    return y.a.createElement(y.a.Fragment, null, y.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), y.a.createElement(R["a"], {
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
                            {y.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {y.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {y.a.createElement(N["a"], {
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
                            {y.a.createElement(B["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, r.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>{"节点地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-4 col-xs-12"}>
                            <label>
                                {y.a.createElement(u["a"], {
              placement: "top",
              title: "使用自签名证书需要允许不安全，用户才可以连接"
            }, "允许不安全 ", y.a.createElement(m["a"], {
              type: "question-circle"
            }))}
                            </label>
                            {y.a.createElement(N["a"], {
            value: parseInt(e.insecure) ? 1 : 0,
            placeholder: "允许不安全",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("insecure", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"服务器名称指示(sni)"}</label>
                        {y.a.createElement(s["a"], {
          placeholder: "当节点地址与证书不一致时用于证书验证",
          value: e.server_name,
          onChange: e => this.formChange("server_name", e.target.value)
        })}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-12 col-xs-12"}>
                            <label>
                                <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑填充方案", "padding_scheme")}>
                                    {"编辑填充方案"}
                                </a>
                            </label>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>
                            {y.a.createElement(u["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("anytls" === t.type && t.id !== e.id) return y.a.createElement(N["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, i.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {y.a.createElement(l["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {y.a.createElement(l["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, y.a.createElement(R["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
var mAnyTLS = Object(_["c"])(e => {
  var t = e.serverAnyTLS,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverAnyTLS: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(wAnyTLS);
class wV2node extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      server: this.props.record || {
        tls: 0,
        rate: 1,
        network: "tcp",
        disable_sni: 0,
        zero_rtt_handshake: 0,
        flow: null
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
    if (this.state.server.network_settings && "object" === typeof this.state.server.network_settings) {
      var e = this.state.server;
      e.network_settings = JSON.stringify(e["network_settings"], null, 2), this.setState({
        server: e
      });
    }
  }
  save() {
    legacyModule = JSON.parse(JSON.stringify(this.state.server));
    legacyModule.network_settings = legacyModule.network_settings ? "string" === typeof legacyModule.network_settings ? JSON.parse(legacyModule.network_settings) : legacyModule.network_settings : null;
    delete legacyModule.install_command;
    this.props.dispatch({
      type: "serverV2node/save",
      params: legacyModule,
      callback: () => {
        this.onShow();
      }
    });
  }
  showChildDrawer(e, t) {
    this.setState({
      childDrawer: I()({}, this.state.childDrawer, {
        visible: !this.state.childDrawer.visible,
        title: e,
        type: t
      })
    });
  }
  renderChildDrawer() {
    var e = this.state.server,
      ps = e.padding_scheme,
      ns = e.network_settings != null && "object" === typeof e.network_settings ? JSON.stringify(e.network_settings, null, 2) : e.network_settings,
      ts = e.tls_settings,
      enc = e.encryption_settings;
    switch (this.state.childDrawer.type) {
      case "network_settings":
        var r = {
          tcp: JSON.stringify({
            acceptProxyProtocol: false,
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
          http: JSON.stringify({
            acceptProxyProtocol: false,
            path: "/",
            Host: "xtls.github.io"
          }, null, 4),
          ws: JSON.stringify({
            acceptProxyProtocol: false,
            path: "/",
            headers: {
              Host: "xtls.github.io"
            }
          }, null, 4),
          grpc: JSON.stringify({
            serviceName: "GunService"
          }, null, 4),
          httpupgrade: JSON.stringify({
            acceptProxyProtocol: false,
            path: "/",
            host: "xtls.github.io"
          }, null, 4),
          xhttp: JSON.stringify({
            path: "/",
            host: "xtls.github.io",
            mode: "auto",
            extra: {}
          }, null, 4)
        };
        return <div id={"v2ray-protocol"}>
                        <div className={"form-group"}>
                            <label>
                                {"协议详细配置"}
                                <a href={"https://www.v2ray.com/chapter_02/05_transport.html"}>
                                    {y.a.createElement(m["a"], {
                  type: "link"
                })}
                                    {"参考"}
                                </a>
                            </label>
                            {y.a.createElement(F.a, {
              placeholder: (null == r || void 0 === r ? void 0 : r[this.state.server.network]) || "",
              mode: "json",
              theme: "github",
              fontSize: 14,
              showPrintMargin: !0,
              showGutter: !0,
              highlightActiveLine: !0,
              value: ns || "",
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
      case "tls_settings":
        return <U settings={ts} tls={e.tls} cert_apply={true} onChange={e => this.changeServer("tls_settings", e)}></U>;
      case "encryption_settings":
        return <EncryptionSettings settings={enc} onChange={e => this.changeServer("encryption_settings", e)}></EncryptionSettings>;
      case "padding_scheme":
        var r = {
          default: JSON.stringify(["stop=8", "0=30-30", "1=100-400", "2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000", "3=9-9,500-1000", "4=500-1000", "5=500-1000", "6=500-1000", "7=500-1000"], null, 4)
        };
        return <div id={"anytls-padding-scheme"}>
                        <div className={"form-group"}>
                            {y.a.createElement(F.a, {
              placeholder: (null === r || void 0 === r ? void 0 : r["default"]) || "",
              mode: "json",
              theme: "github",
              fontSize: 14,
              showPrintMargin: !0,
              showGutter: !0,
              highlightActiveLine: !0,
              value: ps || "",
              onChange: e => this.formChange("padding_scheme", e),
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
    if (e === "protocol" && ["anytls", "hysteria2", "trojan", "tuic"].includes(t)) {
      this.setState({
        server: I()({}, this.state.server, {
          protocol: t,
          tls: 1
        })
      });
    } else {
      this.setState({
        server: I()({}, this.state.server, {
          [e]: t
        })
      });
    }
  }
  changeServer(e, t) {
    this.setState({
      server: I()({}, this.state.server, {
        [e]: t
      })
    });
  }
  render() {
    var e = this.state.server,
      t = this.props.serverV2node.saveLoading,
      n = this.props.serverManage.servers,
      r = this.props.serverGroup.groups,
      i = this.props.serverRoute.routes;
    return y.a.createElement(y.a.Fragment, null, y.a.cloneElement(this.props.children, {
      onClick: () => this.setState({
        visible: !0
      })
    }), y.a.createElement(R["a"], {
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
                            {y.a.createElement(s["a"], {
            placeholder: "请输入节点名称",
            value: e.name,
            onChange: e => this.formChange("name", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-4"}>
                            <label>{"倍率"}</label>
                            {y.a.createElement(s["a"], {
            addonAfter: "x",
            placeholder: "请输入节点倍率",
            value: e.rate,
            onChange: e => this.formChange("rate", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <label>{"节点标签"}</label>
                        {y.a.createElement(N["a"], {
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
                            {y.a.createElement(B["a"], null, <a href={"javascript:(0);"}>{"添加权限组"}</a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.group_id,
          placeholder: "请选择权限组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("group_id", e)
        }, r.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.name);
        }))}
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "地址或IP",
            value: e.host,
            onChange: e => this.formChange("host", e.target.value)
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"监听地址"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "地址或IP默认为0.0.0.0",
            value: e.listen_ip,
            onChange: e => this.formChange("listen_ip", e.target.value)
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"连接端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "用户连接端口",
            value: e.port,
            onChange: e => {
              this.formChange("port", e.target.value);
            }
          })}
                        </div>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"服务端口"}</label>
                            {y.a.createElement(s["a"], {
            placeholder: "服务端开放端口",
            value: e.server_port,
            onChange: e => {
              this.formChange("server_port", e.target.value);
            }
          })}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"form-group col-md-6 col-xs-12"}>
                            <label>{"节点协议"}</label>
                            {y.a.createElement(N["a"], {
            value: e.protocol,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("protocol", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "anytls"
          }, "AnyTLS"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "hysteria2"
          }, "Hysteria2"), y.a.createElement(N["a"].Option, {
            key: 2,
            value: "shadowsocks"
          }, "Shadowsocks"), y.a.createElement(N["a"].Option, {
            key: 3,
            value: "trojan"
          }, "Trojan"), y.a.createElement(N["a"].Option, {
            key: 4,
            value: "tuic"
          }, "Tuic"), y.a.createElement(N["a"].Option, {
            key: 5,
            value: "vless"
          }, "VLess"), y.a.createElement(N["a"].Option, {
            key: 6,
            value: "vmess"
          }, "VMess"))}
                        </div>
                        {e.protocol != null && e.protocol != "shadowsocks" && <div className={"form-group col-md-6 col-xs-12"}>
                                <label>
                                    {"安全性 "}
                                    {(parseInt(e.tls) != 0 || e.protocol == "hysteria2" || e.protocol == "trojan" || e.protocol == "tuic") && <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑安全性配置", "tls_settings")}>
                                            {"编辑配置"}
                                        </a>}
                                </label>
                                {y.a.createElement(N["a"], {
            value: parseInt(e.tls) || (e.protocol == "hysteria2" || e.protocol == "trojan" || e.protocol == "tuic" ? 1 : 0),
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("tls", e)
          }, (e.protocol == "vless" || e.protocol == "vmess") && y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "无"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "TLS"), (e.protocol == "vless" || e.protocol == "anytls") && y.a.createElement(N["a"].Option, {
            key: 2,
            value: 2
          }, "Reality"))}
                            </div>}
                    </div>
                    {e.protocol == "shadowsocks" && <div className={"row"}>
                            <div className={"form-group col-md-12 col-xs-12"}>
                                <label>
                                    {"传输协议 "}
                                    <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑协议配置", "network_settings")}>
                                        {"编辑配置"}
                                    </a>
                                </label>
                                {y.a.createElement(N["a"], {
            value: e.network ?? "tcp",
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, y.a.createElement(N["a"].Option, {
            value: "tcp"
          }, "TCP"), y.a.createElement(N["a"].Option, {
            value: "http"
          }, "HTTP伪装"))}
                            </div>
                        </div>}
                    {e.protocol != null && e.protocol != "hysteria2" && e.protocol != "shadowsocks" && e.protocol != "tuic" && <div className={"row"}>
                                <div className={"form-group col-md-12 col-xs-12"}>
                                    <label>
                                        {"传输协议 "}
                                        <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑协议配置", "network_settings")}>
                                            {"编辑配置"}
                                        </a>
                                    </label>
                                    {y.a.createElement(N["a"], {
            value: e.network ?? "tcp",
            placeholder: "选择传输协议",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("network", e)
          }, y.a.createElement(N["a"].Option, {
            value: "tcp"
          }, "TCP"), y.a.createElement(N["a"].Option, {
            value: "ws"
          }, "WebSocket"), y.a.createElement(N["a"].Option, {
            value: "grpc"
          }, "gRPC"), e.protocol != "trojan" && y.a.createElement(N["a"].Option, {
            value: "httpupgrade"
          }, "HTTPUpgrade"), e.protocol != "trojan" && y.a.createElement(N["a"].Option, {
            value: "xhttp"
          }, "XHTTP"))}
                                </div>
                            </div>}
                    {e.network != null && (e.network == "xhttp" || e.network == "ws" || e.network == "grpc") && <div className={"form-group"}>
                                <label>{"信任的XFF头部(获取真实IP)"}</label>
                                {y.a.createElement(N["a"], {
          mode: "tags",
          value: e.trusted_x_forwarded_for || [],
          style: {
            width: "100%"
          },
          placeholder: "常见头部:X-Forwarded-For CF-Connecting-IP X-Real-IP",
          onChange: e => this.formChange("trusted_x_forwarded_for", e.length > 0 ? e : null)
        })}
                            </div>}
                    {e.protocol == "anytls" && <div className={"row"}>
                            <div className={"form-group col-md-12 col-xs-12"}>
                                <label>
                                    <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑填充方案", "padding_scheme")}>
                                        {"编辑填充方案"}
                                    </a>
                                </label>
                            </div>
                        </div>}
                    {e.protocol == "hysteria2" && <div className={"row"}>
                            <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"混淆方式obfs"}</label>
                                {y.a.createElement(N["a"], {
            value: e.obfs,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("obfs", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "salamander"
          }, "salamander"))}
                            </div>
                            {e.obfs === "salamander" && <div className={"form-group col-md-6 col-xs-12"}>
                                    <label>{"混淆密码obfs_password"}</label>
                                    {y.a.createElement(s["a"], {
            value: e.obfs_password,
            placeholder: "留空自动生成",
            onChange: e => this.formChange("obfs_password", e.target.value)
          })}
                                </div>}
                        </div>}
                    {e.protocol == "hysteria2" && <div className={"form-group"}>
                            <label>{"上行带宽"}</label>
                            {y.a.createElement(s["a"], {
          addonAfter: "Mbps",
          placeholder: "服务端发送带宽,留空或填0使用BBR",
          value: e.up_mbps,
          onChange: e => this.formChange("up_mbps", e.target.value)
        })}
                        </div>}
                    {e.protocol == "hysteria2" && <div className={"form-group"}>
                            <label>{"下行带宽"}</label>
                            {y.a.createElement(s["a"], {
          addonAfter: "Mbps",
          placeholder: "服务端接收带宽,留空或填0使用BBR",
          value: e.down_mbps,
          onChange: e => this.formChange("down_mbps", e.target.value)
        })}
                        </div>}
                    {e.protocol == "tuic" && <div className={"row"}>
                            <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"禁用SNI"}</label>
                                {y.a.createElement(N["a"], {
            value: parseInt(e.disable_sni) ? 1 : 0,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("disable_sni", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                            </div>
                            <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"数据包中继模式"}</label>
                                {y.a.createElement(N["a"], {
            value: e.udp_relay_mode ? e.udp_relay_mode : "native",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("udp_relay_mode", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "native"
          }, "native"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "quic"
          }, "quic"))}
                            </div>
                        </div>}
                    {e.protocol == "tuic" && <div className={"row"}>
                            <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"拥塞控制算法"}</label>
                                {y.a.createElement(N["a"], {
            value: e.congestion_control ? e.congestion_control : "cubic",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("congestion_control", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: "cubic"
          }, "cubic"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: "new_reno"
          }, "new_reno"), y.a.createElement(N["a"].Option, {
            key: 2,
            value: "bbr"
          }, "bbr"))}
                            </div>
                            <div className={"form-group col-md-6 col-xs-12"}>
                                <label>{"客户端启用 0-RTT"}</label>
                                {y.a.createElement(N["a"], {
            value: parseInt(e.zero_rtt_handshake) ? 1 : 0,
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("zero_rtt_handshake", e)
          }, y.a.createElement(N["a"].Option, {
            key: 0,
            value: 0
          }, "否"), y.a.createElement(N["a"].Option, {
            key: 1,
            value: 1
          }, "是"))}
                            </div>
                        </div>}
                    {e.protocol == "shadowsocks" && <div className={"form-group"}>
                            <label>{"加密算法"}</label>
                            {y.a.createElement(N["a"], {
          value: e.cipher ?? "aes-128-gcm",
          onChange: e => this.formChange("cipher", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: "aes-128-gcm"
        }, "aes-128-gcm"), y.a.createElement(N["a"].Option, {
          value: "aes-192-gcm"
        }, "aes-192-gcm"), y.a.createElement(N["a"].Option, {
          value: "aes-256-gcm"
        }, "aes-256-gcm"), y.a.createElement(N["a"].Option, {
          value: "chacha20-ietf-poly1305"
        }, "chacha20-ietf-poly1305"), y.a.createElement(N["a"].Option, {
          value: "2022-blake3-aes-128-gcm"
        }, "2022-blake3-aes-128-gcm"), y.a.createElement(N["a"].Option, {
          value: "2022-blake3-aes-256-gcm"
        }, "2022-blake3-aes-256-gcm"))}
                        </div>}
                    {e.protocol == "vless" && <div className={"row"}>
                            <div className={"form-group col-md-12 col-xs-12"}>
                                <label>
                                    {"加密方式 "}
                                    {e.encryption && <a href={"javascript:void(0);"} onClick={() => this.showChildDrawer("编辑加密配置", "encryption_settings")}>
                                            {"编辑配置"}
                                        </a>}
                                </label>
                                {y.a.createElement(N["a"], {
            value: e.encryption,
            placeholder: "选择加密方式",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("encryption", e)
          }, y.a.createElement(N["a"].Option, {
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            value: "mlkem768x25519plus"
          }, "MLKEM768X25519PLUS"))}
                            </div>
                        </div>}
                    {e.protocol == "vless" && <div className={"row"}>
                            <div className={"form-group col-md-12 col-xs-12"}>
                                <label>{"XTLS流控算法"}</label>
                                {y.a.createElement(N["a"], {
            value: e.flow,
            placeholder: "选择XTLS流控算法",
            style: {
              width: "100%"
            },
            onChange: e => this.formChange("flow", e)
          }, y.a.createElement(N["a"].Option, {
            value: null
          }, "无"), y.a.createElement(N["a"].Option, {
            value: "xtls-rprx-vision"
          }, "xtls-rprx-vision"))}
                            </div>
                        </div>}
                    <div className={"form-group"}>
                        <label>
                            {y.a.createElement(u["a"], {
            placement: "top"
          }, "父节点 ", <a target={"_blank"} href={"https://docs.v2board.com/use/node.html#父节点与子节点关系"} rel={"noreferrer"}>
                                    {"更多解答"}
                                </a>)}
                        </label>
                        {y.a.createElement(N["a"], {
          value: e.parent_id || "",
          onChange: e => this.formChange("parent_id", e),
          style: {
            width: "100%"
          }
        }, y.a.createElement(N["a"].Option, {
          value: ""
        }, "无"), n.map(t => {
          if ("v2node" === t.type && t.id !== e.id) return y.a.createElement(N["a"].Option, {
            key: Math.random(),
            value: t.id
          }, t.name);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"路由组"}</label>
                        {y.a.createElement(N["a"], {
          mode: "multiple",
          value: e.route_id || [],
          placeholder: "请选择路由组",
          style: {
            width: "100%"
          },
          onChange: e => this.formChange("route_id", e.length > 0 ? e : null)
        }, i.map(e => {
          return y.a.createElement(N["a"].Option, {
            key: e.id
          }, e.remarks);
        }))}
                    </div>
                    <div className={"form-group"}>
                        <label>{"一键安装指令"}</label>
                        {y.a.createElement(s["a"].TextArea, {
          value: e.install_command,
          rows: 4,
          readOnly: true,
          style: {
            backgroundColor: "#f5f5f5a0",
            cursor: "text"
          }
        })}
                    </div>
                </div>, <div className={"v2board-drawer-action"}>
                    {y.a.createElement(l["a"], {
        style: {
          marginRight: 8
        },
        onClick: () => this.onShow()
      }, "取消")}
                    {y.a.createElement(l["a"], {
        loading: t,
        onClick: () => this.save(),
        type: "primary"
      }, "提交")}
                </div>, y.a.createElement(R["a"], {
      closable: !1,
      id: "server",
      width: "80%",
      title: this.state.childDrawer.title,
      visible: this.state.childDrawer.visible,
      onClose: () => this.showChildDrawer()
    }, this.renderChildDrawer())));
  }
}
var mV2node = Object(_["c"])(e => {
  var t = e.serverV2node,
    n = e.serverGroup,
    r = e.serverManage,
    i = e.serverRoute;
  return {
    serverV2node: t,
    serverGroup: n,
    serverManage: r,
    serverRoute: i
  };
})(wV2node);
class q extends y.a.Component {
  constructor(e) {
    super(e), this.state = {
      searchKey: void 0,
      sortMode: !0,
      pageSize: Object(L["e"])("server_manage_page_size") || 10
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "serverManage/getNodes"
    }), this.props.dispatch({
      type: "serverGroup/fetch"
    }), this.props.dispatch({
      type: "serverRoute/fetch"
    });
  }
  getTypeTag(e, t) {
    switch (e) {
      case "shadowsocks":
        return y.a.createElement(g["a"], {
          color: "#489851"
        }, t);
      case "vmess":
        return y.a.createElement(g["a"], {
          color: "#CB3180"
        }, t);
      case "trojan":
        return y.a.createElement(g["a"], {
          color: "#EAB854"
        }, t);
      case "hysteria":
        return y.a.createElement(g["a"], {
          color: "#1A1A1A"
        }, t);
      case "tuic":
        return y.a.createElement(g["a"], {
          color: "#9400D3"
        }, t);
      case "vless":
        return y.a.createElement(g["a"], {
          color: "#4080FF"
        }, t);
      case "anytls":
        return y.a.createElement(g["a"], {
          color: "#FF8C00"
        }, t);
      case "v2node":
        return y.a.createElement(g["a"], {
          color: "#FF0000"
        }, t);
    }
  }
  getDispatchTypeByType(e, t) {
    switch (e) {
      case "shadowsocks":
        return "serverShadowsocks/".concat(t);
      case "vmess":
        return "serverVmess/".concat(t);
      case "trojan":
        return "serverTrojan/".concat(t);
      case "hysteria":
        return "serverHysteria/".concat(t);
      case "tuic":
        return "serverTuic/".concat(t);
      case "vless":
        return "serverVless/".concat(t);
      case "anytls":
        return "serverAnyTLS/".concat(t);
      case "v2node":
        return "serverV2node/".concat(t);
    }
  }
  copy(e) {
    this.props.dispatch({
      type: this.getDispatchTypeByType(e.type, "copy"),
      id: e.id
    });
  }
  update(e, t, n) {
    this.props.dispatch({
      type: this.getDispatchTypeByType(e.type, "update"),
      id: e.id,
      key: t,
      value: n
    });
  }
  drop(e) {
    this.props.dispatch({
      type: this.getDispatchTypeByType(e.type, "drop"),
      id: e.id
    });
  }
  render() {
    var e,
      t,
      n,
      r,
      v,
      _ = this.props.serverManage,
      E = _.servers,
      O = _.fetchLoading,
      A = _.sortMode,
      R = this.props.serverGroup.groups,
      N = this.state.searchKey,
      D = {
        0: "error",
        1: "warning",
        2: "processing"
      },
      I = (e, t) => y.a.createElement(d["a"], {
        trigger: "click",
        overlay: y.a.createElement(p["a"], null, y.a.createElement(p["a"].Item, {
          onContextMenu: e => {
            e.stopPropagation();
          }
        }, "shadowsocks" === e.type && y.a.createElement(w["a"], {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>), "vmess" === e.type && y.a.createElement(k["a"], {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>), "trojan" === e.type && y.a.createElement(C["a"], {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>), "hysteria" === e.type && <W key={e.id} record={e}>
                                        <a>
                                            {y.a.createElement(m["a"], {
              type: "edit"
            })}
                                            {" 编辑"}
                                        </a>
                                    </W>, "tuic" === e.type && y.a.createElement(mTuic, {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>), "vless" === e.type && <G key={e.id} record={e}>
                                        <a>
                                            {y.a.createElement(m["a"], {
              type: "edit"
            })}
                                            {" 编辑"}
                                        </a>
                                    </G>, "anytls" === e.type && y.a.createElement(mAnyTLS, {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>), "v2node" === e.type && y.a.createElement(mV2node, {
          key: e.id,
          record: e
        }, <a>
                                            {y.a.createElement(m["a"], {
            type: "edit"
          })}
                                            {" 编辑"}
                                        </a>)), y.a.createElement(p["a"].Item, {
          onClick: () => this.copy(e)
        }, y.a.createElement(m["a"], {
          type: "copy"
        }), " 复制"), y.a.createElement(p["a"].Item, {
          style: {
            color: "#ff4d4f"
          },
          onClick: () => this.drop(e)
        }, y.a.createElement(m["a"], {
          type: "delete"
        }), " 删除"))
      }, t || <a href={"javascript:void(0);"}>
                            {"操作 "}
                            {y.a.createElement(m["a"], {
          type: "caret-down"
        })}
                        </a>),
      $ = [{
        title: "节点ID",
        dataIndex: "id",
        key: "id",
        width: 150,
        filters: ["V2node", "Shadowsocks", "Vmess", "Trojan", "Hysteria", "Tuic", "Vless", "AnyTLS"].map(e => ({
          text: e,
          value: e
        })),
        onFilter: (e, t) => t.type === e.toLowerCase(),
        render: (e, t) => {
          return <span>
                                {this.getTypeTag(t.type, t.parent_id ? e + " => " + t.parent_id : e)}
                            </span>;
        }
      }, {
        title: "显隐",
        dataIndex: "show",
        key: "show",
        render: (e, t) => {
          return y.a.createElement(f["a"], {
            size: "small",
            checked: parseInt(e),
            onClick: () => this.update(t, "show", parseInt(e) ? 0 : 1)
          });
        }
      }, {
        title: <span>
                            {y.a.createElement(u["a"], {
            placement: "top",
            title: <div>
                                            {y.a.createElement(h["a"], {
                status: "error"
              })}
                                            {" 未运行"}
                                            <br></br>
                                            {y.a.createElement(h["a"], {
                status: "warning"
              })}
                                            {" 无人使用或服务端上报异常"}
                                            <br></br>
                                            {y.a.createElement(h["a"], {
                status: "processing"
              })}
                                            {" 运行正常"}
                                            <br></br>
                                        </div>
          }, "节点 ", y.a.createElement(m["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "name",
        key: "name",
        render: (e, t) => {
          return y.a.createElement(y.a.Fragment, null, y.a.createElement(h["a"], {
            status: D[t.available_status]
          }), <span>{e}</span>);
        }
      }, {
        title: "地址",
        dataIndex: "host",
        key: "host",
        render: (e, t) => {
          return <span style={{
            cursor: "pointer"
          }} onClick={() => {
            S()(t.host), c["a"].success("复制成功");
          }}>
                                {t.host + ":" + t.port}
                            </span>;
        }
      }, {
        title: <span>
                            {y.a.createElement(u["a"], {
            placement: "top",
            title: "根据服务端上报频率而定"
          }, "人数 ", y.a.createElement(m["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "online",
        key: "online",
        align: "left",
        width: 130,
        sorter: (e, t) => e.online - t.online,
        render: e => {
          return y.a.createElement(y.a.Fragment, null, y.a.createElement(m["a"], {
            type: "user"
          }), " ", e || 0);
        }
      }, {
        title: y.a.createElement(u["a"], {
          placement: "top",
          title: "使用的流量将乘以倍率进行扣除"
        }, "倍率 ", y.a.createElement(m["a"], {
          type: "question-circle"
        })),
        dataIndex: "rate",
        key: "rate",
        align: "center",
        render: e => {
          return y.a.createElement(g["a"], {
            style: {
              minWidth: 60
            }
          }, e + " x");
        }
      }, {
        title: "权限组",
        dataIndex: "group_id",
        key: "group_id",
        filters: R.map(e => ({
          text: e.name,
          value: e.id
        })),
        onFilter: (e, t) => -1 !== t.group_id.indexOf("".concat(e)),
        render: (e, t) => {
          var n = [];
          return t.group_id.map(e => {
            var t = R.find(t => t.id === parseInt(e));
            t && n.push(y.a.createElement(g["a"], null, t.name));
          }), y.a.createElement(y.a.Fragment, null, n);
        }
      }, {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        width: 100,
        render: (e, t, n) => {
          return <div>{I(t)}</div>;
        }
      }],
      F = this;
    return y.a.createElement(b["a"], i()({}, this.props, {
      title: "节点管理"
    }), y.a.createElement(P.a, {
      when: A,
      message: e => {
        return window.confirm("节点排序还没有保存，是否离开");
      }
    }), y.a.createElement(M["a"], {
      loading: O
    }, <div className={"block block-bottom ".concat(T.a.manage)}>
                    <div className={"bg-white"}>
                        <div className={"v2board-table-action"} style={{
          padding: 15
        }}>
                            {y.a.createElement(d["a"], {
            overlay: y.a.createElement(p["a"], null, y.a.createElement(p["a"].Item, null, y.a.createElement(mV2node, {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("v2node", "V2node")}
                                                </a>)), y.a.createElement(p["a"].Item, null, y.a.createElement(w["a"], {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("shadowsocks", "Shadowsocks")}
                                                </a>)), y.a.createElement(p["a"].Item, null, y.a.createElement(k["a"], {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("vmess", "VMess")}
                                                </a>)), y.a.createElement(p["a"].Item, null, y.a.createElement(C["a"], {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("trojan", "Trojan")}
                                                </a>)), y.a.createElement(p["a"].Item, null, <W key={Math.random()}>
                                                <a>
                                                    {this.getTypeTag("hysteria", "Hysteria")}
                                                </a>
                                            </W>), y.a.createElement(p["a"].Item, null, y.a.createElement(mTuic, {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("tuic", "Tuic")}
                                                </a>)), y.a.createElement(p["a"].Item, null, <G key={Math.random()}>
                                                <a>
                                                    {this.getTypeTag("vless", "VLess")}
                                                </a>
                                            </G>), y.a.createElement(p["a"].Item, null, y.a.createElement(mAnyTLS, {
              key: Math.random()
            }, <a>
                                                    {this.getTypeTag("anytls", "AnyTLS")}
                                                </a>)))
          }, y.a.createElement(l["a"], null, y.a.createElement(m["a"], {
            type: "plus"
          })))}
                            {y.a.createElement(s["a"], {
            placeholder: "输入任意关键字搜索",
            style: {
              width: 200
            },
            className: "ml-2",
            onChange: e => this.setState({
              searchKey: e.target.value
            })
          })}
                            {!Object(L["f"])() && y.a.createElement(l["a"], {
            style: {
              float: "right"
            },
            type: "primary",
            onClick: () => {
              A ? this.props.dispatch({
                type: "serverManage/saveSort"
              }) : this.props.dispatch({
                type: "serverManage/setState",
                payload: {
                  sortMode: !0
                }
              });
            }
          }, A ? "保存排序" : "编辑排序")}
                        </div>
                        {Object(L["f"])() ? y.a.createElement(o["a"], {
          className: "v2board-table",
          itemLayout: "vertical",
          dataSource: N ? E.filter(e => -1 !== JSON.stringify(e).indexOf(N)) : E,
          renderItem: e => y.a.createElement(o["a"].Item, {
            className: "v2board_node_mobile ".concat(e.parent_id ? "child_node" : ""),
            actions: [y.a.createElement(y.a.Fragment, null, this.getTypeTag(e.type, e.parent_id ? e.id + " => " + e.parent_id : e.id), y.a.createElement(g["a"], null, y.a.createElement(m["a"], {
              type: "user"
            }), " ", e.online || 0), y.a.createElement(g["a"], null, e.rate, " x"))],
            extra: y.a.createElement(y.a.Fragment, null, y.a.createElement(f["a"], {
              size: "small",
              checked: parseInt(e.show),
              onClick: () => this.update(e, "show", parseInt(e.show) ? 0 : 1)
            }), y.a.createElement(a["a"], {
              type: "vertical"
            }), <span>{I(e)}</span>)
          }, y.a.createElement(o["a"].Item.Meta, {
            title: y.a.createElement(y.a.Fragment, null, y.a.createElement(h["a"], {
              status: D[e.available_status]
            }), e.name),
            description: "".concat(e.host, ":").concat(e.port)
          }))
        }) : y.a.createElement(x["a"], {
          onDragEnd: (e, t) => {
            console.log(e, t), F.props.dispatch({
              type: "serverManage/sort",
              fromIndex: e,
              toIndex: t
            });
          },
          nodeSelector: "tr",
          handleSelector: "i"
        }, y.a.createElement(j["a"], {
          onContextMenu: e => {
            this.record = e, this.forceUpdate();
          },
          disableRightClick: A,
          tableLayout: "auto",
          dataSource: N ? E.filter(e => -1 !== JSON.stringify(e).indexOf(N)) : E,
          columns: A ? [{
            title: "排序",
            dataIndex: "sort",
            key: "sort",
            align: "left",
            width: 100,
            render: (e, t, n) => {
              return <div>
                                                                    {y.a.createElement(m["a"], {
                  type: "menu",
                  style: {
                    cursor: "move"
                  },
                  title: "拖动排序"
                })}
                                                                </div>;
            }
          }, {
            title: "节点ID",
            dataIndex: "id",
            key: "id",
            width: 150,
            render: (e, t) => {
              return <span>
                                                                    {this.getTypeTag(t.type, t.parent_id ? e + " => " + t.parent_id : e)}
                                                                </span>;
            }
          }, {
            title: "节点",
            dataIndex: "name",
            key: "name"
          }] : $,
          pagination: !A && {
            pageSize: this.state.pageSize,
            pageSizeOptions: ["10", "50", "100", "500"],
            showSizeChanger: !0,
            onShowSizeChange: (e, t) => {
              this.setState({
                pageSize: t
              }, () => {
                Object(L["j"])("server_manage_page_size", t);
              });
            }
          },
          scroll: {
            x: 1300
          },
          rowClassName: e => e.parent_id ? "child_node" : ""
        }, <ul className={"ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"}>
                                          <li className={"ant-dropdown-menu-item"}>
                                              {"shadowsocks" === (null === (e = this.record) || void 0 === e ? void 0 : e.type) && y.a.createElement(w["a"], {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"vmess" === (null === (t = this.record) || void 0 === t ? void 0 : t.type) && y.a.createElement(k["a"], {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"trojan" === (null === (n = this.record) || void 0 === n ? void 0 : n.type) && y.a.createElement(C["a"], {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"tuic" === (null === (r = this.record) || void 0 === r ? void 0 : r.type) && y.a.createElement(mTuic, {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"anytls" === (null === (r = this.record) || void 0 === r ? void 0 : r.type) && y.a.createElement(mAnyTLS, {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"v2node" === (null === (r = this.record) || void 0 === r ? void 0 : r.type) && y.a.createElement(mV2node, {
              key: Math.random(),
              record: this.record
            }, <a>
                                                          {y.a.createElement(m["a"], {
                type: "form"
              })}
                                                          {" 编辑"}
                                                      </a>)}
                                              {"hysteria" === (null === (r = this.record) || void 0 === r ? void 0 : r.type) && <W key={Math.random()} record={this.record}>
                                                      <a>
                                                          {y.a.createElement(m["a"], {
                  type: "form"
                })}
                                                          {" 编辑"}
                                                      </a>
                                                  </W>}
                                              {"vless" === (null === (v = this.record) || void 0 === v ? void 0 : v.type) && <G key={Math.random()} record={this.record}>
                                                      <a>
                                                          {y.a.createElement(m["a"], {
                  type: "form"
                })}
                                                          {" 编辑"}
                                                      </a>
                                                  </G>}
                                          </li>
                                          <li onClick={() => this.copy(this.record)} className={"ant-dropdown-menu-item"}>
                                              <a>
                                                  {y.a.createElement(m["a"], {
                type: "copy"
              })}
                                                  {" 复制"}
                                              </a>
                                          </li>
                                          <li onClick={() => this.drop(this.record)} className={"ant-dropdown-menu-item"}>
                                              <a style={{
              color: "#ff4d4f"
            }}>
                                                  {y.a.createElement(m["a"], {
                type: "delete"
              })}
                                                  {" 删除"}
                                              </a>
                                          </li>
                                      </ul>))}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(_["c"])(e => {
  var t = e.serverManage,
    n = e.serverGroup;
  return {
    serverManage: t,
    serverGroup: n
  };
})(q);

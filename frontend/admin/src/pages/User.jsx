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
  o = require("../vendor/modules/70307045.js"),
  a = interopDefault(o),
  s = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  l = (require("../vendor/modules/71566450.js"), require("../vendor/modules/6a73432b.js")),
  c = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/42764b73.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  h = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/6d723332.js")),
  f = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  d = (require("../vendor/modules/41776870.js"), require("../vendor/modules/4b725473.js")),
  p = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  m = require("../vendor/modules/71317449.js"),
  g = interopDefault(m),
  v = require("../layouts/MainLayout.jsx"),
  y = require("../vendor/modules/6d615643.js"),
  b = require("../vendor/modules/77642f52.js"),
  w = interopDefault(b),
  x = require("../vendor/routerHistory.js"),
  _ = interopDefault(x),
  E = require("../vendor/reactRedux.js"),
  S = require("../vendor/modules/6d43642f.js"),
  k = require("../components/Recovered_43674f62.jsx"),
  C = require("../vendor/modules/79694f36.js"),
  O = require("../components/Recovered_68566c61.jsx"),
  T = require("../vendor/modules/51673471.js"),
  L = require("../vendor/siteHelpers.js"),
  A = require("../components/Recovered_4f613657.jsx"),
  P = require("../vendor/modules/76333265.js"),
  j = require("../vendor/modules/58307135.js");
class M extends g.a.Component {
  constructor(e) {
    super(e), this.state = {
      sorter: {},
      visible: !1
    };
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: "user/empty"
    }), this.props.dispatch({
      type: "user/setState",
      payload: {
        filter: []
      }
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: "plan/fetch"
    }), this.props.dispatch({
      type: "user/fetch"
    }), this.props.dispatch({
      type: "serverGroup/fetch"
    });
  }
  tableOnChange(e, t) {
    Object(L["j"])("user_manage_page_size", e.pageSize), this.props.dispatch({
      type: "user/changeTable",
      pagination: e,
      sort: {
        sort_type: "ascend" === t.order ? "ASC" : "DESC",
        sort: t.columnKey
      }
    });
  }
  searchOnChange(e) {
    this.inputDelayTimer && clearTimeout(this.inputDelayTimer), this.inputDelayTimer = setTimeout(function () {
      this.inputDelayTimer = null, this.props.dispatch({
        type: "user/filter",
        filter: {
          email: e
        },
        pagination: {
          current: 1
        }
      });
    }.bind(this), 400);
  }
  dumpCSV() {
    this.props.dispatch({
      type: "user/dumpCSV"
    });
  }
  ban() {
    p["a"].confirm({
      title: "提醒",
      content: "确定要进行封禁吗？",
      onOk: () => {
        this.props.dispatch({
          type: "user/ban"
        });
      }
    });
  }
  allDel() {
    p["a"].confirm({
      title: "提醒",
      content: "确定要进行删除吗？",
      onOk: () => {
        this.props.dispatch({
          type: "user/allDel"
        });
      }
    });
  }
  userFilter(e, t, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    this.props.dispatch({
      type: "user/addFilter",
      key: e,
      condition: t,
      value: n,
      clear: r
    });
  }
  orderFilter(e, t, n) {
    this.props.dispatch({
      type: "order/addFilter",
      key: e,
      condition: t,
      value: n
    }), _.a.push("/order");
  }
  resetSecret(e) {
    var t = this;
    p["a"].confirm({
      title: "重置安全信息",
      content: "确定要重置".concat(e.email, "的安全信息吗？"),
      onOk() {
        t.props.dispatch({
          type: "user/resetSecret",
          id: e.id
        });
      },
      okText: "确定",
      cancelText: "取消"
    });
  }
  delUser(e) {
    var t = this;
    p["a"].confirm({
      title: "删除用户",
      content: "确定要删除".concat(e.email, "的用户信息吗？"),
      onOk() {
        t.props.dispatch({
          type: "user/delUser",
          id: e.id
        });
      },
      okText: "确定",
      cancelText: "取消"
    });
  }
  render() {
    var e,
      t,
      n,
      r,
      o,
      p,
      m = this.props.user,
      b = m.users,
      x = m.pagination,
      _ = m.fetchLoading,
      E = m.filter,
      M = this.props.serverGroup.groups,
      R = this.props.plan.plans,
      N = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: !0
      }, {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        render: (e, t) => {
          return g.a.createElement(f["a"], {
            placement: "top",
            title: t.t ? "最后在线".concat(w()(1e3 * t.t).format("YYYY-MM-DD HH:mm:ss")) : "从未在线"
          }, g.a.createElement(d["a"], {
            status: new Date().getTime() / 1e3 - 600 > t.t ? "default" : "success"
          }), e);
        }
      }, {
        title: "状态",
        dataIndex: "banned",
        key: "banned",
        sorter: !0,
        render: e => {
          return g.a.createElement(h["a"], {
            color: e ? "red" : "green"
          }, e ? "封禁" : "正常");
        }
      }, {
        title: "订阅",
        dataIndex: "plan_name",
        key: "plan_id",
        sorter: !0,
        render: e => {
          return e || "-";
        }
      }, {
        title: "权限组",
        dataIndex: "group_id",
        key: "group_id",
        sorter: !0,
        render: e => {
          var t = M.find(t => t.id === e);
          return t ? t.name : "-";
        }
      }, {
        title: "已用(G)",
        dataIndex: "total_used",
        key: "total_used",
        sorter: !0,
        render: (e, t) => {
          return g.a.createElement(h["a"], {
            color: parseFloat(e) > parseFloat(t.transfer_enable) ? "red" : "green"
          }, e);
        }
      }, {
        title: "流量(G)",
        dataIndex: "transfer_enable",
        key: "transfer_enable",
        sorter: !0,
        render: (e, t) => {
          return e;
        }
      }, {
        title: "设备数",
        dataIndex: "device_limit",
        key: "updated_at",
        sorter: (e, t) => e.alive_ip - t.alive_ip,
        render: (e, t) => {
          var deviceCount = t.alive_ip !== null ? t.alive_ip : 0;
          var deviceLimit = t.device_limit !== null ? t.device_limit : "∞";
          return t.ips ? g.a.createElement(f["a"], {
            placement: "top",
            title: t.ips
          }, `${deviceCount} / ${deviceLimit}`) : `${deviceCount} / ${deviceLimit}`;
        }
      }, {
        title: "到期时间",
        dataIndex: "expired_at",
        key: "expired_at",
        sorter: !0,
        render: e => {
          return g.a.createElement(h["a"], {
            color: e < new Date().getTime() / 1e3 && null !== e ? "red" : "green"
          }, e ? w()(1e3 * e).format("YYYY/MM/DD HH:mm") : null === e ? "长期有效" : "-");
        }
      }, {
        title: "余额",
        dataIndex: "balance",
        key: "balance",
        sorter: !0
      }, {
        title: "佣金",
        dataIndex: "commission_balance",
        key: "commission_balance",
        sorter: !0
      }, {
        title: "加入时间",
        dataIndex: "created_at",
        key: "created_at",
        sorter: !0,
        render: e => {
          return w()(1e3 * e).format("YYYY/MM/DD HH:mm");
        }
      }, {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t, n) => {
          return g.a.createElement(g.a.Fragment, null, g.a.createElement(l["a"], {
            trigger: "click",
            overlay: g.a.createElement(c["a"], null, g.a.createElement(c["a"].Item, {
              onContextMenu: e => {
                e.stopPropagation();
              }
            }, g.a.createElement(k["a"], {
              userId: t.id,
              key: t.id
            }, <a>
                                                    {g.a.createElement(u["a"], {
                type: "edit"
              })}
                                                    {" 编辑"}
                                                </a>)), g.a.createElement(c["a"].Item, {
              onContextMenu: e => {
                e.stopPropagation();
              }
            }, g.a.createElement(S["a"], {
              email: t.email,
              key: t.email
            }, <a>
                                                    {g.a.createElement(u["a"], {
                type: "plus"
              })}
                                                    {" 分配订单"}
                                                </a>)), g.a.createElement(c["a"].Item, null, <a onClick={() => Object(L["a"])(t.subscribe_url)}>
                                                {g.a.createElement(u["a"], {
                type: "copy"
              })}
                                                {" 复制订阅URL"}
                                            </a>), g.a.createElement(c["a"].Item, null, <a onClick={() => this.resetSecret(t)}>
                                                {g.a.createElement(u["a"], {
                type: "reload"
              })}
                                                {" 重置UUID及订阅URL"}
                                            </a>), g.a.createElement(c["a"].Item, {
              onClick: () => this.orderFilter("user_id", "=", t.id)
            }, <a>
                                                {g.a.createElement(u["a"], {
                type: "account-book"
              })}
                                                {" TA的订单"}
                                            </a>), g.a.createElement(c["a"].Item, {
              onClick: () => this.userFilter("invite_user_id", "=", t.id, !0)
            }, <a>
                                                {g.a.createElement(u["a"], {
                type: "usergroup-add"
              })}
                                                {" TA的邀请"}
                                            </a>), g.a.createElement(c["a"].Item, {
              onContextMenu: e => {
                e.stopPropagation();
              }
            }, g.a.createElement(j["a"], {
              userId: null === t || void 0 === t ? void 0 : t.id,
              key: null === t || void 0 === t ? void 0 : t.email
            }, <a>
                                                    {g.a.createElement(u["a"], {
                type: "solution"
              })}
                                                    {" TA的流量记录"}
                                                </a>)), g.a.createElement(c["a"].Item, null, <a onClick={() => this.delUser(t)}>
                                                {g.a.createElement(u["a"], {
                type: "delete"
              })}
                                                {" 删除用户"}
                                            </a>))
          }, <a href={"javascript:void(0);"}>
                                    {"操作 "}
                                    {g.a.createElement(u["a"], {
              type: "caret-down"
            })}
                                </a>));
        }
      }];
    return g.a.createElement(v["a"], i()({}, this.props, {
      title: "用户管理"
    }), g.a.createElement(P["a"], {
      loading: _
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div className={"v2board-table-action"} style={{
          padding: 15
        }}>
                            {g.a.createElement(f["a"], {
            title: "Tips：可以使用过滤器过滤后再使用操作对过滤的用户进行操作。",
            placement: "right"
          }, g.a.createElement(C["a"], null, g.a.createElement(O["a"], {
            key: E.length,
            value: E,
            onOk: e => this.props.dispatch({
              type: "user/filter",
              filter: e
            }),
            keys: [{
              key: "email",
              title: "邮箱",
              condition: ["模糊"]
            }, {
              key: "id",
              title: "用户ID",
              condition: ["=", ">=", ">", "<", "<="]
            }, {
              key: "plan_id",
              title: "订阅",
              condition: ["="],
              type: "select",
              options: [{
                key: "无订阅",
                value: "null"
              }, ...R.map(e => ({
                key: e.name,
                value: e.id
              }))]
            }, {
              key: "transfer_enable",
              title: "流量",
              condition: [">=", ">", "<", "<="]
            }, {
              key: "d",
              title: "下行",
              condition: [">=", ">", "<", "<="]
            }, {
              key: "expired_at",
              title: "到期时间",
              condition: [">=", ">", "<", "<="],
              type: "date"
            }, {
              key: "uuid",
              title: "UUID",
              condition: ["="]
            }, {
              key: "token",
              title: "TOKEN",
              condition: ["="]
            }, {
              key: "banned",
              title: "账号状态",
              condition: ["="],
              type: "select",
              options: [{
                key: "正常",
                value: 0
              }, {
                key: "封禁",
                value: 1
              }]
            }, {
              key: "invite_by_email",
              title: "邀请人邮箱",
              condition: ["模糊"]
            }, {
              key: "invite_user_id",
              title: "邀请人ID",
              condition: ["="]
            }, {
              key: "remarks",
              title: "备注",
              condition: ["模糊"]
            }, {
              key: "is_admin",
              title: "管理员",
              condition: ["="],
              type: "select",
              options: [{
                key: "是",
                value: 1
              }, {
                key: "否",
                value: 0
              }]
            }]
          }, g.a.createElement(s["a"], {
            type: E.length > 0 ? "primary" : ""
          }, g.a.createElement(u["a"], {
            type: "filter"
          }), " 过滤器")), g.a.createElement(l["a"], {
            overlay: g.a.createElement(c["a"], null, g.a.createElement(c["a"].Item, null, <a onClick={() => this.dumpCSV()}>
                                                        {g.a.createElement(u["a"], {
                type: "file-excel"
              })}
                                                        {" 导出CSV"}
                                                    </a>), g.a.createElement(c["a"].Item, null, g.a.createElement(y["a"], null, <a>
                                                            {g.a.createElement(u["a"], {
                type: "mail"
              })}
                                                            {" 发送邮件"}
                                                        </a>)), g.a.createElement(c["a"].Item, {
              disabled: !E.length
            }, <a disabled={!E.length} onClick={() => this.ban()}>
                                                        {g.a.createElement(u["a"], {
                type: "stop"
              })}
                                                        {" 批量封禁"}
                                                    </a>), g.a.createElement(c["a"].Item, {
              disabled: !E.length
            }, <a disabled={!E.length} onClick={() => this.allDel()}>
                                                        {g.a.createElement(u["a"], {
                type: "delete"
              })}
                                                        {" 批量删除"}
                                                    </a>))
          }, g.a.createElement(s["a"], null, g.a.createElement(u["a"], {
            type: "select"
          }), "操作"))))}
                            {g.a.createElement(T["a"], null, g.a.createElement(s["a"], {
            className: "ml-2"
          }, g.a.createElement(u["a"], {
            type: "user-add"
          })))}
                        </div>
                        {g.a.createElement(A["a"], {
          onContextMenu: e => {
            this.record = e, this.forceUpdate();
          },
          className: "v2board-table",
          tableLayout: "auto",
          dataSource: b,
          pagination: a()({}, x, {
            size: "small",
            showSizeChanger: !0,
            pageSizeOptions: [10, 50, 100, 150]
          }),
          columns: N,
          scroll: {
            x: 1500
          },
          onChange: (e, t, n) => this.tableOnChange(e, n)
        }, <ul className={"ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"}>
                                <li className={"ant-dropdown-menu-item"}>
                                    {g.a.createElement(k["a"], {
              userId: null === (e = this.record) || void 0 === e ? void 0 : e.id,
              key: null === (t = this.record) || void 0 === t ? void 0 : t.id
            }, <a>
                                            {g.a.createElement(u["a"], {
                type: "edit"
              })}
                                            {" 编辑"}
                                        </a>)}
                                </li>
                                <li className={"ant-dropdown-menu-item"}>
                                    {g.a.createElement(S["a"], {
              email: null === (n = this.record) || void 0 === n ? void 0 : n.email,
              key: null === (r = this.record) || void 0 === r ? void 0 : r.email
            }, <a>
                                            {g.a.createElement(u["a"], {
                type: "plus"
              })}
                                            {" 分配订单"}
                                        </a>)}
                                </li>
                                <li className={"ant-dropdown-menu-item"}>
                                    <a onClick={() => {
              var e;
              return Object(L["a"])(null === (e = this.record) || void 0 === e ? void 0 : e.subscribe_url);
            }}>
                                        {g.a.createElement(u["a"], {
                type: "copy"
              })}
                                        {" 复制订阅URL"}
                                    </a>
                                </li>
                                <li className={"ant-dropdown-menu-item"}>
                                    <a style={{
              color: "#ff4d4f"
            }} onClick={() => this.resetSecret(this.record)}>
                                        {g.a.createElement(u["a"], {
                type: "reload"
              })}
                                        {" 重置UUID及订阅URL"}
                                    </a>
                                </li>
                                <li className={"ant-dropdown-menu-item"} onClick={() => {
            var e;
            return this.orderFilter("user_id", "=", null === (e = this.record) || void 0 === e ? void 0 : e.id);
          }}>
                                    <a>
                                        {g.a.createElement(u["a"], {
                type: "account-book"
              })}
                                        {" TA的订单"}
                                    </a>
                                </li>
                                <li className={"ant-dropdown-menu-item"} onClick={() => {
            var e;
            return this.userFilter("invite_user_id", "=", null === (e = this.record) || void 0 === e ? void 0 : e.id, !0);
          }}>
                                    <a>
                                        {g.a.createElement(u["a"], {
                type: "usergroup-add"
              })}
                                        {" TA的邀请"}
                                    </a>
                                </li>
                                <li className={"ant-dropdown-menu-item"}>
                                    {g.a.createElement(j["a"], {
              userId: null === (o = this.record) || void 0 === o ? void 0 : o.id,
              key: null === (p = this.record) || void 0 === p ? void 0 : p.email
            }, <a>
                                            {g.a.createElement(u["a"], {
                type: "solution"
              })}
                                            {" TA的流量记录"}
                                        </a>)}
                                </li>
                                <li className={"ant-dropdown-menu-item"}>
                                    <a onClick={() => this.delUser(this.record)}>
                                        {g.a.createElement(u["a"], {
                type: "delete"
              })}
                                        {" 删除用户"}
                                    </a>
                                </li>
                            </ul>)}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(E["c"])(e => {
  var t = e.user,
    n = e.serverGroup,
    r = e.plan;
  return {
    user: t,
    serverGroup: n,
    plan: r
  };
})(M);

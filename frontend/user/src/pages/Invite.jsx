let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = require("../vendor/modules/70307045.js"),
  a = interopDefault(i),
  s = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  c = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/3353372b.js")),
  u = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  l = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  f = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  p = require("../vendor/modules/71317449.js"),
  d = interopDefault(p),
  h = require("../layouts/MainLayout.jsx"),
  m = require("../vendor/reactRedux.js"),
  v = require("../vendor/modules/2b515243.js"),
  y = interopDefault(v),
  g = (require("../vendor/localeSettings.js"), require("../vendor/modules/77642f52.js")),
  b = interopDefault(g),
  w = require("../vendor/i18n.js"),
  x = (require("../vendor/modules/79786e6e.js"), require("../components/Recovered_45334976.jsx")),
  O = require("../components/Recovered_54643430.jsx");
class E extends d.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "user/getUserInfo"
    }), this.getCommissionDetails(), this.fetchData(), this.props.dispatch({
      type: "comm/config"
    });
  }
  getCommissionDetails() {
    this.props.dispatch({
      type: "invite/details"
    });
  }
  fetchData() {
    this.props.dispatch({
      type: "invite/fetch"
    });
  }
  save() {
    this.props.dispatch({
      type: "invite/save"
    });
  }
  render() {
    var e = this.props.invite,
      t = e.stat,
      n = e.codes,
      r = e.invites,
      i = e.detailsLoading,
      p = e.fetchLoading,
      m = e.saveLoading,
      v = e.detailsPagination,
      g = this.props.comm.config,
      E = this.props.user.userInfo,
      _ = [{
        title: Object(w["formatMessage"])({
          id: "邀请码"
        }),
        dataIndex: "code",
        key: "code",
        render: e => {
          return d.a.createElement(d.a.Fragment, null, <span>{e}</span>, <a style={{
            marginLeft: 5
          }} href={"javascript:void(0);"} onClick={() => {
            y()(window.location.origin + window.location.pathname + "#/register?code=" + e), f["a"].success(Object(w["formatMessage"])({
              id: "复制成功"
            }));
          }}>
                                {Object(w["formatMessage"])({
              id: "复制链接"
            })}
                            </a>);
        }
      }, {
        title: Object(w["formatMessage"])({
          id: "创建时间"
        }),
        dataIndex: "created_at",
        key: "created_at",
        align: "right",
        render: e => {
          return b()(1e3 * e).format("YYYY/MM/DD HH:mm");
        }
      }],
      k = [{
        title: Object(w["formatMessage"])({
          id: "发放时间"
        }),
        dataIndex: "created_at",
        key: "created_at",
        render: e => {
          return b()(1e3 * e).format("YYYY/MM/DD HH:mm");
        }
      }, {
        title: Object(w["formatMessage"])({
          id: "佣金"
        }),
        dataIndex: "get_amount",
        key: "get_amount",
        align: "right",
        render: (e, t) => {
          return (e / 100).toFixed(2);
        }
      }];
    return d.a.createElement(h["a"], o()({}, this.props, {
      title: Object(w["formatMessage"])({
        id: "我的邀请"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(p ? "block-mode-loading" : "")}>
                                <div className={"block-content pb-3"}>
                                    <i className={"fa fa-user-plus fa-2x text-gray-light float-right"}></i>
                                    <div className={"pb-sm-3"}>
                                        <p className={"text-muted w-75"}>
                                            {Object(w["formatMessage"])({
                      id: "我的邀请"
                    })}
                                        </p>
                                        <p className={"display-4 text-black font-w300 mb-2"}>
                                            {void 0 !== E.commission_balance ? (parseInt(E.commission_balance) / 100).toFixed(2) : "--.--"}
                                            <span className={"font-size-h5 text-muted ml-4"}>
                                                {g.currency}
                                            </span>
                                        </p>
                                        <span className={"text-muted"} style={{
                    cursor: "pointer"
                  }}>
                                            {Object(w["formatMessage"])({
                      id: "当前剩余佣金"
                    })}
                                        </span>
                                        <div className={"pt-3"}>
                                            {d.a.createElement(x["a"], null, d.a.createElement(u["a"], {
                      type: "primary mr-2"
                    }, d.a.createElement(l["a"], {
                      type: "transaction"
                    }), " ", Object(w["formatMessage"])({
                      id: "划转"
                    })))}
                                            {!g.withdraw_close && d.a.createElement(O["a"], null, d.a.createElement(u["a"], null, d.a.createElement(l["a"], {
                      type: "pay-circle"
                    }), " ", Object(w["formatMessage"])({
                      id: "推广佣金提现"
                    })))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(p ? "block-mode-loading" : "")}>
                                <div className={"block-content pb-3"}>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {Object(w["formatMessage"])({
                      id: "已注册用户数"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== t[0] ? t[0] : d.a.createElement(l["a"], {
                      type: "loading"
                    })}
                                            {"人"}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {g.commission_distribution_enable ? d.a.createElement(d.a.Fragment, null, Object(w["formatMessage"])({
                      id: "三级分销比例"
                    }), " ", d.a.createElement(c["a"], {
                      placement: "top",
                      title: Object(w["formatMessage"])({
                        id: "您邀请的用户再次邀请用户将按照订单金额乘以分销等级的比例进行分成。"
                      })
                    }, d.a.createElement(l["a"], {
                      type: "question-circle"
                    }))) : Object(w["formatMessage"])({
                      id: "佣金比例"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {g.commission_distribution_enable ? "".concat(g.commission_distribution_l1 * (t[3] / 100), "%,").concat(g.commission_distribution_l2 * (t[3] / 100), "%,").concat(g.commission_distribution_l3 * (t[3] / 100), "%") : void 0 !== t[3] ? t[3] + "%" : d.a.createElement(l["a"], {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {Object(w["formatMessage"])({
                      id: "确认中的佣金"
                    })}{" "}
                                            {d.a.createElement(c["a"], {
                      placement: "top",
                      title: Object(w["formatMessage"])({
                        id: "佣金将会在确认后会到达你的佣金账户。"
                      })
                    }, d.a.createElement(l["a"], {
                      type: "question-circle"
                    }))}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== t[2] ? "".concat(g.currency_symbol, " ").concat(t[2] / 100) : d.a.createElement(l["a"], {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {Object(w["formatMessage"])({
                      id: "累计获得佣金"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== t[1] ? "".concat(g.currency_symbol, " ").concat(t[1] / 100) : d.a.createElement(l["a"], {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(p ? "block-mode-loading" : "")}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(w["formatMessage"])({
                    id: "邀请码管理"
                  })}
                                    </h3>
                                    <div className={"block-options"}>
                                        <button type={"button"} className={"btn btn-primary btn-sm btn-primary btn-rounded px-3"} onClick={() => m || this.save()}>
                                            {m ? d.a.createElement(l["a"], {
                      type: "loading"
                    }) : Object(w["formatMessage"])({
                      id: "生成邀请码"
                    })}
                                        </button>
                                    </div>
                                </div>
                                <div className={"block-content p-0"}>
                                    {d.a.createElement(s["a"], {
                  tableLayout: "auto",
                  columns: _,
                  dataSource: n,
                  pagination: !1
                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(p ? "block-mode-loading" : "")}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {Object(w["formatMessage"])({
                    id: "佣金发放记录"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content p-0"}>
                                    {d.a.createElement(s["a"], {
                  tableLayout: "auto",
                  columns: k,
                  dataSource: r,
                  loading: i,
                  pagination: a()({}, v, {
                    pageSize: v.page_size,
                    size: "small",
                    showSizeChanger: !0,
                    pageSizeOptions: [10, 50, 100, 150]
                  }),
                  onChange: (e, t, n) => {
                    this.props.dispatch({
                      type: "invite/details",
                      current: e.current,
                      pageSize: e.pageSize
                    });
                  }
                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(m["c"])(e => {
  var t = e.invite,
    n = e.comm,
    r = e.user;
  return {
    invite: t,
    comm: n,
    user: r
  };
})(E);

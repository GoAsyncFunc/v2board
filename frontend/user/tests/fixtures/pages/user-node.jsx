let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  o = interopDefault(r),
  i = (require("../vendor/modules/67395956.js"), require("../vendor/modules/antdTable.js")),
  a = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/antdTag.js")),
  s = (require("../vendor/modules/41776870.js"), require("../vendor/modules/antdBadge.js")),
  c = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  u = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  l = require("../vendor/modules/reactRuntime.js"),
  f = interopDefault(l),
  p = require("../layouts/MainLayout.jsx"),
  d = require("../vendor/reactRedux.js"),
  h = (require("../services/request.js"), require("../vendor/routerHistory.js")),
  m = interopDefault(h),
  v = require("../vendor/siteHelpers.js"),
  y = (require("../vendor/modules/77642f52.js"), require("../vendor/modules/2f497261.js"), require("../vendor/i18n.js"));
class g extends f.a.Component {
  constructor(e) {
    super(e), this.state = {};
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.props.dispatch({
      type: "user/getSubscribe"
    }), this.props.dispatch({
      type: "server/fetch"
    });
  }
  render() {
    var e = this.props.server,
      t = e.servers,
      n = e.fetchLoading,
      r = this.props.user.subscribe,
      l = [{
        title: Object(y["formatMessage"])({
          id: "名称"
        }),
        dataIndex: "name",
        key: "name"
      }, {
        title: <span>
                            {f.a.createElement(c["a"], {
            placement: "top",
            title: Object(y["formatMessage"])({
              id: "节点五分钟内节点在线情况"
            })
          }, Object(y["formatMessage"])({
            id: "状态"
          }), " ", f.a.createElement(u["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "is_online",
        key: "is_online",
        align: "center",
        render: e => {
          return f.a.createElement(s["a"], {
            status: parseInt(e) ? "processing" : "error"
          });
        }
      }, {
        title: <span>
                            {f.a.createElement(c["a"], {
            placement: "top",
            title: Object(y["formatMessage"])({
              id: "使用的流量将乘以倍率进行扣除"
            })
          }, Object(y["formatMessage"])({
            id: "倍率"
          }), " ", f.a.createElement(u["a"], {
            type: "question-circle"
          }))}
                        </span>,
        dataIndex: "rate",
        key: "rate",
        align: "center",
        render: e => {
          return f.a.createElement(a["a"], {
            style: {
              minWidth: 60
            }
          }, e + " x");
        }
      }, {
        title: Object(y["formatMessage"])({
          id: "标签"
        }),
        dataIndex: "tags",
        key: "tags",
        render: e => {
          return e ? e.map(e => {
            return f.a.createElement(a["a"], {
              key: Math.random()
            }, e);
          }) : "-";
        }
      }];
    Object(v["f"])(r.u + r.d, r.transfer_enable);
    return f.a.createElement(p["a"], o()({}, this.props, {
      title: Object(y["formatMessage"])({
        id: "节点状态"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            {n ? <div className={"spinner-grow text-primary"} role={"status"}>
                                    <span className={"sr-only"}>
                                        {"Loading..."}
                                    </span>
                                </div> : t.length > 0 ? <div className={"block block-rounded js-appear-enabled"}>
                                    <div className={"block-content p-0"}>
                                        {f.a.createElement(i["a"], {
                  tableLayout: "auto",
                  dataSource: t,
                  columns: l,
                  pagination: !1,
                  scroll: {
                    x: 900
                  }
                })}
                                    </div>
                                </div> : <div className={"alert alert-dark"} role={"alert"}>
                                    <p className={"mb-0"}>
                                        {Object(y["formatMessage"])({
                  id: "没有可用节点，如果您未订阅或已过期请"
                })}{" "}
                                        {r.plan_id ? <a className={"alert-link"} href={"javascript:void(0);"} onClick={() => m.a.push("/plan/" + r.plan_id)}>
                                                {Object(y["formatMessage"])({
                    id: "续费"
                  })}
                                            </a> : <a className={"alert-link"} href={"javascript:void(0);"} onClick={() => m.a.push("/plan")}>
                                                {Object(y["formatMessage"])({
                    id: "订阅"
                  })}
                                            </a>}
                                        {"。"}
                                    </p>
                                </div>}
                        </div>
                    </div>
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(d["c"])(e => {
  var t = e.user,
    n = e.server,
    r = e.order;
  return {
    user: t,
    server: n,
    order: r
  };
})(g);

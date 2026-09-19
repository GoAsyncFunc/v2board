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
  a = (require("../vendor/modules/35446d6f.js"), require("../vendor/modules/antdTooltip.js")),
  s = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  c = (require("../vendor/modules/2b424a64.js"), require("../vendor/modules/antdTag.js")),
  u = require("../vendor/modules/reactRuntime.js"),
  l = interopDefault(u),
  f = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/siteHelpers.js"),
  d = require("../vendor/modules/77642f52.js"),
  h = interopDefault(d),
  m = require("../vendor/reactRedux.js"),
  v = require("../vendor/i18n.js");
class y extends l.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "stat/getTrafficLog"
    });
  }
  render() {
    var e = this.props.stat,
      t = e.traffics,
      n = e.getTrafficLogLoading,
      r = [{
        title: Object(v["formatMessage"])({
          id: "记录时间"
        }),
        dataIndex: "record_at",
        key: "record_at",
        render: e => {
          return e ? h()(1e3 * e).format("YYYY/MM/DD") : "-";
        }
      }, {
        title: Object(v["formatMessage"])({
          id: "实际上行"
        }),
        dataIndex: "u",
        key: "u",
        align: "right",
        render: (e, t) => t.server_rate ? Object(p["b"])(parseInt(e)) : 0
      }, {
        title: Object(v["formatMessage"])({
          id: "实际下行"
        }),
        dataIndex: "d",
        key: "d",
        align: "right",
        render: (e, t) => t.server_rate ? Object(p["b"])(parseInt(e)) : 0
      }, {
        title: Object(v["formatMessage"])({
          id: "扣费倍率"
        }),
        dataIndex: "server_rate",
        key: "server_rate",
        align: "center",
        render: e => {
          return l.a.createElement(c["a"], {
            style: {
              minWidth: 60
            }
          }, parseFloat(e) ? parseFloat(e).toFixed(2) + " x" : "-");
        }
      }, {
        title: l.a.createElement(a["a"], {
          placement: "topRight",
          title: Object(v["formatMessage"])({
            id: "公式：(实际上行 + 实际下行) x 扣费倍率 = 扣除流量"
          })
        }, Object(v["formatMessage"])({
          id: "合计"
        }), " ", l.a.createElement(s["a"], {
          type: "question-circle"
        })),
        dataIndex: "total",
        key: "total",
        align: "right",
        fixed: "right",
        render: (e, t) => {
          return Object(p["b"])((parseInt(t.u) + parseInt(t.d)) * t.server_rate);
        }
      }];
    return l.a.createElement(f["a"], o()({}, this.props, {
      title: Object(v["formatMessage"])({
        id: "流量明细"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"block block-rounded  ".concat(n ? "block-mode-loading" : "")}>
                        <div className={"bg-white"}>
                            <div className={"row p-3"}>
                                <div className={"col-lg-12"}>
                                    <div className={"alert alert-info mb-0"} role={"alert"}>
                                        <p className={"mb-0"}>
                                            {Object(v["formatMessage"])({
                      id: "流量明细仅保留近月数据以供查询。"
                    })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {l.a.createElement(i["a"], {
              tableLayout: "auto",
              style: {
                borderTop: "1px solid #e8e8e8"
              },
              dataSource: t,
              pagination: !1,
              columns: r,
              scroll: {
                x: 800
              }
            })}
                        </div>
                    </div>
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(m["c"])(e => {
  var t = e.stat;
  return {
    stat: t
  };
})(y);

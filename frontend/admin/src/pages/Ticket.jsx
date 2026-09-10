const {
  createReadonlyTicketColumns
} = require('../components/TicketDisplayColumns.jsx');
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
  o = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  a = require("../vendor/modules/70307045.js"),
  s = interopDefault(a),
  l = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  c = (require("../vendor/modules/374b616b.js"), require("../vendor/modules/39794836.js")),
  u = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  h = (require("../vendor/modules/41776870.js"), require("../vendor/modules/4b725473.js")),
  f = require("../vendor/modules/71317449.js"),
  d = interopDefault(f),
  p = require("../layouts/MainLayout.jsx"),
  m = require("../vendor/reactRedux.js"),
  g = require("../vendor/modules/77642f52.js"),
  v = interopDefault(g),
  y = require("../vendor/modules/76333265.js");
class b extends d.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {
        level: 1
      }
    }, this.onSearchTimeout = void 0;
  }
  componentDidMount() {
    this.props.dispatch({
      type: "ticket/fetch"
    });
  }
  close(e) {
    this.props.dispatch({
      type: "ticket/close",
      id: e
    });
  }
  tableOnChange(e, t, n) {
    this.props.dispatch({
      type: "ticket/filter",
      pagination: e,
      filter: n
    });
  }
  filter(e, t) {
    this.props.dispatch({
      type: "ticket/filter",
      filter: {
        [e]: t
      },
      pagination: {
        pageSize: 10,
        current: 1
      }
    });
  }
  toChat(e) {
    var t = window.location.origin + window.location.pathname + "#/ticket/" + e;
    -1 === window.navigator.userAgent.toLowerCase().indexOf("mobile") && -1 === window.navigator.userAgent.toLowerCase().indexOf("ipad") ? window.open(t, "_blank", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no") : window.location.href = t;
  }
  onSearch(e, t) {
    clearTimeout(this.onSearchTimeout), this.onSearchTimeout = setTimeout(() => {
      this.props.dispatch({
        type: "ticket/filter",
        filter: {
          [e]: t
        },
        pagination: {
          pageSize: 10,
          current: 1
        }
      });
    }, 300);
  }
  render() {
    var e = this.props.ticket,
      t = e.tickets,
      n = e.fetchLoading,
      r = e.pagination,
      a = e.filter,
      f = ["低", "中", "高"],
      m = [createReadonlyTicketColumns(f)["id"], createReadonlyTicketColumns(f)["subject"], createReadonlyTicketColumns(f)["level"], {
        title: "工单状态",
        dataIndex: "reply_status",
        key: "reply_status",
        filters: 1 !== a.status && [{
          text: "已回复",
          value: 1
        }, {
          text: "待回复",
          value: 0
        }],
        render: (e, t) => {
          return 1 === t.status ? <span>
                                {d.a.createElement(h["a"], {
              status: "success"
            })}
                                {"已关闭"}
                            </span> : <span>
                                {d.a.createElement(h["a"], {
              status: e ? "processing" : "error"
            })}
                                {e ? "已回复" : "待回复"}
                            </span>;
        }
      }, createReadonlyTicketColumns(f)["created_at"], createReadonlyTicketColumns(f)["updated_at"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t) => {
          return <div>
                                <a href={"javascript:void(0);"} onClick={() => this.toChat(t.id)}>
                                    {"查看"}
                                </a>
                                {d.a.createElement(u["a"], {
              type: "vertical"
            })}
                                <a disabled={t.status} href={"javascript:void(0);"} onClick={() => this.close(t.id)}>
                                    {"关闭"}
                                </a>
                            </div>;
        }
      }];
    return d.a.createElement(p["a"], i()({}, this.props, {
      title: "工单管理"
    }), d.a.createElement(y["a"], {
      loading: n
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div className={"p-3"}>
                            {d.a.createElement(c["a"].Group, {
            value: a.status,
            onChange: e => this.filter("status", e.target.value)
          }, d.a.createElement(c["a"].Button, {
            value: 0
          }, "已开启"), d.a.createElement(c["a"].Button, {
            value: 1
          }, "已关闭"))}
                            <div style={{
            float: "right"
          }}>
                                {d.a.createElement(l["a"], {
              placeholder: "输入邮箱搜索",
              onChange: e => this.onSearch("email", e.target.value)
            })}
                            </div>
                        </div>
                        {d.a.createElement(o["a"], {
          tableLayout: "auto",
          dataSource: t,
          pagination: s()({}, r, {
            size: "small"
          }),
          columns: m,
          scroll: {
            x: 900
          },
          onChange: (e, t, n) => this.tableOnChange(e, n, t)
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(m["c"])(e => {
  var t = e.ticket;
  return {
    ticket: t
  };
})(b);

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
  a = require("../vendor/modules/71317449.js"),
  s = interopDefault(a),
  l = require("../layouts/MainLayout.jsx"),
  c = (require("../vendor/modules/6d615643.js"), require("../vendor/modules/77642f52.js"), require("../vendor/reactRedux.js")),
  u = (require("../vendor/modules/6d43642f.js"), require("../components/Recovered_43674f62.jsx"), require("../components/Recovered_68566c61.jsx"), require("../vendor/modules/51673471.js"), require("../vendor/siteHelpers.js"), require("../components/Recovered_4f613657.jsx"), require("../components/Recovered_48394c55.jsx"), require("../components/Recovered_33585647.jsx"), require("../components/Recovered_796b4332.jsx"), require("../vendor/modules/76333265.js"));
class h extends s.a.Component {
  constructor(e) {
    super(e), this.state = {}, this.getDataTimer = void 0;
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    clearTimeout(this.getDataTimer);
  }
  getData() {
    this.props.dispatch({
      type: "system/getQueueStats"
    }), this.props.dispatch({
      type: "system/getQueueWorkload"
    }), this.getDataTimer = setTimeout(() => {
      this.getData();
    }, 3e3);
  }
  render() {
    var e = this.props.system,
      t = e.queueStats,
      n = (e.getQueueStatsLoading, e.queueWorkload);
    e.getQueueWorkloadLoading;
    return s.a.createElement(l["a"], i()({}, this.props, {
      title: "队列监控"
    }), s.a.createElement(u["a"], {
      loading: !t
    }, <div className={"block block-rounded "}>
                    <div className={"block-header block-header-default"}>
                        <h3 className={"block-title"}>{"总览"}</h3>
                    </div>
                    <div className={"block-content p-0"}>
                        <div className={"row no-gutters"}>
                            <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                                <div>
                                    <div>{"当前作业量"}</div>
                                    <div className={"mt-4 font-size-h3"}>
                                        {(null === t || void 0 === t ? void 0 : t.jobsPerMinute) || "0"}
                                    </div>
                                </div>
                            </div>
                            <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                                <div>
                                    <div>{"近一小时处理量"}</div>
                                    <div className={"mt-4 font-size-h3"}>
                                        {(null === t || void 0 === t ? void 0 : t.recentJobs) || "0"}
                                    </div>
                                </div>
                            </div>
                            <div className={"col-lg-6 col-xl-3 border-right p-4 border-bottom"}>
                                <div>
                                    <div>{"7日内报错数量"}</div>
                                    <div className={"mt-4 font-size-h3"}>
                                        {(null === t || void 0 === t ? void 0 : t.failedJobs) || "0"}
                                    </div>
                                </div>
                            </div>
                            <div className={"col-lg-6 col-xl-3 p-4 border-bottom overflow-hidden"}>
                                <div>
                                    <div>{"状态"}</div>
                                    <div className={"mt-4 font-size-h3"}>
                                        {t && ((null === t || void 0 === t ? void 0 : t.status) ? "运行中" : "未启动")}
                                    </div>
                                    {t && ((null === t || void 0 === t ? void 0 : t.status) ? <i class={"si si-check text-success"} style={{
                position: "absolute",
                fontSize: 100,
                right: -20,
                bottom: -20
              }}></i> : <i class={"si si-close text-danger"} style={{
                position: "absolute",
                fontSize: 100,
                right: -20,
                bottom: -20
              }}></i>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>), s.a.createElement(u["a"], {
      loading: !n
    }, <div className={"block block-rounded "}>
                    <div className={"block-header block-header-default"}>
                        <h3 className={"block-title"}>{"当前作业详情"}</h3>
                    </div>
                    <div className={"block-content p-0"}>
                        {s.a.createElement(o["a"], {
          columns: [{
            title: "队列名称",
            dataIndex: "name",
            key: "name",
            render: e => {
              var t = {
                order_handle: "订单队列",
                send_email: "邮件队列",
                send_email_mass: "邮件群发队列",
                send_telegram: "Telegram消息队列",
                stat: "统计队列",
                traffic_fetch: "流量消费队列"
              };
              return t[e];
            }
          }, {
            title: "作业量",
            dataIndex: "processes",
            key: "processes"
          }, {
            title: "任务量",
            dataIndex: "length",
            key: "length"
          }, {
            title: "占用时间",
            dataIndex: "wait",
            key: "wait",
            align: "right",
            render: e => e + "s"
          }],
          dataSource: n && n.filter(e => "default" !== e.name),
          pagination: !1
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(c["c"])(e => {
  var t = e.system;
  return {
    system: t
  };
})(h);

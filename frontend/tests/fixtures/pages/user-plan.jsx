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
  i = require("../vendor/modules/71317449.js"),
  a = interopDefault(i),
  s = require("../layouts/MainLayout.jsx"),
  c = require("../vendor/reactRedux.js"),
  u = require("../vendor/routerHistory.js"),
  l = interopDefault(u),
  f = require("../vendor/localeSettings.js"),
  p = require("../vendor/i18n.js"),
  d = require("../vendor/siteHelpers.js");
class h extends a.a.Component {
  constructor(e) {
    super(e), this.state = {
      tabs: 0
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "plan/fetch"
    }), this.props.dispatch({
      type: "comm/config"
    });
  }
  getUnitPriceTag(e) {
    var t = {};
    return Object.keys(f["a"].periodText).reverse().forEach(n => {
      "reset_price" !== n && (null === e[n] || (t = {
        tag: f["a"].periodText[n] && f["a"].periodText[n](),
        price: e[n]
      }));
    }), t;
  }
  render() {
    var e = this.props.plan.plans,
      t = this.props.comm.config;
    return a.a.createElement(s["a"], o()({}, this.props, {
      title: Object(p["formatMessage"])({
        id: "购买订阅"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <h2 className={"font-weight-normal mb-4 m-3 mx-xl-0 mt-xl-0 mt-4"}>
                        {Object(p["formatMessage"])({
            id: "选择最适合你的计划"
          })}
                    </h2>
                    <div className={"mb-3 font-size-sm mt-3 m-3 mx-xl-0"}>
                        <span className={"v2board-plan-tabs border-primary text-primary"}>
                            <span className={0 === this.state.tabs && "active bg-primary"} onClick={() => this.setState({
              tabs: 0
            })}>
                                {Object(p["formatMessage"])({
                id: "全部"
              })}
                            </span>
                            <span className={1 === this.state.tabs && "active bg-primary"} onClick={() => this.setState({
              tabs: 1
            })}>
                                {Object(p["formatMessage"])({
                id: "按周期"
              })}
                            </span>
                            <span className={2 === this.state.tabs && "active bg-primary"} onClick={() => this.setState({
              tabs: 2
            })}>
                                {Object(p["formatMessage"])({
                id: "按流量"
              })}
                            </span>
                        </span>
                    </div>
                    {e.length <= 0 ? <div className={"spinner-grow text-primary"} role={"status"}>
                            <span className={"sr-only"}>{"Loading..."}</span>
                        </div> : <div className={"row"}>
                            {e.filter(e => {
            return !this.state.tabs || !(1 !== this.state.tabs || !(e.month_price || e.quarter_price || e.half_year_price || e.year_price || e.two_year_price || e.three_year_price)) || !(2 !== this.state.tabs || !e.onetime_price) || void 0;
          }).map(e => {
            var n = this.getUnitPriceTag(e),
              r = Object(d["c"])(e.content),
              o = null !== e.capacity_limit && e.capacity_limit <= 0,
              i = null !== e.capacity_limit && e.capacity_limit <= 5 && e.capacity_limit >= 1;
            if (n) return <div key={Math.random()} className={"col-md-12 col-xl-4"}>
                                                <a className={"block block-link-pop block-rounded m-3 mx-xl-0"} href={"javascript:void(0);"} onClick={() => {
                o || l.a.push("/plan/".concat(e.id));
              }}>
                                                    <div className={"block-header plan"}>
                                                        <h3 className={"block-title"}>
                                                            {e.name}
                                                        </h3>
                                                        {i && <span className={"v2board-sold-out-tag"}>
                                                                {Object(p["formatMessage"])({
                      id: "即将售罄"
                    })}
                                                            </span>}
                                                    </div>
                                                    <div className={"block-content bg-gray-light"}>
                                                        <div className={"py-2"}>
                                                            <p className={"h1 mb-2"}>
                                                                {t.currency_symbol}{" "}
                                                                {(n.price / 100).toFixed(2)}
                                                            </p>
                                                            <p className={"h6 text-muted"}>
                                                                {n.tag}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={"block-content py-3"}>
                                                        {a.a.createElement(a.a.Fragment, null, e.content ? "object" === typeof r ? <div className={"mb-3"}>
                                                                        {r.map(e => {
                      return <div style={{
                        textAlign: "left",
                        marginBottom: 8,
                        opacity: e.support ? 1 : 0.3
                      }}>
                                                                                        {e.support ? <i className={"si si-check text-primary"} style={{
                          fontSize: 21,
                          verticalAlign: "sub"
                        }}></i> : <i className={"si si-close text-primary"} style={{
                          fontSize: 21,
                          verticalAlign: "sub"
                        }}></i>}
                                                                                        <span style={{
                          paddingLeft: 8
                        }}>
                                                                                            {e.feature}
                                                                                        </span>
                                                                                    </div>;
                    })}
                                                                    </div> : <div className={"mb-3"} dangerouslySetInnerHTML={{
                    __html: e.content
                  }}></div> : "")}
                                                        <button type={"button"} disabled={o} class={"btn btn-sm btn-alt-primary"}>
                                                            {Object(p["formatMessage"])({
                      id: o ? "已售罄" : "立即订阅"
                    })}
                                                        </button>
                                                    </div>
                                                </a>
                                            </div>;
          })}
                        </div>}
                </div>
            </main>);
  }
}
legacyExports["default"] = Object(c["c"])(e => {
  var t = e.plan,
    n = e.comm;
  return {
    plan: t,
    comm: n
  };
})(h);

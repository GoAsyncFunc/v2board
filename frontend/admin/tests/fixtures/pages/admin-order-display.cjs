// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(g,p,y,w){return [{
  title: "类型",
  dataIndex: "type",
  key: "type",
  render: e => {
    var t = {
      1: "新购",
      2: "续费",
      3: "变更",
      4: "流量包",
      9: "充值"
    };
    return t[e];
  }
}, {
  title: "周期",
  dataIndex: "period",
  key: "period",
  align: "center",
  render: (e, t) => {
    return g.a.createElement(p["a"], null, y["a"].periodText[t.period]);
  }
}, {
  title: "支付金额",
  dataIndex: "total_amount",
  key: "total_amount",
  align: "right",
  render: e => {
    return (e / 100).toFixed(2);
  }
}, {
  title: "佣金金额",
  dataIndex: "commission_balance",
  key: "commission_balance",
  align: "right",
  render: (e, t) => {
    return 0 === t.status || 2 === t.status ? "-" : e ? (e / 100).toFixed(2) : "-";
  }
}, {
  title: "创建时间",
  dataIndex: "created_at",
  key: "created_at",
  align: "right",
  render: e => {
    return w()(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}];};

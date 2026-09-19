// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(b,d,_,y){return [{
  title: "#",
  dataIndex: "id",
  key: "id"
}, {
  title: "名称",
  dataIndex: "name",
  key: "name"
}, {
  title: "类型",
  dataIndex: "type",
  key: "type",
  render: e => {
    switch (e) {
      case 1:
        return "金额";
      case 2:
        return "时长";
      case 3:
        return "流量";
      case 4:
        return "重置";
      case 5:
        return "套餐";
      default:
        return "";
    }
  }
}, {
  title: "数值",
  dataIndex: "value",
  key: "value",
  render: (e, t) => {
    switch (t.type) {
      case 1:
        return e.toFixed(2) + " ¥";
      case 2:
        return e + " 天";
      case 3:
        return e + " GB";
      case 4:
        return "-";
      case 5:
        return e + " 天";
      default:
        return e;
    }
  }
}, {
  title: "套餐",
  dataIndex: "plan_id",
  key: "plan_id",
  render: e => {
    const foundplan = y.find(item => item.id === e);
    const name = foundplan ? foundplan.name : "-";
    return name;
  }
}, {
  title: "剩余次数",
  dataIndex: "limit_use",
  key: "limit_use",
  render: e => {
    return b.a.createElement(d["a"], null, null !== e ? e : "无限");
  }
}, {
  title: "有效期",
  dataIndex: "started_at",
  key: "started_at",
  align: "left",
  render: (e, t) => {
    return "".concat(_()(1e3 * t.started_at).format("YYYY/MM/DD HH:mm"), " ~ ").concat(_()(1e3 * t.ended_at).format("YYYY/MM/DD HH:mm"));
  }
}];};

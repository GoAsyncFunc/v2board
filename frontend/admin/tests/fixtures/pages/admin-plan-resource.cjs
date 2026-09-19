// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(m,h){return [{
  title: "名称",
  dataIndex: "name",
  key: "name"
}, {
  title: "统计",
  dataIndex: "count",
  key: "count",
  render: e => {
    return m.a.createElement(m.a.Fragment, null, m.a.createElement(h["a"], {
      type: "user",
      style: {
        cursor: "move"
      }
    }), " ", e);
  }
}, {
  title: "流量",
  dataIndex: "transfer_enable",
  key: "transfer_enable",
  render: e => {
    return m.a.createElement(m.a.Fragment, null, e, " GB");
  }
}, {
  title: "设备数限制",
  dataIndex: "device_limit",
  key: "device_limit",
  render: e => {
    return null !== e ? e : "-";
  }
}];};

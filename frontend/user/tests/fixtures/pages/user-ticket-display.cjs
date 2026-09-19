// Original user-side ticket readonly columns, extracted unchanged; view/close action column deliberately excluded.
module.exports = function(b){return [{
  title: "#",
  dataIndex: "id",
  key: "id"
}, {
  title: b.formatMessage({
    id: "主题"
  }),
  dataIndex: "subject",
  key: "subject"
}, {
  title: b.formatMessage({
    id: "工单级别"
  }),
  dataIndex: "level",
  key: "level",
  render: e => {
    return b.levels[e];
  }
}, {
  title: b.formatMessage({
    id: "工单状态"
  }),
  dataIndex: "reply_status",
  key: "reply_status",
  render: (e, t) => {
    return 1 === t.status ? b.createElement("span", null, b.createElement(b.Badge, {
      status: "success"
    }), b.formatMessage({
      id: "已关闭"
    })) : b.createElement("span", null, b.createElement(b.Badge, {
      status: parseInt(e) ? "processing" : "error"
    }), parseInt(e) ? b.formatMessage({
      id: "已答复"
    }) : b.formatMessage({
      id: "待处理"
    }));
  }
}, {
  title: b.formatMessage({
    id: "创建时间"
  }),
  dataIndex: "created_at",
  key: "created_at",
  render: e => {
    return b.moment(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}, {
  title: b.formatMessage({
    id: "最后回复"
  }),
  dataIndex: "updated_at",
  key: "updated_at",
  render: e => {
    return b.moment(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}];};
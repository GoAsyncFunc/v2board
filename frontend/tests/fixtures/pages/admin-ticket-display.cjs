// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(f,v){return [{
  title: "#",
  dataIndex: "id",
  key: "id"
}, {
  title: "主题",
  dataIndex: "subject",
  key: "subject"
}, {
  title: "工单级别",
  dataIndex: "level",
  key: "level",
  render: e => {
    return f[e];
  }
}, {
  title: "创建时间",
  dataIndex: "created_at",
  key: "created_at",
  render: e => {
    return v()(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}, {
  title: "最后回复",
  dataIndex: "updated_at",
  key: "updated_at",
  render: e => {
    return v()(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}];};

// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(m){return [{
  title: "文章ID",
  dataIndex: "id",
  key: "id"
}, {
  title: "标题",
  dataIndex: "title",
  key: "title"
}, {
  title: "分类",
  dataIndex: "category",
  key: "category"
}, {
  title: "更新时间",
  dataIndex: "updated_at",
  key: "updated_at",
  align: "right",
  render: e => {
    return m()(1e3 * e).format("YYYY/MM/DD HH:mm");
  }
}];};

// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(){return [{
  title: "ID",
  dataIndex: "id",
  key: "id"
}, {
  title: "备注",
  dataIndex: "remarks",
  key: "remarks"
}, {
  title: "匹配数量",
  dataIndex: "match",
  key: "match",
  render: e => {
    var t;
    return e.length == 0 ? "无规则时默认" : "匹配 ".concat("string" === typeof e ? null === (t = e.split(",").filter(e => !!e)) || void 0 === t ? void 0 : t.length : e.length, " 条规则");
  }
}];};

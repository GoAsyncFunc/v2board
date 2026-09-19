// Original user-side invite readonly columns, extracted unchanged; the 邀请码 copy-link column (onClick) stays in the page.
module.exports = function(b){return {
  codeDate: {
    title: b.formatMessage({
      id: "创建时间"
    }),
    dataIndex: "created_at",
    key: "created_at",
    align: "right",
    render: e => {
      return b.moment(1e3 * e).format("YYYY/MM/DD HH:mm");
    }
  },
  commission: [{
    title: b.formatMessage({
      id: "发放时间"
    }),
    dataIndex: "created_at",
    key: "created_at",
    render: e => {
      return b.moment(1e3 * e).format("YYYY/MM/DD HH:mm");
    }
  }, {
    title: b.formatMessage({
      id: "佣金"
    }),
    dataIndex: "get_amount",
    key: "get_amount",
    align: "right",
    render: (e, t) => {
      return (e / 100).toFixed(2);
    }
  }]
};};

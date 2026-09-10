// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function(){return [{
  title: "月付",
  dataIndex: "month_price",
  key: "month_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "季付",
  dataIndex: "quarter_price",
  key: "quarter_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "半年付",
  dataIndex: "half_year_price",
  key: "half_year_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "年付",
  dataIndex: "year_price",
  key: "year_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "两年付",
  dataIndex: "two_year_price",
  key: "two_year_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "三年付",
  dataIndex: "three_year_price",
  key: "three_year_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "一次性",
  dataIndex: "onetime_price",
  key: "onetime_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}, {
  title: "重置包",
  dataIndex: "reset_price",
  key: "reset_price",
  render: e => {
    return null !== e ? e.toFixed(2) : "-";
  }
}];};

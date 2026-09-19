// Original readonly queue workload columns, extracted unchanged; controller untouched.
module.exports = function(){return [{
  title: "队列名称",
  dataIndex: "name",
  key: "name",
  render: e => {
    var t = {
      order_handle: "订单队列",
      send_email: "邮件队列",
      send_email_mass: "邮件群发队列",
      send_telegram: "Telegram消息队列",
      stat: "统计队列",
      traffic_fetch: "流量消费队列"
    };
    return t[e];
  }
}, {
  title: "作业量",
  dataIndex: "processes",
  key: "processes"
}, {
  title: "任务量",
  dataIndex: "length",
  key: "length"
}, {
  title: "占用时间",
  dataIndex: "wait",
  key: "wait",
  align: "right",
  render: e => e + "s"
}];};

// Original chat/date/expiry expressions, extracted unchanged (TicketDetail, Knowledge, Dashboard).
module.exports = function(moment){return {
  my: e => moment(1e3 * e.created_at).format("YYYY/MM/DD HH:mm"),
  theirs: e => moment(1e3 * e.created_at).format("YYYY/MM/DD HH:mm"),
  date: v => moment(1e3 * v).format("YYYY/MM/DD"),
  dateDash: v => moment(1e3 * v).format("YYYY-MM-DD"),
  daysRemaining: v => ((v - moment().format("X")) / 86400).toFixed(0)
};};
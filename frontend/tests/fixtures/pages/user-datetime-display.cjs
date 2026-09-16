// Original chat message timestamp expression, extracted unchanged (TicketDetail both branches).
module.exports = function(moment){return {
  my: e => moment(1e3 * e.created_at).format("YYYY/MM/DD HH:mm"),
  theirs: e => moment(1e3 * e.created_at).format("YYYY/MM/DD HH:mm")
};};
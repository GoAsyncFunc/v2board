// Original user subscribe usage expressions, extracted unchanged (Dashboard).
module.exports = function(percentOf){return {
  percent: d => Math.round(percentOf(d.u + d.d, d.transfer_enable) * 100) / 100,
  color: y => y >= 100 ? "danger" : y >= 80 ? "warning" : "success",
  deviceLimit: value => value == null ? "∞" : value
};};
// Original money display expressions, extracted unchanged (Profile balance / Invite commission balance).
module.exports = function(){return {
  balance: e => void 0 !== e ? (parseInt(e) / 100).toFixed(2) : "--.--",
  commission: e => void 0 !== e ? (parseInt(e) / 100).toFixed(2) : "--.--",
  price: e => (e / 100).toFixed(2)
};};

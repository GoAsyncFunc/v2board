var htmlEntities = require("./htmlEntitiesEntry.js");
var has = require("./markdownUtils.js").has;
var isValidEntityCode = require("./markdownUtils.js").isValidEntityCode;
var fromCodePoint = require("./markdownUtils.js").fromCodePoint;

var numericEntityPattern = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var namedEntityPattern = /^&([a-z][a-z0-9]{1,31});/i;

module.exports = function markdownEntityRule(state, silent) {
  var position = state.pos;
  var end = state.posMax;
  if (state.src.charCodeAt(position) !== 38) return false;

  if (position + 1 < end) {
    var nextCharacterCode = state.src.charCodeAt(position + 1);
    var match;
    if (nextCharacterCode === 35) {
      match = state.src.slice(position).match(numericEntityPattern);
      if (match) {
        if (!silent) {
          var entityCode = match[1][0].toLowerCase() === "x"
            ? parseInt(match[1].slice(1), 16)
            : parseInt(match[1], 10);
          state.pending += fromCodePoint(isValidEntityCode(entityCode) ? entityCode : 65533);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(position).match(namedEntityPattern);
      if (match && has(htmlEntities, match[1])) {
        if (!silent) state.pending += htmlEntities[match[1]];
        state.pos += match[0].length;
        return true;
      }
    }
  }

  if (!silent) state.pending += "&";
  state.pos++;
  return true;
};

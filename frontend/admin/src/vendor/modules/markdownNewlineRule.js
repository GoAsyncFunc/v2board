var isSpace = require("./markdownUtils.js").isSpace;

module.exports = function markdownNewlineRule(state, silent) {
  var position = state.pos;
  if (state.src.charCodeAt(position) !== 10) return false;

  var lastPendingIndex = state.pending.length - 1;
  var end = state.posMax;
  if (!silent) {
    if (lastPendingIndex >= 0 && state.pending.charCodeAt(lastPendingIndex) === 32) {
      if (lastPendingIndex >= 1 && state.pending.charCodeAt(lastPendingIndex - 1) === 32) {
        var trailingSpacesStart = lastPendingIndex - 1;
        while (trailingSpacesStart >= 1 && state.pending.charCodeAt(trailingSpacesStart - 1) === 32) trailingSpacesStart--;
        state.pending = state.pending.slice(0, trailingSpacesStart);
        state.push("hardbreak", "br", 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push("softbreak", "br", 0);
      }
    } else {
      state.push("softbreak", "br", 0);
    }
  }

  position++;
  while (position < end && isSpace(state.src.charCodeAt(position))) position++;
  state.pos = position;
  return true;
};

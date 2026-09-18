module.exports = function markdownBackticksRule(state, silent) {
  var position = state.pos;
  if (state.src.charCodeAt(position) !== 96) return false;

  var markerStart = position;
  position++;
  var end = state.posMax;
  while (position < end && state.src.charCodeAt(position) === 96) position++;

  var marker = state.src.slice(markerStart, position);
  var markerLength = marker.length;
  if (state.backticksScanned && (state.backticks[markerLength] || 0) <= markerStart) {
    if (!silent) state.pending += marker;
    state.pos += markerLength;
    return true;
  }

  var matchStart = position;
  var searchStart = position;
  while ((matchStart = state.src.indexOf("`", searchStart)) !== -1) {
    searchStart = matchStart + 1;
    while (searchStart < end && state.src.charCodeAt(searchStart) === 96) searchStart++;

    var matchLength = searchStart - matchStart;
    if (matchLength === markerLength) {
      if (!silent) {
        var token = state.push("code_inline", "code", 0);
        token.markup = marker;
        token.content = state.src.slice(position, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      state.pos = searchStart;
      return true;
    }
    state.backticks[matchLength] = matchStart;
  }

  state.backticksScanned = true;
  if (!silent) state.pending += marker;
  state.pos += markerLength;
  return true;
};

function parseLinkLabel(state, start, disableNested) {
  var level;
  var found;
  var marker;
  var previousPosition;
  var labelEnd = -1;
  var maximumPosition = state.posMax;
  var originalPosition = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < maximumPosition) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5d) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    previousPosition = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5b) {
      if (previousPosition === state.pos - 1) level++;
      else if (disableNested) {
        state.pos = originalPosition;
        return -1;
      }
    }
  }

  if (found) labelEnd = state.pos;
  state.pos = originalPosition;
  return labelEnd;
}

module.exports = parseLinkLabel;

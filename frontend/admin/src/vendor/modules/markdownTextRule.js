function isTerminator(characterCode) {
  switch (characterCode) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return true;
    default:
      return false;
  }
}

module.exports = function markdownTextRule(state, silent) {
  var end = state.pos;
  while (end < state.posMax && !isTerminator(state.src.charCodeAt(end))) end++;
  if (end === state.pos) return false;
  if (!silent) state.pending += state.src.slice(state.pos, end);
  state.pos = end;
  return true;
};

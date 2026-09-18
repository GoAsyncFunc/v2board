function balanceDelimiterPairs(state, delimiters) {
  var delimiterCount = delimiters.length;
  if (!delimiterCount) return;

  var currentRunStart = 0;
  var previousTokenIndex = -2;
  var jumps = [];
  var openersBottom = {};

  for (var closerIndex = 0; closerIndex < delimiterCount; closerIndex++) {
    var closer = delimiters[closerIndex];
    jumps.push(0);

    if (delimiters[currentRunStart].marker !== closer.marker || previousTokenIndex !== closer.token - 1) {
      currentRunStart = closerIndex;
    }
    previousTokenIndex = closer.token;
    closer.length = closer.length || 0;
    if (!closer.close) continue;

    if (!Object.prototype.hasOwnProperty.call(openersBottom, closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }

    var minimumOpenerIndex = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
    var openerIndex = currentRunStart - jumps[currentRunStart] - 1;
    var lastCheckedOpener = openerIndex;

    for (; openerIndex > minimumOpenerIndex; openerIndex -= jumps[openerIndex] + 1) {
      var opener = delimiters[openerIndex];
      if (opener.marker !== closer.marker || !opener.open || opener.end >= 0) continue;

      var oddMatch = false;
      if ((opener.close || closer.open) && (opener.length + closer.length) % 3 === 0) {
        if (opener.length % 3 !== 0 || closer.length % 3 !== 0) oddMatch = true;
      }
      if (oddMatch) continue;

      var jump = openerIndex > 0 && !delimiters[openerIndex - 1].open ? jumps[openerIndex - 1] + 1 : 0;
      jumps[closerIndex] = closerIndex - openerIndex + jump;
      jumps[openerIndex] = jump;
      closer.open = false;
      opener.end = closerIndex;
      opener.close = false;
      lastCheckedOpener = -1;
      previousTokenIndex = -2;
      break;
    }

    if (lastCheckedOpener !== -1) {
      openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = lastCheckedOpener;
    }
  }
}

module.exports = function markdownBalancePairsRule(state) {
  balanceDelimiterPairs(state, state.delimiters);
  for (var index = 0; index < state.tokens_meta.length; index++) {
    var metadata = state.tokens_meta[index];
    if (metadata && metadata.delimiters) balanceDelimiterPairs(state, metadata.delimiters);
  }
};

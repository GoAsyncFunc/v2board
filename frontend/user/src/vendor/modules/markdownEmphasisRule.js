function processEmphasisDelimiters(state, delimiters) {
  for (var index = delimiters.length - 1; index >= 0; index--) {
    var opener = delimiters[index];
    if (opener.marker !== 95 && opener.marker !== 42 || opener.end === -1) continue;

    var closer = delimiters[opener.end];
    var isStrong = index > 0 &&
      delimiters[index - 1].end === opener.end + 1 &&
      delimiters[index - 1].marker === opener.marker &&
      delimiters[index - 1].token === opener.token - 1 &&
      delimiters[opener.end + 1].token === closer.token + 1;
    var marker = String.fromCharCode(opener.marker);

    var token = state.tokens[opener.token];
    token.type = isStrong ? "strong_open" : "em_open";
    token.tag = isStrong ? "strong" : "em";
    token.nesting = 1;
    token.markup = isStrong ? marker + marker : marker;
    token.content = "";

    token = state.tokens[closer.token];
    token.type = isStrong ? "strong_close" : "em_close";
    token.tag = isStrong ? "strong" : "em";
    token.nesting = -1;
    token.markup = isStrong ? marker + marker : marker;
    token.content = "";

    if (isStrong) {
      state.tokens[delimiters[index - 1].token].content = "";
      state.tokens[delimiters[opener.end + 1].token].content = "";
      index--;
    }
  }
}

exports.tokenize = function markdownEmphasisTokenize(state, silent) {
  if (silent) return false;

  var markerCode = state.src.charCodeAt(state.pos);
  if (markerCode !== 95 && markerCode !== 42) return false;

  var scanned = state.scanDelims(state.pos, markerCode === 42);
  for (var index = 0; index < scanned.length; index++) {
    var token = state.push("text", "", 0);
    token.content = String.fromCharCode(markerCode);
    state.delimiters.push({
      marker: markerCode,
      length: scanned.length,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;
  return true;
};

exports.postProcess = function markdownEmphasisPostProcess(state) {
  processEmphasisDelimiters(state, state.delimiters);
  for (var index = 0; index < state.tokens_meta.length; index++) {
    var metadata = state.tokens_meta[index];
    if (metadata && metadata.delimiters) processEmphasisDelimiters(state, metadata.delimiters);
  }
};

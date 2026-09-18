function processStrikethroughDelimiters(state, delimiters) {
  var loneMarkerTokens = [];

  for (var index = 0; index < delimiters.length; index++) {
    var opener = delimiters[index];
    if (opener.marker !== 126 || opener.end === -1) continue;

    var closer = delimiters[opener.end];
    var token = state.tokens[opener.token];
    token.type = "s_open";
    token.tag = "s";
    token.nesting = 1;
    token.markup = "~~";
    token.content = "";

    token = state.tokens[closer.token];
    token.type = "s_close";
    token.tag = "s";
    token.nesting = -1;
    token.markup = "~~";
    token.content = "";

    if (state.tokens[closer.token - 1].type === "text" && state.tokens[closer.token - 1].content === "~") {
      loneMarkerTokens.push(closer.token - 1);
    }
  }

  while (loneMarkerTokens.length) {
    var loneMarkerIndex = loneMarkerTokens.pop();
    var targetIndex = loneMarkerIndex + 1;
    while (targetIndex < state.tokens.length && state.tokens[targetIndex].type === "s_close") targetIndex++;
    targetIndex--;
    if (loneMarkerIndex !== targetIndex) {
      var targetToken = state.tokens[targetIndex];
      state.tokens[targetIndex] = state.tokens[loneMarkerIndex];
      state.tokens[loneMarkerIndex] = targetToken;
    }
  }
}

exports.tokenize = function markdownStrikethroughTokenize(state, silent) {
  if (silent) return false;

  var markerCode = state.src.charCodeAt(state.pos);
  if (markerCode !== 126) return false;

  var scanned = state.scanDelims(state.pos, true);
  var markerCount = scanned.length;
  var marker = String.fromCharCode(markerCode);
  if (markerCount < 2) return false;

  if (markerCount % 2) {
    var token = state.push("text", "", 0);
    token.content = marker;
    markerCount--;
  }

  for (var index = 0; index < markerCount; index += 2) {
    token = state.push("text", "", 0);
    token.content = marker + marker;
    state.delimiters.push({
      marker: markerCode,
      length: 0,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;
  return true;
};

exports.postProcess = function markdownStrikethroughPostProcess(state) {
  processStrikethroughDelimiters(state, state.delimiters);
  for (var index = 0; index < state.tokens_meta.length; index++) {
    var metadata = state.tokens_meta[index];
    if (metadata && metadata.delimiters) processStrikethroughDelimiters(state, metadata.delimiters);
  }
};

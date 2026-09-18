var isSpace = require("./markdownUtils.js").isSpace;
var escapableCharacters = new Array(256).fill(0);

"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (character) {
  escapableCharacters[character.charCodeAt(0)] = 1;
});

module.exports = function markdownEscapeRule(state, silent) {
  var position = state.pos;
  var end = state.posMax;
  if (state.src.charCodeAt(position) !== 92) return false;

  position++;
  if (position < end) {
    var characterCode = state.src.charCodeAt(position);
    if (characterCode < 256 && escapableCharacters[characterCode] !== 0) {
      if (!silent) state.pending += state.src[position];
      state.pos += 2;
      return true;
    }

    if (characterCode === 10) {
      if (!silent) state.push("hardbreak", "br", 0);
      position++;
      while (position < end) {
        characterCode = state.src.charCodeAt(position);
        if (!isSpace(characterCode)) break;
        position++;
      }
      state.pos = position;
      return true;
    }
  }

  if (!silent) state.pending += "\\";
  state.pos++;
  return true;
};

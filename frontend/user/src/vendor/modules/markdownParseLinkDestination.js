var unescapeAll = require("./markdownUtils.js").unescapeAll;

function parseLinkDestination(source, position, maximumPosition) {
  var code;
  var parenthesisLevel;
  var lineCount = 0;
  var start = position;
  var result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ""
  };

  if (source.charCodeAt(position) === 0x3c) {
    position++;
    while (position < maximumPosition) {
      code = source.charCodeAt(position);
      if (code === 0x0a || code === 0x3c) return result;
      if (code === 0x3e) {
        result.pos = position + 1;
        result.str = unescapeAll(source.slice(start + 1, position));
        result.ok = true;
        return result;
      }
      if (code === 0x5c && position + 1 < maximumPosition) position += 2;
      else position++;
    }
    return result;
  }

  parenthesisLevel = 0;
  while (position < maximumPosition) {
    code = source.charCodeAt(position);
    if (code === 0x20 || code < 0x20 || code === 0x7f) break;

    if (code === 0x5c && position + 1 < maximumPosition) {
      if (source.charCodeAt(position + 1) === 0x20) break;
      position += 2;
      continue;
    }

    if (code === 0x28) {
      parenthesisLevel++;
      if (parenthesisLevel > 32) return result;
    }
    if (code === 0x29) {
      if (parenthesisLevel === 0) break;
      parenthesisLevel--;
    }
    position++;
  }

  if (start === position || parenthesisLevel !== 0) return result;

  result.str = unescapeAll(source.slice(start, position));
  result.lines = lineCount;
  result.pos = position;
  result.ok = true;
  return result;
}

module.exports = parseLinkDestination;

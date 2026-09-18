var unescapeAll = require("./markdownUtils.js").unescapeAll;

function parseLinkTitle(source, position, maximumPosition) {
  var code;
  var closingMarker;
  var lineCount = 0;
  var start = position;
  var result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ""
  };

  if (position >= maximumPosition) return result;

  closingMarker = source.charCodeAt(position);
  if (
    closingMarker !== 0x22 &&
    closingMarker !== 0x27 &&
    closingMarker !== 0x28
  ) {
    return result;
  }

  position++;
  if (closingMarker === 0x28) closingMarker = 0x29;

  while (position < maximumPosition) {
    code = source.charCodeAt(position);
    if (code === closingMarker) {
      result.pos = position + 1;
      result.lines = lineCount;
      result.str = unescapeAll(source.slice(start + 1, position));
      result.ok = true;
      return result;
    }
    if (code === 0x28 && closingMarker === 0x29) return result;

    if (code === 0x0a) lineCount++;
    else if (code === 0x5c && position + 1 < maximumPosition) {
      position++;
      if (source.charCodeAt(position) === 0x0a) lineCount++;
    }
    position++;
  }

  return result;
}

module.exports = parseLinkTitle;

var MarkdownToken = require("./markdownToken.js");
var isSpace = require("./markdownUtils.js").isSpace;

function MarkdownBlockState(source, md, env, tokens) {
  this.src = source;
  this.md = md;
  this.env = env;
  this.tokens = tokens;
  this.bMarks = [];
  this.eMarks = [];
  this.tShift = [];
  this.sCount = [];
  this.bsCount = [];
  this.blkIndent = 0;
  this.line = 0;
  this.lineMax = 0;
  this.tight = false;
  this.ddIndent = -1;
  this.listIndent = -1;
  this.parentType = "root";
  this.level = 0;
  this.result = "";

  var lineStart = 0;
  var indentChars = 0;
  var indentWidth = 0;
  var hasContent = false;
  for (var position = 0; position < source.length; position++) {
    var characterCode = source.charCodeAt(position);
    if (!hasContent) {
      if (isSpace(characterCode)) {
        indentChars++;
        indentWidth += characterCode === 9 ? 4 - indentWidth % 4 : 1;
        continue;
      }
      hasContent = true;
    }

    if (characterCode === 10 || position === source.length - 1) {
      if (characterCode !== 10) position++;
      this.bMarks.push(lineStart);
      this.eMarks.push(position);
      this.tShift.push(indentChars);
      this.sCount.push(indentWidth);
      this.bsCount.push(0);
      hasContent = false;
      indentChars = 0;
      indentWidth = 0;
      lineStart = position + 1;
    }
  }

  this.bMarks.push(source.length);
  this.eMarks.push(source.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);
  this.lineMax = this.bMarks.length - 1;
}

MarkdownBlockState.prototype.push = function (type, tag, nesting) {
  var token = new MarkdownToken(type, tag, nesting);
  token.block = true;
  if (nesting < 0) this.level--;
  token.level = this.level;
  if (nesting > 0) this.level++;
  this.tokens.push(token);
  return token;
};

MarkdownBlockState.prototype.isEmpty = function (line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

MarkdownBlockState.prototype.skipEmptyLines = function (line) {
  for (; line < this.lineMax; line++) {
    if (this.bMarks[line] + this.tShift[line] < this.eMarks[line]) break;
  }
  return line;
};

MarkdownBlockState.prototype.skipSpaces = function (position) {
  for (; position < this.src.length; position++) {
    if (!isSpace(this.src.charCodeAt(position))) break;
  }
  return position;
};

MarkdownBlockState.prototype.skipSpacesBack = function (position, minimum) {
  if (position <= minimum) return position;
  while (position > minimum) {
    if (!isSpace(this.src.charCodeAt(--position))) return position + 1;
  }
  return position;
};

MarkdownBlockState.prototype.skipChars = function (position, characterCode) {
  for (; position < this.src.length; position++) {
    if (this.src.charCodeAt(position) !== characterCode) break;
  }
  return position;
};

MarkdownBlockState.prototype.skipCharsBack = function (position, characterCode, minimum) {
  if (position <= minimum) return position;
  while (position > minimum) {
    if (characterCode !== this.src.charCodeAt(--position)) return position + 1;
  }
  return position;
};

MarkdownBlockState.prototype.getLines = function (startLine, endLine, indent, keepLastLineFeed) {
  if (startLine >= endLine) return "";

  var lines = new Array(endLine - startLine);
  for (var line = startLine, outputIndex = 0; line < endLine; line++, outputIndex++) {
    var lineIndent = 0;
    var lineStart = this.bMarks[line];
    var position = lineStart;
    var lineEnd = line + 1 < endLine || keepLastLineFeed ? this.eMarks[line] + 1 : this.eMarks[line];

    while (position < lineEnd && lineIndent < indent) {
      var characterCode = this.src.charCodeAt(position);
      if (isSpace(characterCode)) {
        lineIndent += characterCode === 9 ? 4 - (lineIndent + this.bsCount[line]) % 4 : 1;
      } else {
        if (position - lineStart >= this.tShift[line]) break;
        lineIndent++;
      }
      position++;
    }

    lines[outputIndex] = lineIndent > indent
      ? new Array(lineIndent - indent + 1).join(" ") + this.src.slice(position, lineEnd)
      : this.src.slice(position, lineEnd);
  }
  return lines.join("");
};

MarkdownBlockState.prototype.Token = MarkdownToken;

module.exports = MarkdownBlockState;

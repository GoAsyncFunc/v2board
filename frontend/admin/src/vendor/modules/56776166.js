let legacyModule = module,
  legacyExports = exports;
var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
  i = "[^\"'=<>`\\x00-\\x20]+",
  o = "'[^']*'",
  a = '"[^"]*"',
  s = "(?:" + i + "|" + o + "|" + a + ")",
  l = "(?:\\s+" + r + "(?:\\s*=\\s*" + s + ")?)",
  u = "<[A-Za-z][A-Za-z0-9\\-]*" + l + "*\\s*\\/?>",
  c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
  f = "\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e",
  d = "<[?][\\s\\S]*?[?]>",
  h = "<![A-Z]+\\s+[^>]*>",
  p = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  g = new RegExp("^(?:" + u + "|" + c + "|" + f + "|" + d + "|" + h + "|" + p + ")"),
  m = new RegExp("^(?:" + u + "|" + c + ")");
legacyModule.exports.HTML_TAG_RE = g, legacyModule.exports.HTML_OPEN_CLOSE_TAG_RE = m;

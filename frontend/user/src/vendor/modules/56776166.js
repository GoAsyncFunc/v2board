let legacyModule = module,
  legacyExports = exports;
var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
  o = "[^\"'=<>`\\x00-\\x20]+",
  i = "'[^']*'",
  a = '"[^"]*"',
  s = "(?:" + o + "|" + i + "|" + a + ")",
  c = "(?:\\s+" + r + "(?:\\s*=\\s*" + s + ")?)",
  u = "<[A-Za-z][A-Za-z0-9\\-]*" + c + "*\\s*\\/?>",
  l = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
  f = "\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e",
  p = "<[?][\\s\\S]*?[?]>",
  d = "<![A-Z]+\\s+[^>]*>",
  h = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  m = new RegExp("^(?:" + u + "|" + l + "|" + f + "|" + p + "|" + d + "|" + h + ")"),
  v = new RegExp("^(?:" + u + "|" + l + ")");
legacyModule.exports.HTML_TAG_RE = m, legacyModule.exports.HTML_OPEN_CLOSE_TAG_RE = v;

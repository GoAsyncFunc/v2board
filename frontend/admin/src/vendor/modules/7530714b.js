let legacyModule = module,
  legacyExports = exports;
var r = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
  i = /\((c|tm|r|p)\)/i,
  o = /\((c|tm|r|p)\)/gi,
  a = {
    c: "\xa9",
    r: "\xae",
    p: "\xa7",
    tm: "\u2122"
  };
function s(e, t) {
  return a[t.toLowerCase()];
}
function l(e) {
  var t,
    n,
    r = 0;
  for (t = e.length - 1; t >= 0; t--) n = e[t], "text" !== n.type || r || (n.content = n.content.replace(o, s)), "link_open" === n.type && "auto" === n.info && r--, "link_close" === n.type && "auto" === n.info && r++;
}
function u(e) {
  var t,
    n,
    i = 0;
  for (t = e.length - 1; t >= 0; t--) n = e[t], "text" !== n.type || i || r.test(n.content) && (n.content = n.content.replace(/\+-/g, "\xb1").replace(/\.{2,}/g, "\u2026").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1\u2014").replace(/(^|\s)--(?=\s|$)/gm, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1\u2013")), "link_open" === n.type && "auto" === n.info && i--, "link_close" === n.type && "auto" === n.info && i++;
}
legacyModule.exports = function (e) {
  var t;
  if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && (i.test(e.tokens[t].content) && l(e.tokens[t].children), r.test(e.tokens[t].content) && u(e.tokens[t].children));
};

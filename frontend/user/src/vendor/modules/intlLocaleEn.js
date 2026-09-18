let legacyModule = module,
  legacyExports = exports;
legacyExports["default"] = {
  locale: "en",
  pluralRuleFunction: function (e, t) {
    var n = String(e).split("."),
      r = !n[1],
      o = Number(n[0]) == e,
      i = o && n[0].slice(-1),
      a = o && n[0].slice(-2);
    return t ? 1 == i && 11 != a ? "one" : 2 == i && 12 != a ? "two" : 3 == i && 13 != a ? "few" : "other" : 1 == e && r ? "one" : "other";
  }
};

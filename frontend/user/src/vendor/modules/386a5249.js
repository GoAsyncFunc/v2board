let legacyModule = module,
  legacyExports = exports;
var r = "%[a-f0-9]{2}",
  o = new RegExp(r, "gi"),
  i = new RegExp("(" + r + ")+", "gi");
function a(e, t) {
  try {
    return decodeURIComponent(e.join(""));
  } catch (e) {}
  if (1 === e.length) return e;
  t = t || 1;
  var n = e.slice(0, t),
    r = e.slice(t);
  return Array.prototype.concat.call([], a(n), a(r));
}
function s(e) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    for (var t = e.match(o), n = 1; n < t.length; n++) e = a(t, n).join(""), t = e.match(o);
    return e;
  }
}
function c(e) {
  var t = {
      "%FE%FF": "\ufffd\ufffd",
      "%FF%FE": "\ufffd\ufffd"
    },
    n = i.exec(e);
  while (n) {
    try {
      t[n[0]] = decodeURIComponent(n[0]);
    } catch (e) {
      var r = s(n[0]);
      r !== n[0] && (t[n[0]] = r);
    }
    n = i.exec(e);
  }
  t["%C2"] = "\ufffd";
  for (var o = Object.keys(t), a = 0; a < o.length; a++) {
    var c = o[a];
    e = e.replace(new RegExp(c, "g"), t[c]);
  }
  return e;
}
legacyModule.exports = function (e) {
  if ("string" !== typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return e = e.replace(/\+/g, " "), decodeURIComponent(e);
  } catch (t) {
    return c(e);
  }
};

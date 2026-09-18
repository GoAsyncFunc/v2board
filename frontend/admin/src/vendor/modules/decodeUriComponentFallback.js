let legacyModule = module,
  legacyExports = exports;
var r = "%[a-f0-9]{2}",
  i = new RegExp("(" + r + ")|([^%]+?)", "gi"),
  o = new RegExp("(" + r + ")+", "gi");
function decodeUriComponentParts(parts, index) {
  try {
    return [decodeURIComponent(parts.join(""))];
  } catch (e) {}
  if (1 === parts.length) return parts;
  index = index || 1;
  var n = parts.slice(0, index),
    r = parts.slice(index);
  return Array.prototype.concat.call([], decodeUriComponentParts(n), decodeUriComponentParts(r));
}
function decodeUriComponentChunk(value) {
  try {
    return decodeURIComponent(value);
  } catch (r) {
    for (var t = value.match(i) || [], n = 1; n < t.length; n++) value = decodeUriComponentParts(t, n).join(""), t = value.match(i) || [];
    return value;
  }
}
function decodeUriComponentFallback(value) {
  var t = {
      "%FE%FF": "\ufffd\ufffd",
      "%FF%FE": "\ufffd\ufffd"
    },
    n = o.exec(value);
  while (n) {
    try {
      t[n[0]] = decodeURIComponent(n[0]);
    } catch (e) {
      var r = decodeUriComponentChunk(n[0]);
      r !== n[0] && (t[n[0]] = r);
    }
    n = o.exec(value);
  }
  t["%C2"] = "\ufffd";
  for (var i = Object.keys(t), a = 0; a < i.length; a++) {
    var l = i[a];
    value = value.replace(new RegExp(l, "g"), t[l]);
  }
  return value;
}
legacyModule.exports = function decodeUriComponent(value) {
  if ("string" !== typeof value) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof value + "`");
  try {
    return value = value.replace(/\+/g, " "), decodeURIComponent(value);
  } catch (t) {
    return decodeUriComponentFallback(value);
  }
};

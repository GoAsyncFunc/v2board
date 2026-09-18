let legacyModule = module,
  legacyExports = exports;
var r = "%[a-f0-9]{2}",
  o = new RegExp(r, "gi"),
  i = new RegExp("(" + r + ")+", "gi");
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
    for (var t = value.match(o) || [], n = 1; n < t.length; n++) value = decodeUriComponentParts(t, n).join(""), t = value.match(o) || [];
    return value;
  }
}
function decodeUriComponentFallback(value) {
  var t = {
      "%FE%FF": "\ufffd\ufffd",
      "%FF%FE": "\ufffd\ufffd"
    },
    n = i.exec(value);
  while (n) {
    try {
      t[n[0]] = decodeURIComponent(n[0]);
    } catch (e) {
      var r = decodeUriComponentChunk(n[0]);
      r !== n[0] && (t[n[0]] = r);
    }
    n = i.exec(value);
  }
  t["%C2"] = "\ufffd";
  for (var o = Object.keys(t), a = 0; a < o.length; a++) {
    var c = o[a];
    value = value.replace(new RegExp(c, "g"), t[c]);
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

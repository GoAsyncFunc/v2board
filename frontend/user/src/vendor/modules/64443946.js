let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./isIndex.js"),
  a = require("./isObjectLikeLegacy.js"),
  o = "[object Arguments]",
  u = "[object Array]",
  l = "[object Boolean]",
  s = "[object Date]",
  c = "[object Error]",
  f = "[object Function]",
  d = "[object Map]",
  h = "[object Number]",
  p = "[object Object]",
  m = "[object RegExp]",
  v = "[object Set]",
  g = "[object String]",
  y = "[object WeakMap]",
  b = "[object ArrayBuffer]",
  _ = "[object DataView]",
  w = "[object Float32Array]",
  k = "[object Float64Array]",
  S = "[object Int8Array]",
  x = "[object Int16Array]",
  T = "[object Int32Array]",
  E = "[object Uint8Array]",
  M = "[object Uint8ClampedArray]",
  C = "[object Uint16Array]",
  O = "[object Uint32Array]",
  D = {};
function P(e) {
  return a(e) && i(e.length) && !!D[r(e)];
}
D[w] = D[k] = D[S] = D[x] = D[T] = D[E] = D[M] = D[C] = D[O] = !0, D[o] = D[u] = D[b] = D[l] = D[_] = D[s] = D[c] = D[f] = D[d] = D[h] = D[p] = D[m] = D[v] = D[g] = D[y] = !1, legacyModule.exports = P;

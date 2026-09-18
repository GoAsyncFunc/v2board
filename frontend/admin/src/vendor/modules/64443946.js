let legacyModule = module,
  legacyExports = exports;
var r = require("./4e796b4b.js"),
  i = require("./isIndex.js"),
  o = require("./isObjectLikeLegacy.js"),
  a = "[object Arguments]",
  s = "[object Array]",
  l = "[object Boolean]",
  u = "[object Date]",
  c = "[object Error]",
  f = "[object Function]",
  d = "[object Map]",
  h = "[object Number]",
  p = "[object Object]",
  g = "[object RegExp]",
  m = "[object Set]",
  v = "[object String]",
  y = "[object WeakMap]",
  b = "[object ArrayBuffer]",
  x = "[object DataView]",
  _ = "[object Float32Array]",
  w = "[object Float64Array]",
  O = "[object Int8Array]",
  S = "[object Int16Array]",
  k = "[object Int32Array]",
  j = "[object Uint8Array]",
  M = "[object Uint8ClampedArray]",
  C = "[object Uint16Array]",
  T = "[object Uint32Array]",
  I = {};
function D(e) {
  return o(e) && i(e.length) && !!I[r(e)];
}
I[_] = I[w] = I[O] = I[S] = I[k] = I[j] = I[M] = I[C] = I[T] = !0, I[a] = I[s] = I[b] = I[l] = I[x] = I[u] = I[c] = I[f] = I[d] = I[h] = I[p] = I[g] = I[m] = I[v] = I[y] = !1, legacyModule.exports = D;

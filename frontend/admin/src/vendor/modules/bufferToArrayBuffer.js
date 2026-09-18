let legacyModule = module,
  legacyExports = exports;
var r = require("./746a6c41.js").Buffer;
legacyModule.exports = function (e) {
  if (e instanceof Uint8Array) {
    if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;
    if ("function" === typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
  }
  if (r.isBuffer(e)) {
    for (var t = new Uint8Array(e.length), n = e.length, i = 0; i < n; i++) t[i] = e[i];
    return t.buffer;
  }
  throw new Error("Argument must be a Buffer");
};

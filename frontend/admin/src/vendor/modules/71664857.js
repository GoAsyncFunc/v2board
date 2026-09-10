let legacyModule = module,
  legacyExports = exports;
(function (e) {
  legacyExports.fetch = s(e.fetch) && s(e.ReadableStream), legacyExports.writableStream = s(e.WritableStream), legacyExports.abortController = s(e.AbortController), legacyExports.blobConstructor = !1;
  try {
    new Blob([new ArrayBuffer(1)]), legacyExports.blobConstructor = !0;
  } catch (e) {}
  var n;
  function r() {
    if (void 0 !== n) return n;
    if (e.XMLHttpRequest) {
      n = new e.XMLHttpRequest();
      try {
        n.open("GET", e.XDomainRequest ? "/" : "https://example.com");
      } catch (e) {
        n = null;
      }
    } else n = null;
    return n;
  }
  function i(e) {
    var t = r();
    if (!t) return !1;
    try {
      return t.responseType = e, t.responseType === e;
    } catch (e) {}
    return !1;
  }
  var o = "undefined" !== typeof e.ArrayBuffer,
    a = o && s(e.ArrayBuffer.prototype.slice);
  function s(e) {
    return "function" === typeof e;
  }
  legacyExports.arraybuffer = legacyExports.fetch || o && i("arraybuffer"), legacyExports.msstream = !legacyExports.fetch && a && i("ms-stream"), legacyExports.mozchunkedarraybuffer = !legacyExports.fetch && o && i("moz-chunked-arraybuffer"), legacyExports.overrideMimeType = legacyExports.fetch || !!r() && s(r().overrideMimeType), legacyExports.vbArray = s(e.VBArray), n = null;
}).call(this, require("./794c706a.js"));

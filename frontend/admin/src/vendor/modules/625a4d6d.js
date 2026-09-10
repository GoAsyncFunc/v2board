let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "Headers", function () {
  return h;
}), defineExport(legacyExports, "Request", function () {
  return x;
}), defineExport(legacyExports, "Response", function () {
  return S;
}), defineExport(legacyExports, "DOMException", function () {
  return C;
}), defineExport(legacyExports, "fetch", function () {
  return O;
});
var r = "undefined" !== typeof globalThis && globalThis || "undefined" !== typeof self && self || "undefined" !== typeof r && r,
  i = {
    searchParams: "URLSearchParams" in r,
    iterable: "Symbol" in r && "iterator" in Symbol,
    blob: "FileReader" in r && "Blob" in r && function () {
      try {
        return new Blob(), !0;
      } catch (e) {
        return !1;
      }
    }(),
    formData: "FormData" in r,
    arrayBuffer: "ArrayBuffer" in r
  };
function o(e) {
  return e && DataView.prototype.isPrototypeOf(e);
}
if (i.arrayBuffer) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
  s = ArrayBuffer.isView || function (e) {
    return e && a.indexOf(Object.prototype.toString.call(e)) > -1;
  };
function l(e) {
  if ("string" !== typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e) throw new TypeError('Invalid character in header field name: "' + e + '"');
  return e.toLowerCase();
}
function c(e) {
  return "string" !== typeof e && (e = String(e)), e;
}
function u(e) {
  var t = {
    next: function () {
      var t = e.shift();
      return {
        done: void 0 === t,
        value: t
      };
    }
  };
  return i.iterable && (t[Symbol.iterator] = function () {
    return t;
  }), t;
}
function h(e) {
  this.map = {}, e instanceof h ? e.forEach(function (e, t) {
    this.append(t, e);
  }, this) : Array.isArray(e) ? e.forEach(function (e) {
    this.append(e[0], e[1]);
  }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
    this.append(t, e[t]);
  }, this);
}
function f(e) {
  if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
  e.bodyUsed = !0;
}
function d(e) {
  return new Promise(function (t, n) {
    e.onload = function () {
      t(e.result);
    }, e.onerror = function () {
      n(e.error);
    };
  });
}
function p(e) {
  var t = new FileReader(),
    n = d(t);
  return t.readAsArrayBuffer(e), n;
}
function m(e) {
  var t = new FileReader(),
    n = d(t);
  return t.readAsText(e), n;
}
function g(e) {
  for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
  return n.join("");
}
function v(e) {
  if (e.slice) return e.slice(0);
  var t = new Uint8Array(e.byteLength);
  return t.set(new Uint8Array(e)), t.buffer;
}
function y() {
  return this.bodyUsed = !1, this._initBody = function (e) {
    this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? "string" === typeof e ? this._bodyText = e : i.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : i.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : i.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : i.arrayBuffer && i.blob && o(e) ? (this._bodyArrayBuffer = v(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : i.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || s(e)) ? this._bodyArrayBuffer = v(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" === typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : i.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
  }, i.blob && (this.blob = function () {
    var e = f(this);
    if (e) return e;
    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
    if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
    if (this._bodyFormData) throw new Error("could not read FormData body as blob");
    return Promise.resolve(new Blob([this._bodyText]));
  }, this.arrayBuffer = function () {
    if (this._bodyArrayBuffer) {
      var e = f(this);
      return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer));
    }
    return this.blob().then(p);
  }), this.text = function () {
    var e = f(this);
    if (e) return e;
    if (this._bodyBlob) return m(this._bodyBlob);
    if (this._bodyArrayBuffer) return Promise.resolve(g(this._bodyArrayBuffer));
    if (this._bodyFormData) throw new Error("could not read FormData body as text");
    return Promise.resolve(this._bodyText);
  }, i.formData && (this.formData = function () {
    return this.text().then(_);
  }), this.json = function () {
    return this.text().then(JSON.parse);
  }, this;
}
h.prototype.append = function (e, t) {
  e = l(e), t = c(t);
  var n = this.map[e];
  this.map[e] = n ? n + ", " + t : t;
}, h.prototype["delete"] = function (e) {
  delete this.map[l(e)];
}, h.prototype.get = function (e) {
  return e = l(e), this.has(e) ? this.map[e] : null;
}, h.prototype.has = function (e) {
  return this.map.hasOwnProperty(l(e));
}, h.prototype.set = function (e, t) {
  this.map[l(e)] = c(t);
}, h.prototype.forEach = function (e, t) {
  for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
}, h.prototype.keys = function () {
  var e = [];
  return this.forEach(function (t, n) {
    e.push(n);
  }), u(e);
}, h.prototype.values = function () {
  var e = [];
  return this.forEach(function (t) {
    e.push(t);
  }), u(e);
}, h.prototype.entries = function () {
  var e = [];
  return this.forEach(function (t, n) {
    e.push([n, t]);
  }), u(e);
}, i.iterable && (h.prototype[Symbol.iterator] = h.prototype.entries);
var b = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
function w(e) {
  var t = e.toUpperCase();
  return b.indexOf(t) > -1 ? t : e;
}
function x(e, t) {
  if (!(this instanceof x)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t = t || {};
  var n = t.body;
  if (e instanceof x) {
    if (e.bodyUsed) throw new TypeError("Already read");
    this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new h(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0);
  } else this.url = String(e);
  if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new h(t.headers)), this.method = w(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
  if (this._initBody(n), ("GET" === this.method || "HEAD" === this.method) && ("no-store" === t.cache || "no-cache" === t.cache)) {
    var r = /([?&])_=[^&]*/;
    if (r.test(this.url)) this.url = this.url.replace(r, "$1_=" + new Date().getTime());else {
      var i = /\?/;
      this.url += (i.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
    }
  }
}
function _(e) {
  var t = new FormData();
  return e.trim().split("&").forEach(function (e) {
    if (e) {
      var n = e.split("="),
        r = n.shift().replace(/\+/g, " "),
        i = n.join("=").replace(/\+/g, " ");
      t.append(decodeURIComponent(r), decodeURIComponent(i));
    }
  }), t;
}
function E(e) {
  var t = new h(),
    n = e.replace(/\r?\n[\t ]+/g, " ");
  return n.split("\r").map(function (e) {
    return 0 === e.indexOf("\n") ? e.substr(1, e.length) : e;
  }).forEach(function (e) {
    var n = e.split(":"),
      r = n.shift().trim();
    if (r) {
      var i = n.join(":").trim();
      t.append(r, i);
    }
  }), t;
}
function S(e, t) {
  if (!(this instanceof S)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = void 0 === t.statusText ? "" : "" + t.statusText, this.headers = new h(t.headers), this.url = t.url || "", this._initBody(e);
}
x.prototype.clone = function () {
  return new x(this, {
    body: this._bodyInit
  });
}, y.call(x.prototype), y.call(S.prototype), S.prototype.clone = function () {
  return new S(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new h(this.headers),
    url: this.url
  });
}, S.error = function () {
  var e = new S(null, {
    status: 0,
    statusText: ""
  });
  return e.type = "error", e;
};
var k = [301, 302, 303, 307, 308];
S.redirect = function (e, t) {
  if (-1 === k.indexOf(t)) throw new RangeError("Invalid status code");
  return new S(null, {
    status: t,
    headers: {
      location: e
    }
  });
};
var C = r.DOMException;
try {
  new C();
} catch (e) {
  C = function (e, t) {
    this.message = e, this.name = t;
    var n = Error(e);
    this.stack = n.stack;
  }, C.prototype = Object.create(Error.prototype), C.prototype.constructor = C;
}
function O(e, t) {
  return new Promise(function (n, o) {
    var a = new x(e, t);
    if (a.signal && a.signal.aborted) return o(new C("Aborted", "AbortError"));
    var s = new XMLHttpRequest();
    function l() {
      s.abort();
    }
    function u(e) {
      try {
        return "" === e && r.location.href ? r.location.href : e;
      } catch (t) {
        return e;
      }
    }
    s.onload = function () {
      var e = {
        status: s.status,
        statusText: s.statusText,
        headers: E(s.getAllResponseHeaders() || "")
      };
      e.url = "responseURL" in s ? s.responseURL : e.headers.get("X-Request-URL");
      var t = "response" in s ? s.response : s.responseText;
      setTimeout(function () {
        n(new S(t, e));
      }, 0);
    }, s.onerror = function () {
      setTimeout(function () {
        o(new TypeError("Network request failed"));
      }, 0);
    }, s.ontimeout = function () {
      setTimeout(function () {
        o(new TypeError("Network request failed"));
      }, 0);
    }, s.onabort = function () {
      setTimeout(function () {
        o(new C("Aborted", "AbortError"));
      }, 0);
    }, s.open(a.method, u(a.url), !0), "include" === a.credentials ? s.withCredentials = !0 : "omit" === a.credentials && (s.withCredentials = !1), "responseType" in s && (i.blob ? s.responseType = "blob" : i.arrayBuffer && a.headers.get("Content-Type") && -1 !== a.headers.get("Content-Type").indexOf("application/octet-stream") && (s.responseType = "arraybuffer")), !t || "object" !== typeof t.headers || t.headers instanceof h ? a.headers.forEach(function (e, t) {
      s.setRequestHeader(t, e);
    }) : Object.getOwnPropertyNames(t.headers).forEach(function (e) {
      s.setRequestHeader(e, c(t.headers[e]));
    }), a.signal && (a.signal.addEventListener("abort", l), s.onreadystatechange = function () {
      4 === s.readyState && a.signal.removeEventListener("abort", l);
    }), s.send("undefined" === typeof a._bodyInit ? null : a._bodyInit);
  });
}
O.polyfill = !0, r.fetch || (r.fetch = O, r.Headers = h, r.Request = x, r.Response = S);

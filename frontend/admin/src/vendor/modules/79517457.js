let legacyModule = module,
  legacyExports = exports;
(function (e, r, i) {
  var o = require("./71664857.js"),
    a = require("./5037584d.js"),
    s = require("./34334b49.js"),
    l = legacyExports.readyStates = {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    },
    c = legacyExports.IncomingMessage = function (t, n, a, l) {
      var c = this;
      if (s.Readable.call(c), c._mode = a, c.headers = {}, c.rawHeaders = [], c.trailers = {}, c.rawTrailers = [], c.on("end", function () {
        e.nextTick(function () {
          c.emit("close");
        });
      }), "fetch" === a) {
        if (c._fetchResponse = n, c.url = n.url, c.statusCode = n.status, c.statusMessage = n.statusText, n.headers.forEach(function (e, t) {
          c.headers[t.toLowerCase()] = e, c.rawHeaders.push(t, e);
        }), o.writableStream) {
          var u = new WritableStream({
            write: function (e) {
              return new Promise(function (t, n) {
                c._destroyed ? n() : c.push(new r(e)) ? t() : c._resumeFetch = t;
              });
            },
            close: function () {
              i.clearTimeout(l), c._destroyed || c.push(null);
            },
            abort: function (e) {
              c._destroyed || c.emit("error", e);
            }
          });
          try {
            return void n.body.pipeTo(u).catch(function (e) {
              i.clearTimeout(l), c._destroyed || c.emit("error", e);
            });
          } catch (e) {}
        }
        var h = n.body.getReader();
        function f() {
          h.read().then(function (e) {
            if (!c._destroyed) {
              if (e.done) return i.clearTimeout(l), void c.push(null);
              c.push(new r(e.value)), f();
            }
          }).catch(function (e) {
            i.clearTimeout(l), c._destroyed || c.emit("error", e);
          });
        }
        f();
      } else {
        c._xhr = t, c._pos = 0, c.url = t.responseURL, c.statusCode = t.status, c.statusMessage = t.statusText;
        var d = t.getAllResponseHeaders().split(/\r?\n/);
        if (d.forEach(function (e) {
          var t = e.match(/^([^:]+):\s*(.*)/);
          if (t) {
            var n = t[1].toLowerCase();
            "set-cookie" === n ? (void 0 === c.headers[n] && (c.headers[n] = []), c.headers[n].push(t[2])) : void 0 !== c.headers[n] ? c.headers[n] += ", " + t[2] : c.headers[n] = t[2], c.rawHeaders.push(t[1], t[2]);
          }
        }), c._charset = "x-user-defined", !o.overrideMimeType) {
          var p = c.rawHeaders["mime-type"];
          if (p) {
            var m = p.match(/;\s*charset=([^;])(;|$)/);
            m && (c._charset = m[1].toLowerCase());
          }
          c._charset || (c._charset = "utf-8");
        }
      }
    };
  a(c, s.Readable), c.prototype._read = function () {
    var e = this,
      t = e._resumeFetch;
    t && (e._resumeFetch = null, t());
  }, c.prototype._onXHRProgress = function () {
    var e = this,
      t = e._xhr,
      n = null;
    switch (e._mode) {
      case "text:vbarray":
        if (t.readyState !== l.DONE) break;
        try {
          n = new i.VBArray(t.responseBody).toArray();
        } catch (e) {}
        if (null !== n) {
          e.push(new r(n));
          break;
        }
      case "text":
        try {
          n = t.responseText;
        } catch (t) {
          e._mode = "text:vbarray";
          break;
        }
        if (n.length > e._pos) {
          var o = n.substr(e._pos);
          if ("x-user-defined" === e._charset) {
            for (var a = new r(o.length), s = 0; s < o.length; s++) a[s] = 255 & o.charCodeAt(s);
            e.push(a);
          } else e.push(o, e._charset);
          e._pos = n.length;
        }
        break;
      case "arraybuffer":
        if (t.readyState !== l.DONE || !t.response) break;
        n = t.response, e.push(new r(new Uint8Array(n)));
        break;
      case "moz-chunked-arraybuffer":
        if (n = t.response, t.readyState !== l.LOADING || !n) break;
        e.push(new r(new Uint8Array(n)));
        break;
      case "ms-stream":
        if (n = t.response, t.readyState !== l.LOADING) break;
        var c = new i.MSStreamReader();
        c.onprogress = function () {
          c.result.byteLength > e._pos && (e.push(new r(new Uint8Array(c.result.slice(e._pos)))), e._pos = c.result.byteLength);
        }, c.onload = function () {
          e.push(null);
        }, c.readAsArrayBuffer(n);
        break;
    }
    e._xhr.readyState === l.DONE && "ms-stream" !== e._mode && e.push(null);
  };
}).call(this, require("./51324967.js"), require("./746a6c41.js").Buffer, require("./794c706a.js"));

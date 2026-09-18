let legacyModule = module,
  legacyExports = exports;
(function (t, r, i) {
  var o = require("./browserTransportFeatures.js"),
    a = require("./nodeInheritsOptional.js"),
    s = require("./incomingMessageRuntime.js"),
    l = require("./streamRuntime.js"),
    c = require("./bufferToArrayBuffer.js"),
    u = s.IncomingMessage,
    h = s.readyStates;
  function f(e, t) {
    return o.fetch && t ? "fetch" : o.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : o.msstream ? "ms-stream" : o.arraybuffer && e ? "arraybuffer" : o.vbArray && e ? "text:vbarray" : "text";
  }
  var d = legacyModule.exports = function (e) {
    var n,
      r = this;
    l.Writable.call(r), r._opts = e, r._body = [], r._headers = {}, e.auth && r.setHeader("Authorization", "Basic " + new t(e.auth).toString("base64")), Object.keys(e.headers).forEach(function (t) {
      r.setHeader(t, e.headers[t]);
    });
    var i = !0;
    if ("disable-fetch" === e.mode || "requestTimeout" in e && !o.abortController) i = !1, n = !0;else if ("prefer-streaming" === e.mode) n = !1;else if ("allow-wrong-content-type" === e.mode) n = !o.overrideMimeType;else {
      if (e.mode && "default" !== e.mode && "prefer-fast" !== e.mode) throw new Error("Invalid value for opts.mode");
      n = !0;
    }
    r._mode = f(n, i), r._fetchTimer = null, r.on("finish", function () {
      r._onFinish();
    });
  };
  function p(e) {
    try {
      var t = e.status;
      return null !== t && 0 !== t;
    } catch (e) {
      return !1;
    }
  }
  a(d, l.Writable), d.prototype.setHeader = function (e, t) {
    var n = this,
      r = e.toLowerCase();
    -1 === m.indexOf(r) && (n._headers[r] = {
      name: e,
      value: t
    });
  }, d.prototype.getHeader = function (e) {
    var t = this._headers[e.toLowerCase()];
    return t ? t.value : null;
  }, d.prototype.removeHeader = function (e) {
    var t = this;
    delete t._headers[e.toLowerCase()];
  }, d.prototype._onFinish = function () {
    var e = this;
    if (!e._destroyed) {
      var n = e._opts,
        a = e._headers,
        s = null;
      "GET" !== n.method && "HEAD" !== n.method && (s = o.arraybuffer ? c(t.concat(e._body)) : o.blobConstructor ? new r.Blob(e._body.map(function (e) {
        return c(e);
      }), {
        type: (a["content-type"] || {}).value || ""
      }) : t.concat(e._body).toString());
      var l = [];
      if (Object.keys(a).forEach(function (e) {
        var t = a[e].name,
          n = a[e].value;
        Array.isArray(n) ? n.forEach(function (e) {
          l.push([t, e]);
        }) : l.push([t, n]);
      }), "fetch" === e._mode) {
        var u = null;
        if (o.abortController) {
          var f = new AbortController();
          u = f.signal, e._fetchAbortController = f, "requestTimeout" in n && 0 !== n.requestTimeout && (e._fetchTimer = r.setTimeout(function () {
            e.emit("requestTimeout"), e._fetchAbortController && e._fetchAbortController.abort();
          }, n.requestTimeout));
        }
        r.fetch(e._opts.url, {
          method: e._opts.method,
          headers: l,
          body: s || void 0,
          mode: "cors",
          credentials: n.withCredentials ? "include" : "same-origin",
          signal: u
        }).then(function (t) {
          e._fetchResponse = t, e._connect();
        }, function (t) {
          r.clearTimeout(e._fetchTimer), e._destroyed || e.emit("error", t);
        });
      } else {
        var d = e._xhr = new r.XMLHttpRequest();
        try {
          d.open(e._opts.method, e._opts.url, !0);
        } catch (t) {
          return void i.nextTick(function () {
            e.emit("error", t);
          });
        }
        "responseType" in d && (d.responseType = e._mode.split(":")[0]), "withCredentials" in d && (d.withCredentials = !!n.withCredentials), "text" === e._mode && "overrideMimeType" in d && d.overrideMimeType("text/plain; charset=x-user-defined"), "requestTimeout" in n && (d.timeout = n.requestTimeout, d.ontimeout = function () {
          e.emit("requestTimeout");
        }), l.forEach(function (e) {
          d.setRequestHeader(e[0], e[1]);
        }), e._response = null, d.onreadystatechange = function () {
          switch (d.readyState) {
            case h.LOADING:
            case h.DONE:
              e._onXHRProgress();
              break;
          }
        }, "moz-chunked-arraybuffer" === e._mode && (d.onprogress = function () {
          e._onXHRProgress();
        }), d.onerror = function () {
          e._destroyed || e.emit("error", new Error("XHR error"));
        };
        try {
          d.send(s);
        } catch (t) {
          return void i.nextTick(function () {
            e.emit("error", t);
          });
        }
      }
    }
  }, d.prototype._onXHRProgress = function () {
    var e = this;
    p(e._xhr) && !e._destroyed && (e._response || e._connect(), e._response._onXHRProgress());
  }, d.prototype._connect = function () {
    var e = this;
    e._destroyed || (e._response = new u(e._xhr, e._fetchResponse, e._mode, e._fetchTimer), e._response.on("error", function (t) {
      e.emit("error", t);
    }), e.emit("response", e._response));
  }, d.prototype._write = function (e, t, n) {
    var r = this;
    r._body.push(e), n();
  }, d.prototype.abort = d.prototype.destroy = function () {
    var e = this;
    e._destroyed = !0, r.clearTimeout(e._fetchTimer), e._response && (e._response._destroyed = !0), e._xhr ? e._xhr.abort() : e._fetchAbortController && e._fetchAbortController.abort();
  }, d.prototype.end = function (e, t, n) {
    var r = this;
    "function" === typeof e && (n = e, e = void 0), l.Writable.prototype.end.call(r, e, t, n);
  }, d.prototype.flushHeaders = function () {}, d.prototype.setTimeout = function () {}, d.prototype.setNoDelay = function () {}, d.prototype.setSocketKeepAlive = function () {};
  var m = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];
}).call(this, require("./746a6c41.js").Buffer, require("./globalObjectLegacy.js"), require("./processRuntime.js"));

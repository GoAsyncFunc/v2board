let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./6b6c3541.js"),
    i = require("./79517457.js"),
    o = require("./55366a79.js"),
    a = require("./6a415748.js"),
    s = require("./43785930.js"),
    l = legacyExports;
  l.request = function (t, n) {
    t = "string" === typeof t ? s.parse(t) : o(t);
    var i = -1 === e.location.protocol.search(/^https?:$/) ? "http:" : "",
      a = t.protocol || i,
      l = t.hostname || t.host,
      c = t.port,
      u = t.path || "/";
    l && -1 !== l.indexOf(":") && (l = "[" + l + "]"), t.url = (l ? a + "//" + l : "") + (c ? ":" + c : "") + u, t.method = (t.method || "GET").toUpperCase(), t.headers = t.headers || {};
    var h = new r(t);
    return n && h.on("response", n), h;
  }, l.get = function (e, t) {
    var n = l.request(e, t);
    return n.end(), n;
  }, l.ClientRequest = r, l.IncomingMessage = i.IncomingMessage, l.Agent = function () {}, l.Agent.defaultMaxSockets = 4, l.globalAgent = new l.Agent(), l.STATUS_CODES = a, l.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
}).call(this, require("./globalObjectLegacy.js"));

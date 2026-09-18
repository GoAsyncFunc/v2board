let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0, legacyExports.locationsAreEqual = legacyExports.createLocation = void 0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  i = require("./2f516879.js"),
  o = h(i),
  a = require("./62726455.js"),
  s = h(a),
  l = require("./4677725a.js"),
  c = require("./queryStringRuntime.js"),
  u = h(c);
function h(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.createLocation = function (e, t, n, i) {
  var a = void 0;
  "string" === typeof e ? (a = (0, l.parsePath)(e), a.query = a.search ? u.default.parse(a.search) : {}, a.state = t) : (a = r({}, e), void 0 === a.pathname && (a.pathname = ""), a.search ? ("?" !== a.search.charAt(0) && (a.search = "?" + a.search), a.query = u.default.parse(a.search)) : (a.search = a.query ? u.default.stringify(a.query) : "", a.query = a.query || {}), a.hash ? "#" !== a.hash.charAt(0) && (a.hash = "#" + a.hash) : a.hash = "", void 0 !== t && void 0 === a.state && (a.state = t));
  try {
    a.pathname = decodeURI(a.pathname);
  } catch (e) {
    throw e instanceof URIError ? new URIError('Pathname "' + a.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e;
  }
  return n && (a.key = n), i ? a.pathname ? "/" !== a.pathname.charAt(0) && (a.pathname = (0, o.default)(a.pathname, i.pathname)) : a.pathname = i.pathname : a.pathname || (a.pathname = "/"), a;
}, legacyExports.locationsAreEqual = function (e, t) {
  return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && (0, s.default)(e.state, t.state);
};

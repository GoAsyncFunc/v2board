let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
legacyExports.addLeadingSlash = function (e) {
  return "/" === e.charAt(0) ? e : "/" + e;
}, legacyExports.stripLeadingSlash = function (e) {
  return "/" === e.charAt(0) ? e.substr(1) : e;
};
var r = legacyExports.hasBasename = function (e, t) {
  return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e);
};
legacyExports.stripBasename = function (e, t) {
  return r(e, t) ? e.substr(t.length) : e;
}, legacyExports.stripTrailingSlash = function (e) {
  return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
}, legacyExports.parsePath = function (e) {
  var t = e || "/",
    n = "",
    r = "",
    i = t.indexOf("#");
  -1 !== i && (r = t.substr(i), t = t.substr(0, i));
  var o = t.indexOf("?");
  return -1 !== o && (n = t.substr(o), t = t.substr(0, o)), {
    pathname: t,
    search: "?" === n ? "" : n,
    hash: "#" === r ? "" : r
  };
}, legacyExports.createPath = function (e) {
  var t = e.pathname,
    n = e.search,
    r = e.hash,
    i = t || "/";
  return n && "?" !== n && (i += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (i += "#" === r.charAt(0) ? r : "#" + r), i;
};

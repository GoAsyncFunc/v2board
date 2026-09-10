let legacyModule = module,
  legacyExports = exports;
function r(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  return t.forEach(function (t) {
    t && Object.keys(t).forEach(function (n) {
      e[n] = t[n];
    });
  }), e;
}
function i(e) {
  return Object.prototype.toString.call(e);
}
function o(e) {
  return "[object String]" === i(e);
}
function a(e) {
  return "[object Object]" === i(e);
}
function s(e) {
  return "[object RegExp]" === i(e);
}
function l(e) {
  return "[object Function]" === i(e);
}
function c(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var u = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function h(e) {
  return Object.keys(e || {}).reduce(function (e, t) {
    return e || u.hasOwnProperty(t);
  }, !1);
}
var f = {
    "http:": {
      validate: function (e, t, n) {
        var r = e.slice(t);
        return n.re.http || (n.re.http = new RegExp("^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path, "i")), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function (e, t, n) {
        var r = e.slice(t);
        return n.re.no_http || (n.re.no_http = new RegExp("^" + n.re.src_auth + "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path, "i")), n.re.no_http.test(r) ? t >= 3 && ":" === e[t - 3] ? 0 : t >= 3 && "/" === e[t - 3] ? 0 : r.match(n.re.no_http)[0].length : 0;
      }
    },
    "mailto:": {
      validate: function (e, t, n) {
        var r = e.slice(t);
        return n.re.mailto || (n.re.mailto = new RegExp("^" + n.re.src_email_name + "@" + n.re.src_host_strict, "i")), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
      }
    }
  },
  d = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
  p = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");
function m(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function g(e) {
  return function (t, n) {
    var r = t.slice(n);
    return e.test(r) ? r.match(e)[0].length : 0;
  };
}
function v() {
  return function (e, t) {
    t.normalize(e);
  };
}
function y(e) {
  var t = e.re = require("./73526456.js")(e.__opts__),
    r = e.__tlds__.slice();
  function i(e) {
    return e.replace("%TLDS%", t.src_tlds);
  }
  e.onCompile(), e.__tlds_replaced__ || r.push(d), r.push(t.src_xn), t.src_tlds = r.join("|"), t.email_fuzzy = RegExp(i(t.tpl_email_fuzzy), "i"), t.link_fuzzy = RegExp(i(t.tpl_link_fuzzy), "i"), t.link_no_ip_fuzzy = RegExp(i(t.tpl_link_no_ip_fuzzy), "i"), t.host_fuzzy_test = RegExp(i(t.tpl_host_fuzzy_test), "i");
  var u = [];
  function h(e, t) {
    throw new Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
  }
  e.__compiled__ = {}, Object.keys(e.__schemas__).forEach(function (t) {
    var n = e.__schemas__[t];
    if (null !== n) {
      var r = {
        validate: null,
        link: null
      };
      if (e.__compiled__[t] = r, a(n)) return s(n.validate) ? r.validate = g(n.validate) : l(n.validate) ? r.validate = n.validate : h(t, n), void (l(n.normalize) ? r.normalize = n.normalize : n.normalize ? h(t, n) : r.normalize = v());
      o(n) ? u.push(t) : h(t, n);
    }
  }), u.forEach(function (t) {
    e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize);
  }), e.__compiled__[""] = {
    validate: null,
    normalize: v()
  };
  var f = Object.keys(e.__compiled__).filter(function (t) {
    return t.length > 0 && e.__compiled__[t];
  }).map(c).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><\uff5c]|" + t.src_ZPCc + "))(" + f + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><\uff5c]|" + t.src_ZPCc + "))(" + f + ")", "ig"), e.re.pretest = RegExp("(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@", "i"), m(e);
}
function b(e, t) {
  var n = e.__index__,
    r = e.__last_index__,
    i = e.__text_cache__.slice(n, r);
  this.schema = e.__schema__.toLowerCase(), this.index = n + t, this.lastIndex = r + t, this.raw = i, this.text = i, this.url = i;
}
function w(e, t) {
  var n = new b(e, t);
  return e.__compiled__[n.schema].normalize(n, e), n;
}
function x(e, t) {
  if (!(this instanceof x)) return new x(e, t);
  t || h(e) && (t = e, e = {}), this.__opts__ = r({}, u, t), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = r({}, f, e), this.__compiled__ = {}, this.__tlds__ = p, this.__tlds_replaced__ = !1, this.re = {}, y(this);
}
x.prototype.add = function (e, t) {
  return this.__schemas__[e] = t, y(this), this;
}, x.prototype.set = function (e) {
  return this.__opts__ = r(this.__opts__, e), this;
}, x.prototype.test = function (e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;
  var t, n, r, i, o, a, s, l, c;
  if (this.re.schema_test.test(e)) {
    s = this.re.schema_search, s.lastIndex = 0;
    while (null !== (t = s.exec(e))) if (i = this.testSchemaAt(e, t[2], s.lastIndex), i) {
      this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + i;
      break;
    }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (l = e.search(this.re.host_fuzzy_test), l >= 0 && (this.__index__ < 0 || l < this.__index__) && null !== (n = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o = n.index + n[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = n.index + n[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (c = e.indexOf("@"), c >= 0 && null !== (r = e.match(this.re.email_fuzzy)) && (o = r.index + r[1].length, a = r.index + r[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = a))), this.__index__ >= 0;
}, x.prototype.pretest = function (e) {
  return this.re.pretest.test(e);
}, x.prototype.testSchemaAt = function (e, t, n) {
  return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, n, this) : 0;
}, x.prototype.match = function (e) {
  var t = 0,
    n = [];
  this.__index__ >= 0 && this.__text_cache__ === e && (n.push(w(this, t)), t = this.__last_index__);
  var r = t ? e.slice(t) : e;
  while (this.test(r)) n.push(w(this, t)), r = r.slice(this.__last_index__), t += this.__last_index__;
  return n.length ? n : null;
}, x.prototype.tlds = function (e, t) {
  return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function (e, t, n) {
    return e !== n[t - 1];
  }).reverse(), y(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, y(this), this);
}, x.prototype.normalize = function (e) {
  e.schema || (e.url = "http://" + e.url), "mailto:" !== e.schema || /^mailto:/i.test(e.url) || (e.url = "mailto:" + e.url);
}, x.prototype.onCompile = function () {}, legacyModule.exports = x;

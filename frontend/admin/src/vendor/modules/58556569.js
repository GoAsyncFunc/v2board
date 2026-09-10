let legacyModule = module,
  legacyExports = exports;
function r(e, t, n) {
  this.locales = e, this.formats = t, this.pluralFn = n;
}
function i(e) {
  this.id = e;
}
function o(e, t, n, r, i) {
  this.id = e, this.useOrdinal = t, this.offset = n, this.options = r, this.pluralFn = i;
}
function a(e, t, n, r) {
  this.id = e, this.offset = t, this.numberFormat = n, this.string = r;
}
function s(e, t) {
  this.id = e, this.options = t;
}
legacyExports["default"] = r, r.prototype.compile = function (e) {
  return this.pluralStack = [], this.currentPlural = null, this.pluralNumberFormat = null, this.compileMessage(e);
}, r.prototype.compileMessage = function (e) {
  if (!e || "messageFormatPattern" !== e.type) throw new Error('Message AST is not of type: "messageFormatPattern"');
  var t,
    n,
    r,
    i = e.elements,
    o = [];
  for (t = 0, n = i.length; t < n; t += 1) switch (r = i[t], r.type) {
    case "messageTextElement":
      o.push(this.compileMessageText(r));
      break;
    case "argumentElement":
      o.push(this.compileArgument(r));
      break;
    default:
      throw new Error("Message element does not have a valid type");
  }
  return o;
}, r.prototype.compileMessageText = function (e) {
  return this.currentPlural && /(^|[^\\])#/g.test(e.value) ? (this.pluralNumberFormat || (this.pluralNumberFormat = new Intl.NumberFormat(this.locales)), new a(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, e.value)) : e.value.replace(/\\#/g, "#");
}, r.prototype.compileArgument = function (e) {
  var t = e.format;
  if (!t) return new i(e.id);
  var n,
    r = this.formats,
    a = this.locales,
    l = this.pluralFn;
  switch (t.type) {
    case "numberFormat":
      return n = r.number[t.style], {
        id: e.id,
        format: new Intl.NumberFormat(a, n).format
      };
    case "dateFormat":
      return n = r.date[t.style], {
        id: e.id,
        format: new Intl.DateTimeFormat(a, n).format
      };
    case "timeFormat":
      return n = r.time[t.style], {
        id: e.id,
        format: new Intl.DateTimeFormat(a, n).format
      };
    case "pluralFormat":
      return n = this.compileOptions(e), new o(e.id, t.ordinal, t.offset, n, l);
    case "selectFormat":
      return n = this.compileOptions(e), new s(e.id, n);
    default:
      throw new Error("Message element does not have a valid format type");
  }
}, r.prototype.compileOptions = function (e) {
  var t,
    n,
    r,
    i = e.format,
    o = i.options,
    a = {};
  for (this.pluralStack.push(this.currentPlural), this.currentPlural = "pluralFormat" === i.type ? e : null, t = 0, n = o.length; t < n; t += 1) r = o[t], a[r.selector] = this.compileMessage(r.value);
  return this.currentPlural = this.pluralStack.pop(), a;
}, i.prototype.format = function (e) {
  return e || "number" === typeof e ? "string" === typeof e ? e : String(e) : "";
}, o.prototype.getOption = function (e) {
  var t = this.options,
    n = t["=" + e] || t[this.pluralFn(e - this.offset, this.useOrdinal)];
  return n || t.other;
}, a.prototype.format = function (e) {
  var t = this.numberFormat.format(e - this.offset);
  return this.string.replace(/(^|[^\\])#/g, "$1" + t).replace(/\\#/g, "#");
}, s.prototype.getOption = function (e) {
  var t = this.options;
  return t[e] || t.other;
};

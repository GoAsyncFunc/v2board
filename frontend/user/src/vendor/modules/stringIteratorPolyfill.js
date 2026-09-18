let legacyModule = module,
  legacyExports = exports;
var stringAt = require("./stringAtLegacy.js")(!0);
require("./4d504670.js")(String, "String", function StringIterator(value) {
  this._t = String(value), this._i = 0;
}, function next() {
  var character,
    string = this._t,
    index = this._i;
  return index >= string.length ? {
    value: void 0,
    done: !0
  } : (character = stringAt(string, index), this._i += character.length, {
    value: character,
    done: !1
  });
});

let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = o;
var r = require("./4a373869.js"),
  i = Object.create(require("./4f6e7a30.js"));
function o(e) {
  if (!(this instanceof o)) return new o(e);
  r.call(this, e);
}
i.inherits = require("./nodeInheritsOptional.js"), i.inherits(o, r), o.prototype._transform = function (e, t, n) {
  n(null, e);
};

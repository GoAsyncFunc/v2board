let legacyModule = module,
  legacyExports = exports;
var r = require("./6e565674.js");
function o(e) {
  this.mode = r.MODE_8BIT_BYTE, this.data = e;
}
o.prototype = {
  getLength: function (e) {
    return this.data.length;
  },
  write: function (e) {
    for (var t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8);
  }
}, legacyModule.exports = o;

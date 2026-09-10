let legacyModule = module,
  legacyExports = exports;
function n(e) {
  this.options = e, !e.deferSetup && this.setup();
}
n.prototype = {
  constructor: n,
  setup: function () {
    this.options.setup && this.options.setup(), this.initialised = !0;
  },
  on: function () {
    !this.initialised && this.setup(), this.options.match && this.options.match();
  },
  off: function () {
    this.options.unmatch && this.options.unmatch();
  },
  destroy: function () {
    this.options.destroy ? this.options.destroy() : this.off();
  },
  equals: function (e) {
    return this.options === e || this.options.match === e;
  }
}, legacyModule.exports = n;

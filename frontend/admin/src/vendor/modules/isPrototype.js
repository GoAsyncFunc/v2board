let legacyModule = module,
  legacyExports = exports;
var objectPrototype = Object.prototype;
function isPrototype(value) {
  var constructor = value && value.constructor,
    prototype = "function" == typeof constructor && constructor.prototype || objectPrototype;
  return value === prototype;
}
legacyModule.exports = isPrototype;

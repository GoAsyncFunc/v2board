let legacyModule = module,
  legacyExports = exports;
function objectAssign() {
  return legacyModule.exports = objectAssign = Object.assign ? Object.assign.bind() : function (target) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
      var source = arguments[sourceIndex];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports, objectAssign.apply(this, arguments);
}
legacyModule.exports = objectAssign, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;

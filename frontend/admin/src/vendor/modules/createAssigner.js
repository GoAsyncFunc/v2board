let legacyModule = module,
  legacyExports = exports;
var baseRest = require("./baseRest.js"),
  isIterateeCall = require("./isIterateeCall.js");
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
      length = sources.length,
      customizer = length > 1 ? sources[length - 1] : void 0,
      guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && "function" == typeof customizer ? (length--, customizer) : void 0, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? void 0 : customizer, length = 1), object = Object(object);
    while (++index < length) {
      var source = sources[index];
      source && assigner(object, source, index, customizer);
    }
    return object;
  });
}
legacyModule.exports = createAssigner;

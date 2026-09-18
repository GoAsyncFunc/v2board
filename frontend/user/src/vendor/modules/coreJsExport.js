let legacyModule = module,
  legacyExports = exports;
var globalObject = require("./globalObject.js"),
  coreJsNamespace = require("./coreJsNamespace.js"),
  bindContext = require("./bindContext.js"),
  defineProperty = require("./definePropertyRuntime.js"),
  hasOwn = require("./hasOwnLegacy.js"),
  prototypeKey = "prototype",
  coreJsExport = function (type, name, source) {
    var key,
      own,
      value,
      forced = type & coreJsExport.F,
      global = type & coreJsExport.G,
      static = type & coreJsExport.S,
      proto = type & coreJsExport.P,
      bind = type & coreJsExport.B,
      wrap = type & coreJsExport.W,
      target = global ? coreJsNamespace : coreJsNamespace[name] || (coreJsNamespace[name] = {}),
      targetPrototype = target[prototypeKey],
      sourceTarget = global ? globalObject : static ? globalObject[name] : (globalObject[name] || {})[prototypeKey];
    for (key in global && (source = name), source) own = !forced && sourceTarget && void 0 !== sourceTarget[key], own && hasOwn(target, key) || (value = own ? sourceTarget[key] : source[key], target[key] = global && "function" != typeof sourceTarget[key] ? source[key] : bind && own ? bindContext(value, globalObject) : wrap && sourceTarget[key] == value ? function (constructor) {
      var wrapper = function (first, second, third) {
        if (this instanceof constructor) {
          switch (arguments.length) {
            case 0:
              return new constructor();
            case 1:
              return new constructor(first);
            case 2:
              return new constructor(first, second);
          }
          return new constructor(first, second, third);
        }
        return constructor.apply(this, arguments);
      };
      return wrapper[prototypeKey] = constructor[prototypeKey], wrapper;
    }(value) : proto && "function" == typeof value ? bindContext(Function.call, value) : value, proto && ((target.virtual || (target.virtual = {}))[key] = value, type & coreJsExport.R && targetPrototype && !targetPrototype[key] && defineProperty(targetPrototype, key, value)));
  };
coreJsExport.F = 1, coreJsExport.G = 2, coreJsExport.S = 4, coreJsExport.P = 8, coreJsExport.B = 16, coreJsExport.W = 32, coreJsExport.U = 64, coreJsExport.R = 128, legacyModule.exports = coreJsExport;

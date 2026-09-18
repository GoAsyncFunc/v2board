let legacyModule = module,
  legacyExports = exports;
var metaKey = require("./uid.js")("meta"),
  isObject = require("./isObject.js"),
  hasOwn = require("./hasOwn.js"),
  defineProperty = require("./definePropertyHelper.js").f,
  objectId = 0,
  isExtensible = Object.isExtensible || function () {
    return !0;
  },
  preventExtensionsBroken = !require("./tryCatchTest.js")(function () {
    return isExtensible(Object.preventExtensions({}));
  }),
  setMeta = function (object) {
    defineProperty(object, metaKey, {
      value: {
        i: "O" + ++objectId,
        w: {}
      }
    });
  },
  fastKey = function (value, create) {
    if (!isObject(value)) return "symbol" == typeof value ? value : ("string" == typeof value ? "S" : "P") + value;
    if (!hasOwn(value, metaKey)) {
      if (!isExtensible(value)) return "F";
      if (!create) return "E";
      setMeta(value);
    }
    return value[metaKey].i;
  },
  getWeak = function (value, create) {
    if (!hasOwn(value, metaKey)) {
      if (!isExtensible(value)) return !0;
      if (!create) return !1;
      setMeta(value);
    }
    return value[metaKey].w;
  },
  onFreeze = function (value) {
    return preventExtensionsBroken && objectMeta.NEED && isExtensible(value) && !hasOwn(value, metaKey) && setMeta(value), value;
  },
  objectMeta = legacyModule.exports = {
    KEY: metaKey,
    NEED: !1,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };

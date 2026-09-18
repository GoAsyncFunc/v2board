let legacyModule = module,
  legacyExports = exports;
var regexpFlags = require("./regexpFlags.js"),
  nativeExec = RegExp.prototype.exec,
  nativeReplace = String.prototype.replace,
  regexpExec = nativeExec,
  lastIndexProperty = "lastIndex",
  hasLastIndexBug = function () {
    var nonGlobalRegexp = /a/,
      globalRegexp = /b*/g;
    return nativeExec.call(nonGlobalRegexp, "a"), nativeExec.call(globalRegexp, "a"), 0 !== nonGlobalRegexp[lastIndexProperty] || 0 !== globalRegexp[lastIndexProperty];
  }(),
  hasNonparticipatingCaptureBug = void 0 !== /()??/.exec("")[1],
  needsExecFix = hasLastIndexBug || hasNonparticipatingCaptureBug;
needsExecFix && (regexpExec = function (input) {
  var savedLastIndex,
    regexpCopy,
    match,
    groupIndex,
    regexp = this;
  return hasNonparticipatingCaptureBug && (regexpCopy = new RegExp("^" + regexp.source + "$(?!\\s)", regexpFlags.call(regexp))), hasLastIndexBug && (savedLastIndex = regexp[lastIndexProperty]), match = nativeExec.call(regexp, input), hasLastIndexBug && match && (regexp[lastIndexProperty] = regexp.global ? match.index + match[0].length : savedLastIndex), hasNonparticipatingCaptureBug && match && match.length > 1 && nativeReplace.call(match[0], regexpCopy, function () {
    for (groupIndex = 1; groupIndex < arguments.length - 2; groupIndex++) void 0 === arguments[groupIndex] && (match[groupIndex] = void 0);
  }), match;
}), legacyModule.exports = regexpExec;

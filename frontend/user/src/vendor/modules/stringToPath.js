let legacyModule = module,
  legacyExports = exports;
var memoizeCapped = require("./memoizeCapped.js"),
  propertyNamePattern = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  escapeCharacterPattern = /\\(\\)?/g,
  stringToPath = memoizeCapped(function (value) {
    var result = [];
    return 46 === value.charCodeAt(0) && result.push(""), value.replace(propertyNamePattern, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(escapeCharacterPattern, "$1") : number || match);
    }), result;
  });
legacyModule.exports = stringToPath;

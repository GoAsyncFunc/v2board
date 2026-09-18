let legacyModule = module,
  legacyExports = exports;
var strictEncode = require("./fixedEncodeURIComponent.js"),
  mergeOptions = require("./4d677a57.js"),
  decodeComponent = require("./decodeUriComponentFallback.js");
function createStringifyPair(options) {
  switch (options.arrayFormat) {
    case "index":
      return function (key, value, index) {
        return null === value ? [encodeValue(key, options), "[", index, "]"].join("") : [encodeValue(key, options), "[", encodeValue(index, options), "]=", encodeValue(value, options)].join("");
      };
    case "bracket":
      return function (key, value) {
        return null === value ? encodeValue(key, options) : [encodeValue(key, options), "[]=", encodeValue(value, options)].join("");
      };
    default:
      return function (key, value) {
        return null === value ? encodeValue(key, options) : [encodeValue(key, options), "=", encodeValue(value, options)].join("");
      };
  }
}
function createParsePair(options) {
  var match;
  switch (options.arrayFormat) {
    case "index":
      return function (key, value, result) {
        match = /\[(\d*)\]$/.exec(key), key = key.replace(/\[\d*\]$/, ""), match ? (void 0 === result[key] && (result[key] = {}), result[key][match[1]] = value) : result[key] = value;
      };
    case "bracket":
      return function (key, value, result) {
        match = /(\[\])$/.exec(key), key = key.replace(/\[\]$/, ""), match ? void 0 !== result[key] ? result[key] = [].concat(result[key], value) : result[key] = [value] : result[key] = value;
      };
    default:
      return function (key, value, result) {
        void 0 !== result[key] ? result[key] = [].concat(result[key], value) : result[key] = value;
      };
  }
}
function encodeValue(value, options) {
  return options.encode ? options.strict ? strictEncode(value) : encodeURIComponent(value) : value;
}
function sortObject(value) {
  return Array.isArray(value) ? value.sort() : "object" === typeof value ? sortObject(Object.keys(value)).sort(function (leftKey, rightKey) {
    return Number(leftKey) - Number(rightKey);
  }).map(function (key) {
    return value[key];
  }) : value;
}
function extractQuery(url) {
  var queryStart = url.indexOf("?");
  return -1 === queryStart ? "" : url.slice(queryStart + 1);
}
function parseQuery(query, options) {
  options = mergeOptions({
    arrayFormat: "none"
  }, options);
  var addParsedPair = createParsePair(options),
    result = Object.create(null);
  if ("string" !== typeof query) return result;
  query = query.trim().replace(/^[?#&]/, "");
  if (!query) return result;
  query.split("&").forEach(function (pair) {
    var parts = pair.replace(/\+/g, " ").split("="),
      key = parts.shift(),
      value = parts.length > 0 ? parts.join("=") : void 0;
    value = void 0 === value ? null : decodeComponent(value), addParsedPair(decodeComponent(key), value, result);
  });
  return Object.keys(result).sort().reduce(function (sortedResult, key) {
    var value = result[key];
    return Boolean(value) && "object" === typeof value && !Array.isArray(value) ? sortedResult[key] = sortObject(value) : sortedResult[key] = value, sortedResult;
  }, Object.create(null));
}
legacyExports.extract = extractQuery, legacyExports.parse = parseQuery, legacyExports.stringify = function stringifyQuery(queryObject, options) {
  var defaultOptions = {
    encode: !0,
    strict: !0,
    arrayFormat: "none"
  };
  options = mergeOptions(defaultOptions, options), !1 === options.sort && (options.sort = function () {});
  var stringifyPair = createStringifyPair(options);
  return queryObject ? Object.keys(queryObject).sort(options.sort).map(function (key) {
    var value = queryObject[key];
    if (void 0 === value) return "";
    if (null === value) return encodeValue(key, options);
    if (Array.isArray(value)) {
      var pairs = [];
      return value.slice().forEach(function (item) {
        void 0 !== item && pairs.push(stringifyPair(key, item, pairs.length));
      }), pairs.join("&");
    }
    return encodeValue(key, options) + "=" + encodeValue(value, options);
  }).filter(function (e) {
    return e.length > 0;
  }).join("&") : "";
}, legacyExports.parseUrl = function parseUrl(url, options) {
  return {
    url: url.split("?")[0] || "",
    query: parseQuery(extractQuery(url), options)
  };
};

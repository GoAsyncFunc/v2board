let legacyModule = module,
  legacyExports = exports;
var encodeCache = {};
function getEncodeTable(chars) {
  var index,
    character,
    table = encodeCache[chars];
  if (table) return table;
  for (table = encodeCache[chars] = [], index = 0; index < 128; index++) character = String.fromCharCode(index), /^[0-9a-z]$/i.test(character) ? table.push(character) : table.push("%" + ("0" + index.toString(16).toUpperCase()).slice(-2));
  for (index = 0; index < chars.length; index++) table[chars.charCodeAt(index)] = chars[index];
  return table;
}
function encodeUriComponent(value, chars, encodePercent) {
  var code,
    nextCode,
    index,
    end,
    result = "";
  for ("string" !== typeof chars && (encodePercent = chars, chars = encodeUriComponent.defaultChars), "undefined" === typeof encodePercent && (encodePercent = !0), chars = getEncodeTable(chars), index = 0, end = value.length; index < end; index++) if (code = value.charCodeAt(index), encodePercent && 37 === code && index + 2 < end && /^[0-9a-f]{2}$/i.test(value.slice(index + 1, index + 3))) result += value.slice(index, index + 3), index += 2;else if (code < 128) result += chars[code];else if (code >= 55296 && code <= 57343) {
    if (code >= 55296 && code <= 56319 && index + 1 < end && (nextCode = value.charCodeAt(index + 1), nextCode >= 56320 && nextCode <= 57343)) {
      result += encodeURIComponent(value[index] + value[index + 1]), index++;
      continue;
    }
    result += "%EF%BF%BD";
  } else result += encodeURIComponent(value[index]);
  return result;
}
encodeUriComponent.defaultChars = ";/?:@&=+$,-_.!~*'()#", encodeUriComponent.componentChars = "-_.!~*'()", legacyModule.exports = encodeUriComponent;

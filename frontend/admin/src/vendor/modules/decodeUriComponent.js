let legacyModule = module,
  legacyExports = exports;
var decodeCache = {};
function getDecodeTable(chars) {
  var index,
    character,
    table = decodeCache[chars];
  if (table) return table;
  for (table = decodeCache[chars] = [], index = 0; index < 128; index++) character = String.fromCharCode(index), table.push(character);
  for (index = 0; index < chars.length; index++) character = chars.charCodeAt(index), table[character] = "%" + ("0" + character.toString(16).toUpperCase()).slice(-2);
  return table;
}
function decodeUriComponent(value, chars) {
  var decodeTable;
  return "string" !== typeof chars && (chars = decodeUriComponent.defaultChars), decodeTable = getDecodeTable(chars), value.replace(/(%[a-f0-9]{2})+/gi, function (encodedGroup) {
    var index,
      end,
      firstByte,
      secondByte,
      thirdByte,
      fourthByte,
      codePoint,
      result = "";
    for (index = 0, end = encodedGroup.length; index < end; index += 3) firstByte = parseInt(encodedGroup.slice(index + 1, index + 3), 16), firstByte < 128 ? result += decodeTable[firstByte] : 192 === (224 & firstByte) && index + 3 < end && (secondByte = parseInt(encodedGroup.slice(index + 4, index + 6), 16), 128 === (192 & secondByte)) ? (codePoint = firstByte << 6 & 1984 | 63 & secondByte, result += codePoint < 128 ? "\ufffd\ufffd" : String.fromCharCode(codePoint), index += 3) : 224 === (240 & firstByte) && index + 6 < end && (secondByte = parseInt(encodedGroup.slice(index + 4, index + 6), 16), thirdByte = parseInt(encodedGroup.slice(index + 7, index + 9), 16), 128 === (192 & secondByte) && 128 === (192 & thirdByte)) ? (codePoint = firstByte << 12 & 61440 | secondByte << 6 & 4032 | 63 & thirdByte, result += codePoint < 2048 || codePoint >= 55296 && codePoint <= 57343 ? "\ufffd\ufffd\ufffd" : String.fromCharCode(codePoint), index += 6) : 240 === (248 & firstByte) && index + 9 < end && (secondByte = parseInt(encodedGroup.slice(index + 4, index + 6), 16), thirdByte = parseInt(encodedGroup.slice(index + 7, index + 9), 16), fourthByte = parseInt(encodedGroup.slice(index + 10, index + 12), 16), 128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) ? (codePoint = firstByte << 18 & 1835008 | secondByte << 12 & 258048 | thirdByte << 6 & 4032 | 63 & fourthByte, codePoint < 65536 || codePoint > 1114111 ? result += "\ufffd\ufffd\ufffd\ufffd" : (codePoint -= 65536, result += String.fromCharCode(55296 + (codePoint >> 10), 56320 + (1023 & codePoint))), index += 9) : result += "\ufffd";
    return result;
  });
}
decodeUriComponent.defaultChars = ";/?:@&=+$,#", decodeUriComponent.componentChars = "", legacyModule.exports = decodeUriComponent;

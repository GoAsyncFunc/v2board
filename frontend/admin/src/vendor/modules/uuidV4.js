"use strict";

let getRandomValues;
const randomBytes = new Uint8Array(16);

function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto) ||
      typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" &&
      msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. " +
        "See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }

  return getRandomValues(randomBytes);
}

const UUID_PATTERN = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validateUuid(value) {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

const byteToHex = [];
for (let value = 0; value < 256; value++) {
  byteToHex.push((value + 256).toString(16).substr(1));
}

function stringifyUuid(bytes, offset) {
  offset = offset === undefined ? 0 : offset;
  const uuid = (
    byteToHex[bytes[offset + 0]] + byteToHex[bytes[offset + 1]] +
    byteToHex[bytes[offset + 2]] + byteToHex[bytes[offset + 3]] + "-" +
    byteToHex[bytes[offset + 4]] + byteToHex[bytes[offset + 5]] + "-" +
    byteToHex[bytes[offset + 6]] + byteToHex[bytes[offset + 7]] + "-" +
    byteToHex[bytes[offset + 8]] + byteToHex[bytes[offset + 9]] + "-" +
    byteToHex[bytes[offset + 10]] + byteToHex[bytes[offset + 11]] +
    byteToHex[bytes[offset + 12]] + byteToHex[bytes[offset + 13]] +
    byteToHex[bytes[offset + 14]] + byteToHex[bytes[offset + 15]]
  ).toLowerCase();

  if (!validateUuid(uuid)) throw new TypeError("Stringified UUID is invalid");
  return uuid;
}

function uuidV4(options, buffer, offset) {
  options = options || {};
  const bytes = options.random || (options.rng || rng)();

  bytes[6] = bytes[6] & 0x0f | 0x40;
  bytes[8] = bytes[8] & 0x3f | 0x80;

  if (buffer) {
    offset = offset || 0;
    for (let index = 0; index < 16; index++) buffer[offset + index] = bytes[index];
    return buffer;
  }

  return stringifyUuid(bytes);
}

exports.uuidV4 = uuidV4;

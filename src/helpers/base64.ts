const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const reverseMap = new Map();

for (let i = 0; i < map.length; i++) {
  let bits: string = i.toString(2);
  const padding: number = 6 - bits.length;
  bits = "0".repeat(padding) + bits;

  reverseMap.set(map.charCodeAt(i), bits);
}

/**
 * Convert base64 string to an array of bytes
 * @param base64Str - Base64 string
 * @returns Array of 1-byte elements
 */
function toByteArray(base64Str: string): string[] {
  let bits: string = "";

  // convert base64 string to bits
  for (let i = 0; i < base64Str.length; i++) {
    bits += reverseMap.get(base64Str.charCodeAt(i));
  }

  // Remove padding ("=" characters)
  bits = bits.slice(0, bits.length - (bits.length % 8));

  const bytesArray = [];

  // Separate string by 8-bit groups
  for (let i = 0; i < bits.length / 8; i++) {
    bytesArray.push(bits.slice(i * 8, i * 8 + 8));
  }

  return bytesArray;
}

/**
 * Convert a base64 string to an UTF-8 array
 * @param base64Str - Base64 string
 * @returns UTF-8 array
 */
export function base64DecToArray(base64Str: string): number[] {
  // Replace - _ and remove padding
  base64Str = base64Str.replaceAll("=", "");
  base64Str = base64Str.replaceAll("-", "+");
  base64Str = base64Str.replaceAll("_", "/");

  const charCodes: string[] = toByteArray(base64Str);

  return charCodes.map((code) => parseInt(code, 2));
}

/**
 * Convert a UTF-8 array to string
 * @param bytes
 * @returns Decoded string
 */
export function UTF8ArrToStr(bytes: number[]): string {
  let decoded: string = ""; // Decoded string
  let nPart: number;
  const arrayLength: number = bytes.length;

  for (let i = 0; i < arrayLength; i++) {
    nPart = bytes[i];
    decoded += String.fromCodePoint(
      nPart > 251 && nPart < 254 && i + 5 < arrayLength /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So... */
          (nPart - 252) * 1073741824 +
            ((bytes[++i] - 128) << 24) +
            ((bytes[++i] - 128) << 18) +
            ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) +
            bytes[++i] -
            128
        : nPart > 247 && nPart < 252 && i + 4 < arrayLength /* five bytes */
          ? ((nPart - 248) << 24) +
            ((bytes[++i] - 128) << 18) +
            ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) +
            bytes[++i] -
            128
          : nPart > 239 && nPart < 248 && i + 3 < arrayLength /* four bytes */
            ? ((nPart - 240) << 18) +
              ((bytes[++i] - 128) << 12) +
              ((bytes[++i] - 128) << 6) +
              bytes[++i] -
              128
            : nPart > 223 &&
                nPart < 240 &&
                i + 2 < arrayLength /* three bytes */
              ? ((nPart - 224) << 12) +
                ((bytes[++i] - 128) << 6) +
                bytes[++i] -
                128
              : nPart > 191 &&
                  nPart < 224 &&
                  i + 1 < arrayLength /* two bytes */
                ? ((nPart - 192) << 6) + bytes[++i] - 128 /* nPart < 127 ? */
                : /* one byte */
                  nPart
    );
  }

  return decoded;
}

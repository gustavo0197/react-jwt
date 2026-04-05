import { describe, test, expect } from "vitest";
import { base64DecToArray, UTF8ArrToStr } from "../../src/helpers/base64";

describe("Decode base64", () => {
  test("Should decode a base64 string", () => {
    const expectedResult = "Hello";
    const base64: string = Buffer.from(expectedResult).toString("base64");

    const bytes = base64DecToArray(base64);
    const result = UTF8ArrToStr(bytes);

    expect(result).toBe(expectedResult);
  });

  test("Should decode a stringified JSON", () => {
    const expectedResult: string = JSON.stringify({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022
    });
    const base64: string = Buffer.from(expectedResult).toString("base64");

    const bytes = base64DecToArray(base64);
    const result = UTF8ArrToStr(bytes);

    expect(result).toEqual(expectedResult);
  });

  test("Should decode emojis", () => {
    const expectedResult = "👽🥶👨🏿‍💻";
    const base64: string = "8J+RvfCfpbbwn5Go8J+Pv+KAjfCfkrs=";

    const bytes = base64DecToArray(base64);
    const result = UTF8ArrToStr(bytes);

    expect(result).toBe(expectedResult);
  });

  test("Should decode UTF-8 characters", () => {
    const expectedResult: string = JSON.stringify({
      "Æ©®": "ç©ƒÇ",
      test: true
    });
    const base64: string = "eyLDhsKpwq4iOiLDp8KpxpLDh--jvyIsInRlc3QiOnRydWV9";

    const bytes = base64DecToArray(base64);
    const result = UTF8ArrToStr(bytes);

    expect(result).toBe(expectedResult);
  });

  test("Should handle 6-byte UTF-8 sequences", () => {
    // Test the 6-byte UTF-8 case: nPart > 251 && nPart < 254
    // This creates a byte array with a 6-byte sequence starting with 252
    // Format: 252, 128, 128, 128, 128, 128
    // This represents an extended UTF-8 character (outside standard Unicode)
    const bytes = [252, 128, 128, 128, 128, 128];

    const result = UTF8ArrToStr(bytes);

    // The expected result is calculated as:
    // (252 - 252) * 1073741824 + (128 - 128) << 24 + (128 - 128) << 18 +
    // (128 - 128) << 12 + (128 - 128) << 6 + 128 - 128 = 0
    // String.fromCodePoint(0) returns the null character
    expect(result).toBe(String.fromCodePoint(0));
  });

  test("Should decode 5-byte UTF-8 sequence", () => {
    // Test the 5-byte UTF-8 encoding path (nPart > 247 && nPart < 252)
    // 5-byte sequence: 11111000 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    // First byte: 248 (0xF8) - minimum value for 5-byte sequence
    // Following bytes: 128 (0x80) - minimum continuation byte
    const fiveByteSequence = [248, 128, 128, 128, 128]; // Represents code point U+0

    const result = UTF8ArrToStr(fiveByteSequence);

    // The formula: ((248 - 248) << 24) + ((128 - 128) << 18) + ((128 - 128) << 12) + ((128 - 128) << 6) + 128 - 128 = 0
    // String.fromCodePoint(0) returns the null character
    expect(result).toBe(String.fromCodePoint(0));

    // Test with a value that produces a valid Unicode code point
    // Using 248 with different continuation bytes to stay within valid range
    const fiveByteSequence2 = [248, 128, 128, 129, 128]; // Code point U+64 (@ character)
    const result2 = UTF8ArrToStr(fiveByteSequence2);
    // Formula: ((248 - 248) << 24) + ((128 - 128) << 18) + ((128 - 128) << 12) + ((129 - 128) << 6) + 128 - 128
    // = 0 + 0 + 0 + (1 << 6) + 0 = 64
    expect(result2).toBe(String.fromCodePoint(64)); // '@' character
  });
});

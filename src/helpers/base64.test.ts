import { base64DecToArray, UTF8ArrToStr } from "./base64";

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
});

import { decodeToken, isTokenExpired } from "../../src/jwt/index";

describe("decodeToken()", () => {
  test("Should return an object if token is valid", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const result = decodeToken(token);

    expect(result).toEqual({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022
    });
  });

  test("Should decode a token with UTF-8 characters", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IuODl-ODqeOCpOODmeODvOODiCIsImRpc3BsYXlOYW1lIjoi44OG44K544OIIiwi5ZCN5YmNPT0iOiLjgrjjg6fjg7Pjg7vjg4njgqYifQ.Q-qqvVgQePzmI6-P9eocAbg8ncrbMX6o2esO7iQOCHw";
    const expectedResult = {
      id: "プライベート",
      displayName: "テスト",
      "名前==": "ジョン・ドウ"
    };

    const result = decodeToken(token);

    expect(result).toEqual(expectedResult);
  });

  test("Should decode a token with emojis", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyLwn42OIjoi8J-NjyIsIm5hbWUiOiLwn5G98J-ltvCfkajwn4-_4oCN8J-SuyIsImlhdCI6MTUxNjIzOTAyMn0.l_1T2OW0R3oE-m6vdnAW6OW6mrHqUcziKcrj92tEMIE";
    const expectedResult = {
      "🍎": "🍏",
      name: "👽🥶👨🏿‍💻",
      iat: 1516239022
    };

    const result = decodeToken(token);

    expect(result).toEqual(expectedResult);
  });

  test("Should return null if token has less than 3 parts", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";

    const result = decodeToken(token);

    expect(result).toBeNull();
  });

  test("Should return null if token has more than 3 parts", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const result = decodeToken(token);

    expect(result).toBeNull();
  });

  test("Should return null if token is not a string", () => {
    const result1 = decodeToken(123);
    const result2 = decodeToken(undefined);
    const resul3 = decodeToken(null);
    const result4 = decodeToken({ test: true });
    const result5 = decodeToken([1, 2, 3]);

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(resul3).toBeNull();
    expect(result4).toBeNull();
    expect(result5).toBeNull();
  });
});

describe("isTokenExpired()", () => {
  test("Should return true if token is expired", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4NTMxMTM2MDAsImV4cCI6ODUzMTEzNjAwfQ.e4UmSp91vin1rSa97Pq-Eg2rgatwemxI1usPjMHXwlQ";

    const result = isTokenExpired(token);

    expect(result).toBe(true);
  });

  test("Should return false if token is not expired", () => {
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQxMDM0ODE2MDB9.2zzV5MsdAM2pY07zdXAZ7QSnWY9Ams0oJvT01IqtUkw";

    const result = isTokenExpired(token);

    expect(result).toBe(false);
  });

  test("Should return true if token is not valid", () => {
    const result1 = decodeToken(123);
    const result2 = decodeToken(undefined);
    const resul3 = decodeToken(null);
    const result4 = decodeToken({ test: true });
    const result5 = decodeToken([1, 2, 3]);

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(resul3).toBeNull();
    expect(result4).toBeNull();
    expect(result5).toBeNull();
  });
});

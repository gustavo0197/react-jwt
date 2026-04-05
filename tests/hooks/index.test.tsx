import { describe, test, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useJwt } from "../../src/hooks/index";

// Token with no expiry: { sub: "1234567890", name: "John Doe", iat: 1516239022 }
const TOKEN_NO_EXP =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Token with future expiry (year 2100): { sub: "1234567890", name: "John Doe", iat: 1516239022, exp: 4103481600 }
const TOKEN_NOT_EXPIRED =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQxMDM0ODE2MDB9.2zzV5MsdAM2pY07zdXAZ7QSnWY9Ams0oJvT01IqtUkw";

// Token with past expiry: { sub: "1234567890", name: "John Doe", iat: 853113600, exp: 853113600 }
const TOKEN_EXPIRED =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4NTMxMTM2MDAsImV4cCI6ODUzMTEzNjAwfQ.e4UmSp91vin1rSa97Pq-Eg2rgatwemxI1usPjMHXwlQ";

vi.stubGlobal("console", {
  ...console,
  error: vi.fn()
});

describe("useJwt()", () => {
  test("should decode a valid token", () => {
    const { result } = renderHook(() => useJwt(TOKEN_NO_EXP));

    expect(result.current.decodedToken).toEqual({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022
    });
  });

  test("should return isExpired false for a non-expired token", () => {
    const { result } = renderHook(() => useJwt(TOKEN_NOT_EXPIRED));

    expect(result.current.isExpired).toBe(false);
  });

  test("should return isExpired true for an expired token", () => {
    const { result } = renderHook(() => useJwt(TOKEN_EXPIRED));

    expect(result.current.isExpired).toBe(true);
  });

  test("should return isExpired true when token has no exp claim", () => {
    const { result } = renderHook(() => useJwt(TOKEN_NO_EXP));

    expect(result.current.isExpired).toBe(true);
  });

  test("should return null decodedToken for an invalid token", () => {
    const { result } = renderHook(() => useJwt("not.a.token"));

    expect(result.current.decodedToken).toBeNull();
  });

  test("should update decoded token when token prop changes", () => {
    const { result, rerender } = renderHook(({ token }) => useJwt(token), {
      initialProps: { token: TOKEN_EXPIRED }
    });

    expect(result.current.isExpired).toBe(true);

    rerender({ token: TOKEN_NOT_EXPIRED });

    expect(result.current.isExpired).toBe(false);
    expect(result.current.decodedToken).toMatchObject({ sub: "1234567890" });
  });

  test("reEvaluateToken should update state with a new token", () => {
    const { result } = renderHook(() => useJwt(TOKEN_EXPIRED));

    expect(result.current.isExpired).toBe(true);

    act(() => {
      result.current.reEvaluateToken(TOKEN_NOT_EXPIRED);
    });

    expect(result.current.isExpired).toBe(false);
    expect(result.current.decodedToken).toMatchObject({ sub: "1234567890" });
  });

  test("reEvaluateToken should set decodedToken to null for an invalid token", () => {
    const { result } = renderHook(() => useJwt(TOKEN_NOT_EXPIRED));

    act(() => {
      result.current.reEvaluateToken("invalid.token.here");
    });

    expect(result.current.decodedToken).toBeNull();
  });

  test("should support generic type parameter for decodedToken", () => {
    interface MyPayload {
      sub: string;
      name: string;
      iat: number;
    }

    const { result } = renderHook(() => useJwt<MyPayload>(TOKEN_NO_EXP));
    const token = result.current.decodedToken;

    expect(token?.name).toBe("John Doe");
    expect(token?.sub).toBe("1234567890");
  });
});

import { base64DecToArray, UTF8ArrToStr } from "../helpers/base64";

/**
 * Try to decode a JWT. If the token is valid you'll get an object otherwise you'll get null
 * @param token - The JWT that you want to decode
 * @returns Decoded token
 */
export function decodeToken<T>(token: string): T | null;
export function decodeToken(token: string): Object | null;
export function decodeToken<T = Object>(token: string): T | null {
  try {
    // if the token has more or less than 3 parts or is not a string
    // then is not a valid token
    if (typeof token !== "string" || token.split(".").length !== 3) {
      return null;
    }

    // payload ( index 1 ) has the data stored and
    // data about the expiration time
    const payload: string = token.split(".")[1];

    const base64Bytes: number[] = base64DecToArray(payload);
    // Convert utf-8 array to string
    const jsonPayload: string = UTF8ArrToStr(base64Bytes);
    // Parse JSON
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("There was an error decoding token: ", error);
    // Return null if something goes wrong
    return null;
  }
}

/**
 * Verify if the token is expired or not
 * @param token - Your JWT
 * @returns boolean
 */
export function isTokenExpired(token: string): boolean {
  const decodedToken: any = decodeToken(token);
  let result: boolean = true;

  if (decodedToken && decodedToken.exp) {
    const expirationDate: Date = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp); // sets the expiration seconds
    // compare the expiration time and the current time
    result = expirationDate.valueOf() < new Date().valueOf();
  }

  return result;
}

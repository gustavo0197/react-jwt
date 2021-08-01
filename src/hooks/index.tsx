import { useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../jwt";

/**
 * This function will help you to decode a JWT and know if it's expired or not
 * @param userJwt - Your JWT
 * @returns An object containing the properties isExpired, decodedToken and reEvaluateToken
 */
export function useJwt(userJwt: string): IUseJwt {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    evaluateToken(userJwt);
  }, [userJwt]);

  const evaluateToken = (token: string) => {
    setDecodedToken(decodeToken(token));
    setIsExpired(isTokenExpired(token));
  };

  return { isExpired, decodedToken, reEvaluateToken: evaluateToken };
}

interface IUseJwt {
  isExpired: boolean;
  decodedToken: Object;
  reEvaluateToken: (token: string) => void;
}

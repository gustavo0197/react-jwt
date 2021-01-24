import { useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../jwt";

export function useJwt(userJwt: string) {
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

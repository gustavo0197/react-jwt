import { useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../jwt";

export function useJwt(token: string) {
  const [isExpired, setIsExpired] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    setDecodedToken(decodeToken(token));
    setIsExpired(isTokenExpired(token));
  }, [token]);

  return { isExpired, decodedToken };
}

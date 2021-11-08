import React, { useState } from "react";
import { useJwt } from "react-jwt";
import "./index.css";

const App = () => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VzdGF2byIsImlhdCI6MTU5NjQwODI1OSwiZXhwIjo0NzUyMTY4MjU5fQ.ThwsJW2KfMTl0y24tTGWKHqvYWRp1iyo_Kh2KWTHuXc"
  );
  const { decodedToken, isExpired } = useJwt(token);

  return (
    <div className="example">
      <div>
        <span style={{ display: "flex" }}>
          <p className="example__title">Encoded</p>
          <p className="example__subtitle">Paste a JWT here</p>
        </span>
        {/* Paste a JWT here and will be decoded */}
        <textarea
          className="example__token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <span style={{ display: "flex" }}>
          <p className="example__title">Decoded</p>
          {isExpired ? (
            <p className="example__subtitle example--token-expired">
              Your token is expired
            </p>
          ) : (
            <p className="example__subtitle example--token-not-expired">
              Your token is not expired
            </p>
          )}
        </span>
        {/* Here is your decoded token */}
        <textarea
          className="example__result"
          value={JSON.stringify(decodedToken)}
          disabled
        />
      </div>
    </div>
  );
};

export default App;

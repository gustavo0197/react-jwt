import React, { useState } from "react";

import { useJwt } from "react-jwt";
import "react-jwt/dist/index.css";

const App = () => {
  const [token, setToken] = useState("");
  const { decodedToken, isExpired } = useJwt(token);

  return (
    <div>
      <input value={token} onChange={(e) => setToken(e.target.value)} />
      <div>{JSON.stringify(isExpired)}</div>
      <div>{JSON.stringify(decodedToken)}</div>
    </div>
  );
};

export default App;

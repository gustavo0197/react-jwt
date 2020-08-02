import React, { useState } from "react";
import { useJwt } from "react-jwt";

const App = () => {
  const [token, setToken] = useState("");
  const { decodedToken, isExpired } = useJwt(token);

  return <div></div>;
};

export default App;

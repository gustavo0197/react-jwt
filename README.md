# react-jwt

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-jwt.svg)](https://www.npmjs.com/package/react-jwt)

## Install

```bash
npm install react-jwt
or
yarn add react-jwt
```

## Usage

```jsx
import React from "react";
import { useJwt } from "react-jwt";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikd1c3Rhdm8iLCJpYXQiOjE1MTYyMzkwMjJ9.RhIh9N2F_AGUy6wUV3NAsLn94Hf5qQWLBacEMZ7se8U";

const Example = () => {
  const { decodedToken, isExpired } = useJwt(token);
  /*
    If is a valid jwt, 'decodedToken' will be a object
    it could look like:
    {
      "sub": "1234567890",
      "iat": 1516239022,
      "name": "Gustavo"
    }

    'isExpired' will return a boolean
    true => your token is expired
    false => your token is not expired
  */

  return (
    <div>
      ...
    </div>
  );
};
```

## License

MIT © [@gustavo0197](https://github.com/@gustavo0197)

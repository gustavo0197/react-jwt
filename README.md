# react-jwt

> Small library for decoding json web tokens (JWT)

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
const token = "Your JWT";

const Example = () => {
  const { decodedToken, isExpired } = useJwt(token);
  /*
    If is a valid jwt, 'decodedToken' will be a object
    it could look like:
    {
      "name": "Gustavo",
      "iat": 1596408259,
      "exp": 4752168259
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

You can also use the methods isExpired(token) and decodeToken(token)

```jsx
import React from "react";
import { isExpired, decodeToken } from "react-jwt";
const token = "Your JWT";

const Example = () => {
  const myDecodedToken = decodedToken(token);
  const isMyTokenExpired = isExpired(token);

  return (
    <div>
      ...
    </div>
  );
};
```

## License

MIT © [@gustavo0197](https://github.com/@gustavo0197)

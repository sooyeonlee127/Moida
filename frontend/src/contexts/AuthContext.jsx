import React, { createContext } from "react";

export const AuthContext = createContext({
  userData: {
    token: "dddd",
    point: 10,
    ticket: 10,
  },
  setUserData: () => {},
});

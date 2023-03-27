import React, { createContext, useState } from "react";

export const AuthContext = createContext();
const Auth = (props) => {
  const token = useState(localStorage.getItem("accessToken"));
  const [isLogin, setIsLogin] = useState(() => {
    if (token[0]) {
      return true;
    }
    return false;
  });
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        role,
        setRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default Auth;

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
  const [point, setPoint] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [role, setRole] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        point,
        setPoint,
        ticket,
        setTicket,
        role,
        setRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default Auth;

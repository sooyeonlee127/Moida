// 수연: 로그인된 사용자만 접근 가능
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLogin } = useContext(AuthContext);
  if (!isLogin) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
export default PrivateRoute;

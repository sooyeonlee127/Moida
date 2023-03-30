// 수연: 로그아웃된 사용자만 접근 가능 ( 로그인페이지, 회원가입 페이지 )
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isLogin } = useContext(AuthContext);
  if (isLogin) {
    alert("이미 로그인하였습니다.");
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default PublicRoute;

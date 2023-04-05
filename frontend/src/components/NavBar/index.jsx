import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../api/auth";
import logo_white from "../../assets/img/Logo_white.svg";
import logo from "../../assets/img/Logo.svg";
import MetamaskUncheck from "../MetamaskUncheck";
import { BsTicketPerforatedFill } from 'react-icons/bs';

// 수연: navbar
const NavBar = () => {
  // 은혁: 네브바 스크롤 css 적용
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollValue(parseInt(window.scrollY));
    });
  });
  // console.log(scrollValue)

  // 은혁: useQuery
  const getMe = async () => {
    if (isLogin) {
      try {
        const response = await api({
          url: "/users/me",
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        console.log(response.data)
        setRole(response.data.roles);
        setPoint(response.data.info.point);
        localStorage.setItem("nickname", response.data.info.nickname);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      // 수연: 로그아웃 상태 예외 처리
      return new Error("logout");
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    refetchOnMount: false,
  });

  // 수연: 로그인 상태에 따라 navbar 변경
  const { isLogin, setIsLogin, role, setRole, point, setPoint, ticketCnt, setTicketCnt } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
      refetch();
    }
    // isLogin 값이 변경될 때마다 쿼리를 다시 실행 - 수연
  }, [isLogin, refetch]);
  const navigate = useNavigate();

  const [isLogout, setIsLogout] = useState(false); // 로그아웃 시 메타마스크 연결 해제

  const goPage = (page) => {
    navigate(`${page}`, { replace: false });
  };
  const navigation = [
    // 로그아웃 상태의 navbar
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "가챠샵", href: "/gatcha" },
  ];
  // 수연: 로그아웃 호출
  const LogoutSubmit = () => {
    setIsLogout(true);
    api({
      url: "/auth/logout",
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
    })
      .then((res) => {
        const data = res.data;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLogin(false);
        setRole("");
        navigate("/", { replace: false });
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };

  return (
    <Nav className={scrollValue > 0 ? "scrolled" : "unscrolled"}>
      <InnerNav>
      <MenuLeft>
        <div style={{ width: "70px", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Logo onClick={() => goPage("/")} className={scrollValue > 0 ? "scrolled" : "unscrolled"}/>
        </div>
          {navigation.map((item, index) => (
            <Link on={item.name} key={index} to={item.href}>
              <Menu>{item.name}</Menu>
            </Link>
          ))}
          </MenuLeft>
              <MenuRight>
          {isLogin && role === "ROLE_ADMIN" ? (
            <Menu onClick={() => goPage("/admin")}>Admin 계정입니다.</Menu>
            ) : (
              ""
              )}
          {isLogin ? (
            <>
              <Link to="/gatcha"><Menu><BsTicketPerforatedFill className='icon' color="inherit" size="1.2rem"/>{ticketCnt}</Menu></Link>
              <Link to="/point"><Menu>{point} P</Menu></Link>
              <Link to="/profile"><Menu>MYPAGE</Menu></Link>
              <Menu onClick={LogoutSubmit}>LOGOUT</Menu>
            </>
          ) : (
            <>
              {isLogout ? <MetamaskUncheck /> : <></>}
              <Menu onClick={() => goPage("/signup")}>SIGNUP</Menu>
              <Menu onClick={() => goPage("/login")}>LOGIN</Menu>
            </>
          )}
          </MenuRight>
      </InnerNav>
    </Nav>
  );
};

const Nav = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  z-index: 1;
  padding: 0 50px;
  transition: all 0.3s ease 0s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.scrolled {
    height: 52px;
    color: white;
    background-color: #a0c846;
    box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 15%);
  }
  &.unscrolled {
    height: 90px;
    color: #584e3f;
    background-color: transparent;
  }
`;

const InnerNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
`;
const MenuRight = styled.div`
`
const MenuLeft = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.05em;
  display: flex;
  align-items: center;
}
`;

const Logo = styled.p`
  background-size: cover;
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
  &.scrolled {
    background-image: url(${logo_white});
    height: 30px;
    width: 31.18px;
  }
  &.unscrolled {
    background-image: url(${logo});
    height: 38px;
    width: 39.5px;
  }
`;
const Menu = styled.p`
  padding: 0 16px;
  display: inline-block;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover {
    color: red;
  }
`;

export default NavBar;

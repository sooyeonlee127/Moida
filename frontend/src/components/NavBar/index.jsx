import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../api/auth";
import logo_white from '../../assets/img/Logo_white.svg'
import logo from '../../assets/img/Logo.svg'

// 수연: navbar
const NavBar = () => {
  // 은혁: 네브바 스크롤 css 적용
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(()=> {
    window.addEventListener('scroll', () => {setScrollValue(parseInt(window.scrollY))})
  })
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

  const role = localStorage.getItem("role");

  const { data, refetch } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    refetchOnMount: false,
  });

  // 수연: 로그인 상태에 따라 navbar 변경
  const { isLogin, setIsLogin } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) {
      refetch();
    }
    // isLogin 값이 변경될 때마다 쿼리를 다시 실행 - 수연
  }, [isLogin]);

  const navigate = useNavigate();

  const goAdmin = () => {
    navigate("/admin", { replace: false });
  };
  const goHome = () => {
    navigate("/", { replace: false });
  };

  const goSignup = () => {
    navigate("/signup", { replace: false });
  };

  const goLogin = () => {
    navigate("/login", { replace: false });
  };

  const navigation = [
    // 로그아웃 상태의 navbar
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "NFT", href: "/gatcha" },
  ];
  const userNavigation = [
    // 로그인 상태의 navbar
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "NFT", href: "/gatcha" },
    // { name: `${data ? data.ticketCnt : "  "}개`, href: "/gatcha" },
    // { name: `${data ? data.point : "  "} P`, href: "/point" },
    { name: "MYPAGE", href: "/profile" },
  ];
  // 수연: 로그아웃 호출
  const LogoutSubmit = () => {
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
        console.log(res);
        console.log(data);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        setIsLogin(false);
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };

  return (
    <Nav className={scrollValue>0? "scrolled":"unscrolled"}>
      <InnerNav>
        <Logo className={scrollValue>0? "scrolled":"unscrolled"}></Logo>
        <GroupMenu>
          {isLogin && role === "ROLE_ADMIN" ? (<Menu onClick={goAdmin}>Admin 계정입니다.</Menu>) : ""}
          <Menu onClick={goHome}>HOME</Menu>
          {isLogin? 
            <>
              {userNavigation.map((item, index) => (<Link on={item.name} key={index} to={item.href}><Menu>{item.name}</Menu></Link>))}
              <Menu onClick={LogoutSubmit}>LOGOUT</Menu>
            </> : <>
              {navigation.map((item) => (<Link key={item.name} to={item.href}><Menu>{item.name}</Menu></Link>))}
              <Menu onClick={goSignup}>SIGNUP</Menu>
              <Menu onClick={goLogin}>LOGIN</Menu>
            </>
          }
        </GroupMenu>
      </InnerNav>
    </Nav>
  );
}

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
&.scrolled{
  height: 52px;
  color: white;
  background-color: #A0C846;
  box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 15%);
}
&.unscrolled{
  height: 90px;
  color: #584E3F;
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
`
const GroupMenu = styled.div`
font-size: 1rem;
line-height: 1.5rem;
letter-spacing: -0.05em;
`;

const Logo = styled.span`
height: 38px;
width: 39.5px;
background-size: cover;
  &.scrolled {
    background-image: url(${logo_white});
  }
  &.unscrolled {
    background-image: url(${logo});
  }
`
const Menu = styled.span`
  padding: 0 16px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover {
    color: red;
  }
`

export default NavBar;

import React, { useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import axios from "axios";

const NavBar = () => {
  const { isLogin, setIsLogin, ticket, point } = useContext(AuthContext);
  const navigation = [
    { name: "HOME", href: "/" },
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "가챠샵", href: "/gatcha" },
    { name: "SIGNUP", href: "/signup" },
    { name: "LOGIN", href: "/login" },
  ];
  const userNavigation = [
    { name: "HOME", href: "/" },
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "가챠샵", href: "/gatcha" },
    { name: `${ticket}개`, href: "/gatcha" },
    { name: `${point} P`, href: "/point" },
  ];
  const LogoutSubmit = () => {
    axios({
      url: "/api/auth/logout",
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
        localStorage.removeItem("point");
        localStorage.removeItem("ticket");
        localStorage.removeItem("role");
        setIsLogin(false);
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };
  if (isLogin) {
    return (
      <>
        <Nav>
          <Section>
            <Logo>
              <p>우리 로고</p>
            </Logo>
            <Title>
              {userNavigation.map((item, index) => (
                <Link on={item.name} key={index} to={item.href}>
                  {item.name}
                </Link>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  LogoutSubmit();
                }}
              >
                LOGOUT
              </button>
            </Title>
          </Section>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <Section>
            <Logo>
              <p>우리 로고</p>
            </Logo>
            <Title>
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
            </Title>
          </Section>
        </Nav>
      </>
    );
  }
};

const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  ${tw`
  bg-yellow-100
  px-2
  text-black
  h-16
  flex items-center justify-between
  `}
`;

const Section = styled.div`
  ${tw`
  flex flex-1 items-center justify-center sm:items-stretch sm:justify-start
  `}
`;

const Logo = styled.div`
  ${tw`
  flex flex-shrink-0 items-center px-7
  `}
`;

const Title = styled.div`
  ${tw`
  flex space-x-4
  `}
`;

export default NavBar;

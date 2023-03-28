import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  // 은혁: useQuery
  const getMe = async () => {
    try {
      const response = await axios({
        url: "/api/users/me",
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
  };

  const { data, refetch } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    refetchOnMount: false,
  });

  // 수연: 로그인 상태에 따라 navbar 변경
  const { isLogin, setIsLogin } = useContext(AuthContext);
  useEffect(() => {
    refetch(); // data.point 값이 변경될 때마다 쿼리를 다시 실행 - 수연
  }, [isLogin]);

  const navigate = useNavigate();

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
    { name: "가챠샵", href: "/gatcha" },
  ];
  const userNavigation = [
    // 로그인 상태의 navbar
    { name: "기부하기", href: "/donation" },
    { name: "인증하기", href: "/review" },
    { name: "가챠샵", href: "/gatcha" },
    { name: `${data ? data.ticketCnt : "  "}개`, href: "/gatcha" },
    { name: `${data ? data.point : "  "} P`, href: "/point" },
    { name: "MYPAGE", href: "/profile" },
  ];
  // 수연: 로그아웃 호출
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
          <Logo>
            <p>우리 로고</p>
          </Logo>
          <Section>
            <Home>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goHome();
                }}
              >
                HOME
              </button>
            </Home>
            <Title>
              {userNavigation.map((item, index) => (
                <Link on={item.name} key={index} to={item.href}>
                  {item.name}
                </Link>
              ))}
            </Title>
            <Title>
              <LogoutButton>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    LogoutSubmit();
                  }}
                >
                  LOGOUT
                </button>
              </LogoutButton>
            </Title>
          </Section>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <Logo>
            <p>우리 로고</p>
          </Logo>
          <Section>
            <Home>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goHome();
                }}
              >
                HOME
              </button>
            </Home>
            <Title>
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
            </Title>
            <Title>
              <LogoutButton>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    goSignup();
                  }}
                >
                  SIGNUP
                </button>
              </LogoutButton>
            </Title>
            <Title>
              <LogoutButton>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    goLogin();
                  }}
                >
                  LOGIN
                </button>
              </LogoutButton>
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
  background-color: rgb(255 214 0);
  ${tw`
  px-2
  py-4
  h-16
  flex justify-between
  `}
`;

const Section = styled.div`
  word-break: break-all;
  ${tw`
   h-16 min-h-full order-last flex flex-1 items-center justify-end mr-20 tracking-tighter font-normal text-base
  `}
`;

const Logo = styled.div`
  ${tw`
    ml-20
  `}
`;

const Title = styled.div`
  ${tw`
  h-16 flex space-x-9
  `}
`;

const LogoutButton = styled.div`
  ${tw`
  h-16 ml-9 font-black tracking-tighter
  `}
`;

const Home = styled.div`
  color: rgb(254 98 76);
  ${tw`
  h-16 mr-9 font-black 
  `}
`;
export default NavBar;

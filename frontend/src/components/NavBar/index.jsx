import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../api/auth";

// 수연: navbar
const NavBar = () => {
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
        localStorage.setItem("nickname",response.data.info.nickname)
        setRole(response.data.roles);
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
  const { isLogin, setIsLogin, role, setRole } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
      refetch();
    }
    // isLogin 값이 변경될 때마다 쿼리를 다시 실행 - 수연
  }, [isLogin]);
  const navigate = useNavigate();

  const goPage = (page) => {
    navigate(`${page}`, { replace: false });
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
    { name: `${data?.info ? data?.info.ticketCnt : "  "}개`, href: "/gatcha" },
    { name: `${data?.info ? data?.info.totalPoint : "  "} P`, href: "/point" },
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        setIsLogin(false);
        navigate("/", { replace: false });
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };

  return (
    <Nav>
      <Logo>
        <p>우리 로고</p>
      </Logo>
      <Section>
        <div>
          {isLogin && role === "ROLE_ADMIN" ? (
            <AdminButton
              onClick={(e) => {
                e.preventDefault();
                goPage("/admin");
              }}
            >
              Admin 계정입니다.
            </AdminButton>
          ) : (
            ""
          )}
        </div>
        <Home>
          <button
            onClick={(e) => {
              e.preventDefault();
              goPage("/");
            }}
          >
            HOME
          </button>
        </Home>
        <Title>
          {isLogin
            ? userNavigation.map((item, index) => (
                <Link on={item.name} key={index} to={item.href}>
                  {item.name}
                </Link>
              ))
            : navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
        </Title>
        <Title>
          <LogoutButton>
            {isLogin ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  LogoutSubmit();
                }}
              >
                LOGOUT
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goPage("/signup");
                }}
              >
                SIGNUP
              </button>
            )}
          </LogoutButton>
        </Title>
        {!isLogin ? (
          <Title>
            <LogoutButton>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  goPage("/login");
                }}
              >
                LOGIN
              </button>
            </LogoutButton>
          </Title>
        ) : (
          ""
        )}
      </Section>
    </Nav>
  );
};

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: transparent;
  height: 100px;
  ${tw`px-2 py-4 flex justify-between`}
`;

const Section = styled.div`
  word-break: break-all;
  ${tw` min-h-full order-last flex flex-1 items-center justify-end mr-20 tracking-tighter font-normal text-base`}
`;

const Logo = styled.div`
  ${tw`ml-20`}
`;

const Title = styled.div`
  ${tw` flex space-x-9`}
`;

const LogoutButton = styled.div`
  ${tw` ml-9 font-black tracking-tighter`}
`;

const Home = styled.div`
  color: rgb(254 98 76);
  ${tw` mr-9 font-black`}
`;

const AdminButton = styled.button`
  color: rgb(20 90 200);
  ${tw`mr-9 font-normal font-black`}
`;

export default NavBar;

import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const NavBar = () => {
  const point = useState(0);
  const ticket = useState(0);

  const navigation = [
    { name: "HOME", href: "#" },
    { name: "기부하기", href: "#" },
    { name: "인증하기", href: "#" },
    { name: "가챠샵", href: "#" },
    { name: `${ticket[0]}개`, href: "#" },
    { name: `${point[0]} P`, href: "#" },
    { name: "SIGNUP/LOGIN", href: "#" },
  ];

  return (
    <>
      <Nav>
        <Section>
          <Logo>
            <p>우리로고</p>
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
};

const Nav = styled.div`
  ${tw`
  z-10 bg-yellow-100
  fixed top-0 left-0 right-0 
  px-2
  text-black
  h-16
  relative
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

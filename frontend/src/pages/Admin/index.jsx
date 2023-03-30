import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 수연: 관리자 페이지를 여기서 모두 관리
const AdminPage = () => {
  const navigate = useNavigate();
  const [boardid, setBoardid] = useState("");
  const onChangeBoardid = (e) => setBoardid(e.target.value);

  const goCreateNotice = (projectid) => {
    navigate(`/admin/notice/${projectid}`, { replace: false });
  };

  const goUpdateNotice = (boardid) => {
    navigate(`/admin/notice/update/${boardid}`, { replace: false });
  };

  const goCreateProject = () => {
    navigate(`/admin/project/create`, { replace: false });
  };

  const goAuthCode = () => {
    navigate(`/admin/authcord`, { replace: false });
  };

  return (
    <Container>
      <Heading>관리자 페이지입니다.</Heading>
      <InnerContainer>
        <Box>
          <Title>프로젝트 생성</Title>
          <InnerBox>
            <span>프로젝트 생성하기 </span>
            <Btn
              onClick={(e) => {
                e.preventDefault();
                goCreateProject();
              }}
            >
              go
            </Btn>
          </InnerBox>
        </Box>
        <Box>
          <Title>공지글 작성</Title>
          <InnerBox>
            <span>흑두루미 공지글 작성하기 </span>
            <Btn
              onClick={(e) => {
                e.preventDefault();
                goCreateNotice(1);
              }}
            >
              go
            </Btn>
          </InnerBox>
          <InnerBox>
            <span>다람쥐 공지글 작성하기 </span>
            <Btn
              onClick={(e) => {
                e.preventDefault();
                goCreateNotice(2);
              }}
            >
              go
            </Btn>
          </InnerBox>
          <InnerBox>
            <span>야생동물 공지글 작성하기 </span>
            <Btn
              onClick={(e) => {
                e.preventDefault();
                goCreateNotice(3);
              }}
            >
              go
            </Btn>
          </InnerBox>
        </Box>
        <Box>
          <Title>공지글 수정</Title>
          <Input
            type="number"
            placeholder="게시글 id를 입력하세요"
            value={boardid}
            onChange={onChangeBoardid}
          />
          <Btn
            onClick={(e) => {
              e.preventDefault();
              if (!boardid) {
                alert("게시글 id를 입력하세요")
              } else {
                console.log(boardid);
                goUpdateNotice(boardid);
              }
            }}
          >
            go
          </Btn>
        </Box>
        <Box>
          <Title>봉사 코드 조회</Title>
          <InnerBox>
            <span>코드 조회하기 </span>
            <Btn
              onClick={(e) => {
                e.preventDefault();
                goAuthCode();
              }}
            >
              go
            </Btn>
          </InnerBox>
        </Box>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  ${tw`
	mt-20 py-20 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  mt-10 grid gap-4 grid-cols-2
  `}
`;

const Heading = styled.h2`
  ${tw`
  text-center text-2xl font-black text-gray-300
  `}
`;

const Title = styled.h2`
  ${tw`
  text-center text-xl text-gray-900 font-black tracking-tighter
  `}
`;

const InnerBox = styled.div`
  ${tw`
	mt-3
  `}
`;

const Box = styled.div`
  ${tw`
		py-5 px-5 border-2 border-neutral-100
	`}
`;

const Btn = styled.button`
  ${tw`
	bg-amber-200 rounded px-3 py-1 hover:bg-amber-400 active:bg-amber-500 mx-1
	`}
`;

const Input = styled.input`
	${tw`
	border-2 border-gray-200
	`}
`
export default AdminPage;

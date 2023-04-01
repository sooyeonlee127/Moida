import styled from "styled-components";
import tw from "twin.macro";
import { useState, useEffect } from "react";
import api from "../../../api/auth";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 수연: 봉사 전체 목록 조회
const VolunteerCodePage = () => {
  const [dataList, setDataList] = useState([]);
  const [value, onChange] = useState();
  const [stringValue, setStringValue] = useState();
  const [category, setCategory] = useState("");
  const onChangeCategory = (e) => setCategory(e.target.value);

  function dateFormat(date) {
    // yyyy-mm-dd로 변환하는 함수 - 이은혁
    let dateFormat2 =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
    return dateFormat2;
  }

  useEffect(() => {
    const d = new Date(value);
    setStringValue(dateFormat(d));
  }, [value]);
  
  // 수연: 받아온 봉사정보 필터링
  const volunteerList = dataList
    .filter(
      (data) => data.projectCategory === category && data.date === stringValue
    )
    .map((data, index) => (
      <tr key={index}>
        <Th scope="col">{data.code}</Th>
        <Th scope="col">{data.date}</Th>
        <Th scope="col">{data.capacity}</Th>
        <Th scope="col">{data.maxCapacity}</Th>
        <Th scope="col">{data.projectCategory}</Th>
        <Th scope="col">{data.projectGeneration}</Th>
        <Th scope="col">{data.volunteerDateId}</Th>
      </tr>
    ));

  const getList = () => {
    api
      .get(`/project/volunteer-date-info`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        setDataList(res.data);
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Heading>봉사 정보 조회 페이지</Heading>
        <InputGroup>
          <Box>
            <div>
              <InputText>SQUIRREL / CRANE / WILD_ANIMAL</InputText>
              <AdminInput
                type="text"
                placeholder="카테고리를 입력하세요"
                value={category}
                onChange={onChangeCategory}
              />
            </div>
          </Box>
          <Box>
            <InputText>봉사일자를 선택하세요.</InputText>
            <Calendar onChange={onChange} value={value} disableTile />
          </Box>
        </InputGroup>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th scope="col">봉사 코드</Th>
                <Th scope="col">봉사일</Th>
                <Th scope="col">신청인원</Th>
                <Th scope="col">최대수용인원</Th>
                <Th scope="col">카테고리</Th>
                <Th scope="col">프로젝트 id</Th>
                <Th scope="col">봉사 id</Th>
              </tr>
            </Thead>
            {volunteerList.length >= 1 ? (
              <tbody>{volunteerList}</tbody>
            ) : (
              <div></div>
            )}
          </Table>
          {volunteerList.length === 0 ? (
            <div>조회 가능한 데이터가 없습니다...</div>
          ) : (
            <div></div>
          )}
        </TableContainer>
      </InnerContainer>
    </Container>
  );
};

const Table = styled.table`
  ${tw`
    w-full text-sm text-left text-gray-500 dark:text-gray-400
  `}
`;
const Thead = styled.thead`
  ${tw`
    text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400
  `}
`;

const Th = styled.th`
  ${tw`
  px-6 py-3
  `}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
`}
`;

const InnerContainer = styled.div`
  ${tw`
  px-20 py-7 w-full space-y-8 
  `}
`;

const Box = styled.div`
  ${tw`
		px-5
	`}
`;

const TableContainer = styled.div`
  ${tw`
  relative overflow-x-auto bg-gray-100
  `}
`;
const Heading = styled.h2`
  ${tw`
  text-center text-xl text-gray-900 font-black tracking-tighter
  `}
`;

const InputGroup = styled.div`
  ${tw`
  pl-10 mt-10 bg-gray-50 py-4
  `}
`;

const InputText = styled.label`
  ${tw`
   px-1 mt-2 flex text-sm font-light leading-6 text-gray-500 
  `}
`;

const AdminInput = styled.input`
  ${tw`
  relative block py-2 pl-2.5 pr-10 text-gray-900 border border-gray-500
  `}
`;

export default VolunteerCodePage;

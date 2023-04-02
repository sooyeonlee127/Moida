import React, { useEffect, useState } from 'react';
import useListApi from "./api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "./volunteerList.css";


const VolunteerList = () => {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
    const { data:datas, length, error, loading } = useListApi("volunteer", pageNum, pageSize)
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [doneId, setDoneId] = useState();
    const navigate = useNavigate();

    // 취소코드
    const volunteerCancel = async (cancelId) => {
      await axios
      .put("/api/users/me/volunteer", {
        volunteerId: cancelId,
        status: "CANCEL",
      }, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        }
      })
      .then((res) => {
        console.log(res)
        alert("취소되었습니다.")
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
    }



    //완료코드
    const volunteerDone = async (value, doneId) => {
      try {
      const res = await axios
      .put("/api/users/me/volunteer", {
        volunteerId: doneId,
        status: "DONE",
        code: value,
      }, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        }
      })
      if (res) {
        console.log(res)
        alert("완료되었습니다.")
        setVisible(!visible);
      }

      } catch(error) {
        console.log(error.response.data.message)
        alert("인증코드가 다릅니다.")
      }
    }
    const Pagination = () => {
      const lastPage = parseInt((length+5)/pageSize) || 1 // 데이터 개수가 한 페이지 분량보다 작은경우에도 1이 뜨도록 처리 - 이은혁
      const tmp = []
      for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
          tmp.push(i)
      }
      setPageList(tmp)
    }
    useEffect(() => {
      Pagination()
    }, [length])

    return (
        <>
        {visible && 
          <form >
            <input
            id = "Atcode"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            type="text"
            placeholder='코드를 입력하세요'
            />
            <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              volunteerDone(value,doneId)
              setValue("")
            }}
            >확인</button>
          </form>
          }
        <table>
            <thead>
                <tr>
                    <th>프로젝트 차수</th>
                    <th>프로젝트 id</th>
                    <th>프로젝트 제목</th>
                    <th>봉사 날짜</th>
                    <th>봉사 id</th>
                    <th>상태</th>
                    <th>취소 버튼</th>
                    <th>완료 버튼</th>
                    <th>리뷰 작성</th>
                </tr>
            </thead>
            <tbody>
                {datas?.map((data, index) => { 
                    return (
                        <tr key={index}>
                            <td>{data.generation}</td>
                            <td>{data.projectId}</td>
                            <td>{data.projectSubject}</td>
                            <td>{data.regDate}</td>
                            <td>{data.volunteerId}</td>
                            <td>{data.status}</td>
                            <td
                            className={ data.status === "REGISTER" ? "" : "Disable"}
                            onClick={()=>{volunteerCancel(data.volunteerId);}}>취소</td>
                            <td
                            className={ data.status === "REGISTER" ? "" : "Disable"}
                            onClick={()=>{setVisible(!visible); setDoneId(data.volunteerId)}}>완료</td>
                            <td
                            className={ data.status === "DONE" || data.status === "WRITTEN" ? "" : "Disable"}
                            onClick={()=>{
                              const path = data.status === "DONE" ? "/review/create" : "/review/"+ data.articleId;
                              navigate(path,
                            {state:{
                              volunteerId: data.volunteerId,
                              projectId : data.projectId,
                            }});
                              }}>{ data.status === "WRITTEN" ? "상세 보기" : "리뷰 작성"}</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
        <p> 
          {datas.length === 0 && !loading? "빈 값":""}
          {loading? "로딩 중":""}
          {pageList?.map((num, index)=>{ return (<PageBtn key={index} onClick={()=> setPageNum(num)}>{num}</PageBtn>) })}
        </p>
        
        </>
    )
}

const PageBtn = styled.button`
margin: 0 10px;
padding: 5px 10px;
border: 1px solid black;
background-color: red;
`

export default React.memo(VolunteerList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁



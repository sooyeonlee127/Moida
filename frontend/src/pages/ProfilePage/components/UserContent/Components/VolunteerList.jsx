import React, { useState } from 'react';
import useListApi from "./api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const VolunteerList = () => {
    const { data:datas, error, loading } = useListApi("volunteer")
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
      }

      } catch(error) {
        console.log(error.response.data.message)
        alert("인증코드가 다릅니다.")
      }

    }

    return (
        <>
        {visible && 
          <form >
            <input
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
                            <td onClick={() =>{volunteerCancel(data.volunteerId);}}>취소</td>
                            <td onClick={()=>{setVisible(!visible); setDoneId(data.volunteerId)}}>완료</td>
                            <td onClick={()=>{navigate('/review/create',
                            {state:{
                              volunteerId: data.volunteerId,
                              projectId : data.projectId,
                            }});
                              }}>리뷰 작성</td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
            
        </>
    )
}

export default React.memo(VolunteerList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁
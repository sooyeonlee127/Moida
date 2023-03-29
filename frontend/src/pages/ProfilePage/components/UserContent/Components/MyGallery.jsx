import React from 'react'
import useListApi from "./api"


const MyGallery = () => {
  const { data: datas, error, loading } = useListApi("volunteer-article")

  return (
    <>

              {datas.map((data, index) => { 
                    return (
                        <div key={index}>
                            <p>프로젝트 분류 : {data.category}</p>
                            <p>난이도 : {data.difficultyLevel}</p>
                            <p>제목 : {data.subject}</p>
                            <p>작성일시 : {data.regDate}</p>
                            <p>내용 : {data.description}</p>
                        </div>
                    )
                })}

        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
    </>
  )
}

export default MyGallery;
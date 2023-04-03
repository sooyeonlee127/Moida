import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'
import Paging from "../../../../components/Pagination/Paging";


//혜수: 사용자 리뷰 전체 조회
const ReviewList = () => {
  const [data, setData] = useState([]); //리스트에 나타낼 아이템들
  const [length, setLength] = useState(0); // 전체 데이터 갯수 저장(페이지네이션) - 이은혁
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(10); // 한 페이지에 보여줄 아이템 수 
  const [selected1, setSelected1] = useState("ALL");
  const [selected2, setSelected2] = useState("LATEST");
  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  const sort = ["LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"]
  const [tabIndex, setTabIndex] = useState(0);

  const getReviews = async(category, sort) => {
    try {
      console.log(category, sort)
      const res = await axios({
        url: "/api/article",
        method: "GET",
        params: {
          pageNumber: pageNum, // 요청할 페이지 넘버
          pageSize: pageSize, //몇개씩 불러올건지
          category: category,
          sort: sort
        },
        headers: {
          accept: "*/*"
        }
      })
      if(res){
        setData(res.data.articleList);
        setLength(res.data.length); //전체 데이터 개수 받아옴
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviews(selected1, selected2)
  }, [selected1, selected2, pageNum])


  return (
    <div>
      {/* 유저후기 */}
      <Title>Gallery</Title>
      
      <Section>
        <TabGroup>
            {/* 카테고리 */}
            <Ul>
              {category.map((element, index)=>{
                  return (
                  <Li key={index} className={tabIndex === index ? "submenu focused" : "submenu"}
                  onClick={()=> {setTabIndex(index); setSelected1(element);}}>{element}</Li>
                  )
              })}

              {/* 정렬 */}
              <Sort>
                <select onChange={(e)=> setSelected2(e.target.value)}>
                  {sort.map((element,index) => (
                    <option key={index}>{element}</option>
                  ))}
                </select>
              </Sort>
            </Ul>
        
        </TabGroup>
      </Section>

      

      
      <div>
        {
          data?.map((element,index) => {
            return (
              <ReviewCard review={element} index={index} key={index} />
            )
          })
        }
      </div>
      <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/> 

    </div>
  )
}

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const Section = styled.div`
min-height: 300px;
height: 100%;
display: flex;
-webkit-box-pack: justify;
justify-content: flex-start;
-webkit-box-align: center;
align-items: center;
flex-direction: column;
`

const TabGroup = styled.div`
width: 100%;
`

const Ul = styled.ul`
color: rgba(73, 73, 73, 0.5);
font-weight: bold;
display: flex;
flex-direction: row;
justify-items: center;
align-items: center;
list-style: none;
cursor : pointer;
border-bottom: 1px solid #838383;

.submenu {
    ${'' /* 기본 Tabmenu 에 대한 CSS를 구현합니다. */}
    display: flex;
    justify-content: space-between;
    padding : 10px 25px;
    font-size : 15px;
  }

  .focused {
    ${'' /* 선택된 Tabmenu 에만 적용되는 CSS를 구현합니다.  */}
    color : black;
    font-weight: 700;
    border-bottom: 2px solid #838383;
  }

  & div.desc {
    text-align: center;
  }
`

const Li = styled.li`

`
const Desc = styled.div`
width: 100%;
`;

const Sort = styled.div`
  color: black;
  
`


export default ReviewList;


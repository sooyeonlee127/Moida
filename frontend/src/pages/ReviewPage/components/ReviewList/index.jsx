import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'
import Paging from "../../../../components/Pagination/Paging";
import { useNavigate } from "react-router";
import heart from "../../../../assets/img/heart.png"


//혜수: 사용자 리뷰 전체 조회
const ReviewList = () => {
  const [data, setData] = useState([]); //리스트에 나타낼 아이템들
  const [length, setLength] = useState(0); // 전체 데이터 갯수 저장(페이지네이션) - 이은혁
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(9); // 한 페이지에 보여줄 아이템 수 
  
  const [selected1, setSelected1] = useState("ALL");
  const [selected2, setSelected2] = useState("LATEST");
  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  const categoryName = ["ALL", "CRANE", "SQUIRREL", "WILD_ANIMAL"]
  const sort = ["LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"] 
  const sortName = ["최신순", "난이도 높은 순", "난이도 낮은 순"] 
  const [tabIndex, setTabIndex] = useState(0);

  const navigate = useNavigate();

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
    <Wrapper>
      {/* 유저후기 */}
      <SepLine></SepLine>
      <Title>Storybook</Title>
      
      <Section>
        <TabGroup>
            {/* 카테고리 */}
            <Ul>
              <CategoryBox>
                {category.map((element, index)=>{
                    return (
                    <Li key={index} className={tabIndex === index ? "submenu focused" : "submenu"}
                    onClick={()=> {setTabIndex(index); setSelected1(categoryName[index]);}}>{element}</Li>
                    )
                })}
              </CategoryBox>

              {/* 정렬 */}
              <Sort className="select">
                <select onChange={(e)=> setSelected2(e.target.value)}>
                  {sort.map((element,index) => (
                    <option key={index} value={element}>{sortName[index]}</option>
                  ))}
                </select>
              </Sort>
            </Ul>
        
        </TabGroup>
      </Section>

      {/* 카드 */}

      <Card>
        {
            data?.map((element,index) => {
              return (
                <Image
                id = "review" name="review"
                onClick={() => {navigate(`/review/${element.id}`)}}
                src={ element.url ? element.url : heart } index={index} key={index} alt="이미지가 없어요" />
              )
            })
        }
      </Card>


      {/* 리뷰카드들 */}
      {/* <div>
        {
          data?.map((element,index) => {
            return (
              <ReviewCard review={element} index={index} key={index} />
            )
          })
        }
      </div> */}

      {/* 페이징 */}
      <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/> 
    </Wrapper>
  )
}


const Wrapper = styled.div`
  width: 100%;
`

const SepLine = styled.div`
  background-color: rgb(160, 200, 70);
  height: 3px;
  width: 80px;
  margin-bottom: 15px;
`

const Card = styled.div`
  display: flex;
  flex-wrap: wrap; // 이미지가 한 줄을 넘어갈 경우 자동으로 다음 줄로 이동
  // justify-content: space-between; // 각 이미지들 사이에 공간을 일정하게 두기 위한 속성
  height: auto%;
  width: 100%
  
`

const Image = styled.img`
  ${tw`hover:opacity-50 rounded-t-lg bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700`}
  cursor: pointer;
  border-radius: 15px;
  height: auto; // 이미지의 높이를 자동으로 조절하여 가로 세로 비율을 유지하도록 함
  width: calc(33.3% - 10px); // 한 줄에 3개의 이미지를 배치하기 위해, 100%를 3으로 나누고 10px을 빼서 각 이미지의 너비를 지정함
  margin-bottom: 20px; // 각 이미지의 아래쪽에 일정한 간격을 두기 위해 마진 값을 지정함
  margin : 10px 5px 0px 5px;
  object-fit: cover;
  `


const Title = styled.h2`
  ${tw`text-2xl font-bold tracking-tight text-gray-900`}
  text-align: left;  
`

const Section = styled.div`
margin-bottom: 40px;
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
cursor : pointer;
`
const CategoryBox = styled.div`
  display: flex;
  flex: 1;
`

const Sort = styled.div`
  color: rgb(98, 102, 110);
  &.select > select {
    background-color: transparent;
<<<<<<< Updated upstream
    font-size: 0.9rem;
=======
    cursor : pointer;
>>>>>>> Stashed changes
  }
`


export default ReviewList;


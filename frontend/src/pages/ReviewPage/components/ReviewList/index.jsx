import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'

//혜수: 사용자 리뷰 전체 조회
const ReviewList = () => {
  let [card, setCard] = useState([]);
  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  const [selected1, setSelected1] = useState("ALL");

  const sort = ["LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"]
  const [selected2, setSelected2] = useState("LATEST");

 
  const getReviews = async(category, sort) => {
    try {
      console.log(category, sort)
      const res = await axios({
        url: "/api/article",
        method: "GET",
        params: {
          pageNumber: 1,
          pageSize: 10,
          category: category,
          sort: sort
        },
        headers: {
          accept: "*/*"
        }
      })
      if(res){
        setCard(res.data);
        console.log(res.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviews(selected1, selected2)
  }, [selected1, selected2])

  return (
    <div>
      {/* 유저후기 */}
      <Title>Gallery</Title>
      <div>
      {
        card?.map((element,index) => {
          return (
            <ReviewCard

            review={element} index={index} key={index} />
          )
        })
      }
      </div>

      
      <nav aria-label="Page navigation example">
        <Ul>
          <li>
            <Pagination1>
              <span className="sr-only">이전</span>
              {/* <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> */}
            </Pagination1>
          </li>
          <li>
            <A aria-current="page" className="active">1</A>
          </li>
          <li>
            <A className="active">2</A>
          </li>
          <li>
            <A  className="active">3</A>
          </li>
          <li>
            <A className="active">4</A>
          </li>
          <li>
            <A className="active">5</A>
          </li>
          <li>
            <Pagination2>
              <span className="sr-only">다음</span>
              {/* <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> */}
            </Pagination2>
          </li>
        </Ul>
      </nav>
    </div>
  )
}

const SelectBox1 = () => {

  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  return (<>
        <div>
          <select>
            {category.map((element,index) => (
              <option key={index+1}>{element}</option>
            ))}
          </select>

<<<<<<< Updated upstream
        </div>
  </>)
}
=======
>>>>>>> Stashed changes

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const A = styled.a`
${tw`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
  &.active {
    ${tw`block ml-0 rounded-l-lg `}
  }
`

const Pagination1 = styled.a`
${tw`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`

const Pagination2 = styled.a`
${tw`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`

const Ul = styled.ul`
${tw`inline-flex items-center -space-x-px`}`



export default ReviewList;


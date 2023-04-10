import styled from "styled-components"
import { Link } from "react-router-dom"

const NoticeCard = (props) => {
    const { title, shortDesc, imgUrl, category } = props
    return (
      <div>
        <Link to={"/notice/"+category}>
            <Image src={imgUrl} alt=""/>
            <p>{title}</p>
            <p>{shortDesc}</p>
        </Link>
      </div>
    )
  }


const Image= styled.img`
height: 300px;
margin: 0 10px;
display: block;
`



export default NoticeCard
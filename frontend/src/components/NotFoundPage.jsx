import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <InnerWrapper> 
                <img src='https://s3.ap-northeast-2.amazonaws.com/moida.bucket/static/nft/43_20230405173938.png' style={{width: "200px"}}/>
                <h1>404 NOT FOUND</h1> 
                <p>알 수 없는 페이지 입니다.</p>
                <Button onClick={()=>navigate("/")}>메인으로</Button>
            </InnerWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InnerWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    & > p {
        font-size: 1.2rem;
        margin-bottom: 3rem;
    }
`

const Button = styled.button`
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
        background: gray;
        color: white;
    }
    &:active {
        background: black;
        color: white;

    }
`
export default NotFoundPage;
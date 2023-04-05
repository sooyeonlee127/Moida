import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <InnerWrapper> 
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
`

const Button = styled.button`
    border: 1px solid black;
    padding: 5px;
`
export default NotFoundPage;
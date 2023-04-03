import styled from "styled-components";
import NoticeList from "./components/NoticeList";
import ReviewList from "./components/ReviewList";

const ReviewPage = () => {
    return (
        <Wrapper>
            <InnerWrapper>
                <NoticeList/>
                <Midbox></Midbox>
                <ReviewList/>
            </InnerWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: calc(100vh - 100px);
`
const InnerWrapper = styled.div`
width:100%;
max-width: 1000px; 
`

const Midbox = styled.div`
  height : 150px;
`


export default ReviewPage;
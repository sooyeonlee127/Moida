import styled from "styled-components";
import NoticeList from "./components/NoticeList";
import ReviewList from "./components/ReviewList";

const ReviewPage = () => {
    return (
        <Wrapper>
            <InnerWrapper>
                <NoticeList/>
                <ReviewList/>
            </InnerWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const InnerWrapper = styled.div`
width:100%;
max-width: 1200px; 
`

export default ReviewPage;
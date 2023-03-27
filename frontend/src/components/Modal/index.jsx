import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Modal = ({ isOpen, title, children }) => { // 작성자 : 이은혁
// isOpen :모달 오픈 여부=> true/false
// child : 모달 내부에 들어갈 컴포넌트(DOM) 

    if (!isOpen) return null; 

    return ReactDOM.createPortal(
        <BackGround>
            <WrapModal>
                <H1>{title}</H1>
                { children }
            </WrapModal>
        </BackGround>,
        document.body
    )
}
const BackGround = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
`
const WrapModal = styled.div`
    padding: 30px;
    min-width: 600px;
    max-width: 90%;
    min-height: 300px;
    max-height: 90%;
    background-color: white;
    border-radius: 10px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`

const H1 = styled.h1`
font-size: 1.5rem;
margin-bottom: 0.5rem;
font-weight: 700;
`
export default Modal;
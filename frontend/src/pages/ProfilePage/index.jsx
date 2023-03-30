import styled from "styled-components"
import tw from "twin.macro"
import UserStatus from './components/UserStatus'
import UserContent from './components/UserContent'
import Modal from '../../components/Modal';
import { useState } from 'react'
import useValidator from "../../components/Validator";
import api from "../../api/auth";
import MyGallery from "./components/UserContent/Components/MyGallery";

const ProfilePage = () => {
    const [ isOpen, setIsOpen ] = useState(false); // 비밀번호 변경 모달용 - 이은혁
    const submit = () => { // 비밀번호 변경 제출 - 이은혁
        api({
            url: "/users/me/password",
            method: "PUT",
            data: {
                currentPassword: curPw,
                newPassword: confirmPw
            },
            headers: {
                "accept": "*/*",
                "Authorization": localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
            }
        })
        .then((res) => { // 비밀번호 일치 시 모달 종료
            alert("비밀번호 변경 완료")
            setIsOpen(false)
        })
        .catch((err) => {
            console.log(err)
            setcurPwMMsg("기존의 비밀번호와 일치하지 않습니다.")
        })
    }


    // 유효성 검사 관련 state - 이은혁
    const [curPw, setCurPw ] = useState("");            // 기존 비밀번호 인풋값
    const [curPwMsg, setcurPwMMsg ] = useState();       // 기존 비밀번호 일치 여부 메시지 
    const [confirmPw, setConfirmPw ] = useState("");    // 새로운 비밀번호 확인 인풋값
    const [confirmMsg, setConfirmMsg ] = useState();    // 새로운 비밀번호 확인 유효성 검사 메시지
    
    const {fn: Validator, inputValue:newPw='', isValid, Msg} = useValidator() // newPw 기본값 지정. 안하면 오류 undefined 발생 - 이은혁
    // 순서대로 [유효성검사 메서드, input값, isvalid, 출력메시지]를 반환
    // 유효성검사 메서드는 인자로 'input type'과 'input value'을 받음


    return (
        <>
        <Modal isOpen={isOpen} title={"비밀번호 변경"}>
        <Form action="">
            <label htmlFor="curpw">기존 비밀번호</label>
            <Input type="password" id="curpw" name="curpw" value={curPw} onChange={(e)=>setCurPw(e.target.value)} />
            <p>{curPwMsg}</p>
            <br/>

            <label htmlFor="newpw">새로운 비밀번호</label>
            <Input type="password" id="newpw" name="newpw" value={newPw} onChange={(e) => Validator("password",e.target.value)} />
            <p>{!isValid? Msg: ""}</p>

            <label htmlFor="confirmpw">새로운 비밀번호 확인</label>
            <Input type="password" id="confirmpw" name="confirmPw" 
                value={confirmPw} 
                onChange={(e) => {
                    setConfirmPw(e.target.value);
                    newPw!==e.target.value ? setConfirmMsg("비밀번호가 서로 다릅니다."):setConfirmMsg("")}}/>
            <p>{confirmMsg}</p>
            <ModalBtn type="submit" onClick={(e) => {e.preventDefault(); submit()}}>비밀번호 변경</ModalBtn>
            <ModalBtn onClick={() => setIsOpen(false)}>취소</ModalBtn>
            </Form>
        </Modal>
        <Wrapper>
            <Header>
                <MyMainNft />
                <WrapUserStatus>
                    <UserStatus />
                    <Btn onClick={() => setIsOpen(true)}>비밀번호 변경</Btn>
                    <Btn>Collection</Btn>
                </WrapUserStatus>
            </Header>
            <WrapUserContent>
                <UserContent />
            </WrapUserContent>
            <div>
              <MyGallery/>
            </div>
        </Wrapper>
        
        </>
    )
}


const Wrapper = styled.div`
margin: 0 auto;
max-width: 1200px;
`

const Header = styled.div`
margin: 30px 0;
width: 100%;
display: flex;
flex-direction: row;
${tw``}
`

const MyMainNft = styled.div`
width: 220px;
height: 220px;
background-size: 220px;
background-image: url('https://openseauserdata.com/files/8da1deb8aca62959e0868e867d8f037f.svg')
`

const WrapUserStatus = styled.div`
margin-left: 30px;
background-color: lightgrey;
flex-grow: 1; flex-shrink: 1; flex-basis: 0%;
padding: 20px 30px;
`

const Btn = styled.button`
${tw`bg-sky-500 ring-1 rounded px-3 py-1 hover:bg-sky-400 active:bg-sky-500 mx-1`}
`

const WrapUserContent = styled.div`
width: 100%;
min-height: 500px;
background-color: lightgrey;
${tw``}
`

// ============ 비밀번호 변경 모달용 ==================

const Form = styled.form`
width: 100%;
padding: 0 30px;
`
const Input = styled.input`
border: 1px solid black;
padding: 2px 5px;
margin-bottom: 5px;
display: block;
width: 100%;

`

const ModalBtn = styled.button`
border: 1px solid #cacaca;
padding: 2px 10px;
margin: 20px 7px;
`

// ==================================================
export default ProfilePage;
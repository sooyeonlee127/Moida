import styled from "styled-components"
import tw from "twin.macro"
import UserStatus from './components/UserStatus'
import UserContent from './components/UserContent'
import Modal from '../../components/Modal';
import { useState } from 'react'

const ProfilePage = () => {

    const [ isOpen, setIsOpen ] = useState(false); // 비밀번호 변경 모달용 - 이은혁
    return (
        <>
        <Modal isOpen={isOpen} title={"비밀번호 변경"}>
        <Form action="">
            <label htmlFor="prevpw">기존 비밀번호</label>
            <Input type="password" id="prevpw" name="prevpw" />
            <br/>

            <label htmlFor="newpw">새로운 비밀번호</label>
            <Input type="password" id="newpw" name="newpw"/>

            <label htmlFor="confirmpw">새로운 비밀번호 확인</label>
            <Input type="password" id="confirmpw" name="confirmpw" />
            <ModalBtn type="submit" onClick={(e) => e.preventDefault()}>비밀번호 변경</ModalBtn>
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
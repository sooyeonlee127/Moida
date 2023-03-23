import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

//==================
const regExp = {
    email: {
        rule: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        message: "형식에 맞게 작성"
    },
    nickname: {
        rule: /^[ㄱ-ㅎ가-힣a-zA-Z]{2,8}$/, 
        message: "닉네임은 3~8글자로 작성해주세요 (영어, 한글)"
    },
    password: {
        rule: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
        message: "영문, 숫자, 특수문자 중 2가지 이상 조합하여 8~16 자리로 설정해주세요"
    }
}

const Form = (props) => {
    const [ formInfo, setFormInfo ] = useState({
        email: "",
        emailMessage: "",
        nickname: "",
        nicknameMessage: "",
        phone1: "010",
        phone2: "",
        phone3: "",
        phoneMessage: "",
        password: "",
        passwordMessage: "",
        passwordConfirm: "",
        passwordConfirmMessage: "",
    })

    const changeInput = (event) => {
        const { value, name } = event.target;
        let message = ''; // 에러메시지를 담을 변수
        const msgtag = name+"Message"

        if(value.match(regExp[name]['rule']) !== null){ 
            message = "";
        } else {
            message = regExp[name]['message'];
        }
        setFormInfo({...formInfo, //기존 inputs 객체를 복사 - 나머지 패턴
            [name]: value, //name 키를 가진 값을 value 로 설정
            [msgtag]: message //에러메시지 내용담기
        })
    }
    const changePhone = (event) => {
        const { value, id } = event.target;
        const p2 = formInfo.phone2
        const p3 = formInfo.phone3
        let message = ''; // 에러메시지를 담을 변수
        if (id ==='phone2') {
            if (!Number(p3) || (p2 !== '' && !Number(value))) {
                message = "숫자를 입력해주세요";
            } 
        } else {
            if (!Number(p2) || (p3 !== '' && !Number(value))) {
                message = "숫자를 입력해주세요";
            } 
        }
        setFormInfo({...formInfo, [id]: value,  phoneMessage: message})
    }
    const checkPassword = (event) => {
        const { value } = event.target;
        let message = ''
        if(formInfo.password.match(regExp['password']['rule']) !== null){ 
            if (value !== formInfo.password) {
                message = "비밀번호가 일치하지 않습니다"
            }
        }
        setFormInfo({...formInfo, passwordConfirm: value, passwordConfirmMessage: message})
    } 

    const navigate = useNavigate();
    // 아래부터는 회원가입 관련 코드
    const signupMutation = useMutation(async(formdata) => {
        return axios.post("/api/user/join",
        formdata,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': "*/*"
            }
        })
        .then((response) => response)
        .catch((error) => error);
    });

    const handleSubmit = async (event) => {
        await event.preventDefault();
        const formData = {
            email: formInfo.email,
            password: formInfo.password,
            phone: formInfo.phone1+'-'+formInfo.phone2+'-'+formInfo.phone3,
            nickname: formInfo.nickname,
            nftUrl: "string",
            walletUrl: "string",
            role: "ROLE_USER"
        }
        const res = await signupMutation.mutateAsync(formData)
        if (res.status===200) {
            console.log("회원가입 완료")
            navigate("/")

        } else if (res.status===400) {
            console.log("잘못된 접근입니다.")
        } else {
            console.log("이미 존재하는 회원 또는 닉네임입니다.")
        }
        console.log(res)
    };

    return (
        <MyForm action="#" method="POST" onSubmit={handleSubmit}>
                <WrapInput>
                    <Div>
                        <Label htmlfor="email">Email</Label>
                        <InnerDiv>
                            <Input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="growinput"
                                onChange={ changeInput } 
                                required
                            />
                            <Button onClick={() => {alert(formInfo.email+"는 사용 가능할지도?")}}>중복확인</Button>
                        </InnerDiv>
                        <Message>{formInfo.emailMessage}</Message>
                    </Div>
                    <Div>
                        <Label htmlfor="nickname">Nickname</Label>
                        <Input type="nickname" name="nickname" id="nickname"  value={formInfo.nickname} onInput={changeInput} autocomplete="nickname" className="blockinput"/>
                        <Message>{formInfo.nicknameMessage}</Message>
                    </Div>
                    <Div>
                        <Label htmlfor="phone-number">Phone number</Label>
                        <InnerDiv>
                            <select id="phone" name="phone" required className="grow h-full rounded-md ring-1 ring-inset ring-gray-300 border-0 py-1.5 pl-4 pr-9">
                                <option>010</option>
                                <option>011</option>
                                <option>017</option>
                                <option>019</option>
                            </select>
                            -
                            <Input type="text" id="phone2" name="phone" required className="growinput"  value={formInfo.phone2} onChange={changePhone} maxLength="4"/> -
                            <Input type="text" id="phone3" name="phone" required className="growinput"  value={formInfo.phone3} onChange={changePhone} maxLength="4"/>
                        </InnerDiv>
                        <Message>{formInfo.phoneMessage}</Message>
                    </Div>
                    <Div>
                        <Label htmlFor="password1">Password</Label>
                        <Input type="password" name="password" id="password1" required className="blockinput" onChange={changeInput}/>
                        <Message>{formInfo.passwordMessage}</Message>
                    </Div>
                    <Div>
                        <Label htmlFor="password2">Check password</Label>
                        <Input type="password" name="password" id="password2" required className="blockinput" onChange={checkPassword}/>
                        <Message>{formInfo.passwordConfirmMessage}</Message>
                    </Div>
                </WrapInput>
                <div className="mt-10">
                    <Button type="submit" className="submitbtn">회원가입</Button>
                </div>
            </MyForm>
    );
}
const MyForm = styled.form`
${tw`mx-auto mt-8 max-w-xl sm:mt-8`}
`
const WrapInput = styled.div`
${tw`grid grid-cols-1 gap-y-2 gap-x-8 sm:grid-cols-2`}
`
const Div = styled.div`
${tw`sm:col-span-2`}
`
const InnerDiv = styled.div`
${tw`flex flex-row`}
`
const Label = styled.label`
${tw`block text-sm leading-6 text-gray-900`}
`
const Input = styled.input`
${tw` rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5`}
    &.growinput {
        ${tw`grow`}
    }
    &.blockinput {
        ${tw`block w-full`}
    }
`
const Button = styled.button`
${tw`grow-0 rounded-md px-3.5 py-2.5 text-center text-sm`}
&.submitbtn {
    ${tw`block w-full bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
}
`

const Message = styled.p`
&.valid {
    color: green;
}
&.error {
    color: red;
}
`
export default Form;
import { useState } from "react";

const useValidator = () => {
    // 결과 실시간으로 반영하기 위해 state 사용
    const [ inputValue, setInputValue ] = useState()
    const [ isValid, setIsValid ] = useState(false)
    const [ message, setMessage ] = useState()

    const Validator = (type, value) => {
        setInputValue(value);
        const regExp = {
            email: {
                rule: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "형식에 맞게 작성",
            },
            nickname: {
                rule: /^[ㄱ-ㅎ가-힣a-zA-Z]{2,8}$/,
                message: "닉네임은 3~8글자로 작성해주세요 (영어, 한글)",
            },
            password: {
                rule: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
                message:
                "영문, 숫자, 특수문자 중 2가지 이상 조합하여 8~16 자리로 설정해주세요",
            },
        };
        setIsValid(regExp[type]["rule"].test(value));       // 유효성 검사 결과를 저장 => true/false
        setMessage(isValid? "": regExp[type]["message"]);   // 유효성 검사 후 출력할 메시지 설정
    }
    return {
        fn: Validator, 
        inputValue: inputValue, 
        isValid: isValid, 
        message: message
    };
}
export default useValidator;
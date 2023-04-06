import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import createAccount from "../../ethers/ethers";

//==================

const regExp = {
  email: {
    rule: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    message: "형식에 맞게 작성해주세요",
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

const Form = () => {
  const [formInfo, setFormInfo] = useState({
    email: "ssdf@dfgd.cde",
    nickname: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    password: "",
    passwordConfirm: "",
  });

  const [inputMessage, setInputMessage] = useState({
    email: "",
    nickname: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [validation, setValidation] = useState({
    email: "false",
    nickname: "false",
    phone: "false",
    password: "false",
    passwordConfirm: "false",
  });

  const [code, setCode] = useState(); // 이메일 인증코드

  const changeInput = (event) => {
    const { value, id, name } = event.target;
    if (id === "passwordConfirm") {
      setFormInfo((prevState) => {
        return { ...prevState, passwordConfirm: value };
      });
    } else {
      setFormInfo((prevState) => {
        return { ...prevState, [name]: value };
      });
    }

    setValidation((prevState) => {
      return { ...prevState, [name]: "false" };
    });
    // console.log("regExp[name]['rule']", regExp[name]['rule'])
    if (id === "passwordConfirm") {
      console.log(formInfo.password, "+ ", value);
      if (formInfo.password === value) {
        setInputMessage((prevState) => {
          return { ...prevState, passwordConfirm: "" };
        });
      } else {
        setInputMessage((prevState) => {
          return {
            ...prevState,
            passwordConfirm: "비밀번호가 일치하지 않습니다",
          };
        });
      }
    } else if (value.match(regExp[name]["rule"]) !== null) {
      if (name !== "email") {
        setValidation((prevState) => {
          return { ...prevState, [name]: "true" };
        });
        if (name !== "nickname") {
          setInputMessage((prevState) => {
            return { ...prevState, [name]: "" };
          });
        }
      }
    } else {
      setInputMessage((prevState) => {
        return { ...prevState, [name]: regExp[name]["message"] };
      });
    }
  };

  const [timer, setTimer] = useState(0); // 디바운싱 타이머

  useEffect(() => {
    if (timer) {
      // console.log("clear timer");
      clearTimeout(timer);
    }
    if (formInfo.nickname.match(regExp["nickname"]["rule"]) !== null) {
      // 디바운싱 (입력 0.5초 뒤 axios 요청)
      const newTimer = setTimeout(() => {
        axios({
          url: "/api/users/exists/nickname/" + formInfo.nickname,
          method: "POST",
        })
          .then((res) => {
            // console.log(res);
            setInputMessage((prevState) => {
              return { ...prevState, nickname: "사용 가능한 닉네임입니다." };
            });
            setValidation((prevState) => {
              return { ...prevState, nickname: "true" };
            });
          })
          .catch((error) => {
            console.log(error);
            setValidation((prevState) => {
              return { ...prevState, nickname: "false" };
            });
            if (error.response.status === 409) {
              setInputMessage((prevState) => {
                return { ...prevState, nickname: "이미 존재하는 닉네임입니다" };
              });
            } else if (error.response.status === 500) {
              setInputMessage((prevState) => {
                return { ...prevState, nickname: "잘못된 입력입니다" };
              });
            }
          });
      }, 500);
      setTimer(newTimer);
    } else {
      setInputMessage((prevState) => {
        return { ...prevState, nickname: regExp["nickname"]["message"] };
      });
    }
  }, [formInfo.nickname]);

  const changePhone = (event) => {
    console.log("changePhone");
    const { value, id } = event.target;
    const p2 = formInfo.phone2;
    const p3 = formInfo.phone3;
    let message = ""; // 에러메시지를 담을 변수
    if (id === "phone2") {
      if (!Number(p3) || (p2 !== "" && !Number(value))) {
        message = "숫자를 입력해주세요";
      }
    } else {
      if (!Number(p2) || (p3 !== "" && !Number(value))) {
        message = "숫자를 입력해주세요";
      }
    }
    setFormInfo({ ...formInfo, [id]: value, phoneMessage: message });
  };

  const navigate = useNavigate();
  // 아래부터는 회원가입 관련 코드
  const signupMutation = useMutation(async (formdata) => {
    console.log("signupMutation");
    return axios
      .post("/api/users/join", formdata, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => response)
      .catch((error) => error);
  });

  const handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    const formData = {
      email: formInfo.email,
      password: formInfo.password,
      phone: formInfo.phone1 + "-" + formInfo.phone2 + "-" + formInfo.phone3,
      nickname: formInfo.nickname,
      nftUrl: "string",
      walletUrl: "string",
      role: "ROLE_USER",
    };
    signupMutation.mutateAsync(formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // console.log("회원가입 완료");
        //========================================================================= < 여기에 추후 지갑 생성 작업
        navigate("/");
      } else if (res.status === 400) {
        console.log("잘못된 접근입니다.");
      } else {
        console.log("이미 존재하는 회원 또는 닉네임입니다.");
      }
    });
  };

  const checkEmail = async () => {
    console.log("checkEmail");
    console.log("formInfo.email", formInfo.email);
    setInputMessage((prevState) => {
      return { ...prevState, email: "로딩중" };
    });
    try {
      const res = await axios({
        url: "/api/users/exists/email/" + formInfo.email,
        method: "POST",
      });
      setInputMessage((prevState) => {
        return {
          ...prevState,
          email: "이메일로 전송된 인증코드를 입력해주세요",
        };
      });
      setCode(res.data);
    } catch (err) {
      if (err.response.status === 409) {
        setInputMessage((prevState) => {
          return { ...prevState, email: "이미 존재하는 이메일입니다." };
        });
      } else if (err.response.status === 500) {
        setInputMessage((prevState) => {
          return { ...prevState, email: "잘못된 입력입니다" };
        });
      } else {
        setInputMessage((prevState) => {
          return { ...prevState, email: "알 수 없는 오류입니다." };
        });
      }
    }
  };

  const CheckEmailCode = (value) => {
    console.log(code, value);
    if (value === code) {
      setValidation((prevState) => {
        return { ...prevState, email: "true" };
      });
      setInputMessage((prevState) => {
        return { ...prevState, email: "인증이 완료되었습니다." };
      });
    } else {
      setInputMessage((prevState) => {
        return { ...prevState, email: "잘못된 인증코드입니다." };
      });
    }
  };

  return (
    <MyForm action="#" method="POST" onSubmit={handleSubmit}>
      <WrapInput>
        <Div>
          <Label htmlfor="email">EMAIL</Label>
          <InnerDiv>
            <Input
              type="email"
              name="email"
              id="email"
              className="growinput"
              value={formInfo.email}
              onChange={changeInput}
              required
            />
            <Button type="button" onClick={checkEmail}>
              중복확인
            </Button>
          </InnerDiv>
          {code ? (
            <Input
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => CheckEmailCode(e.target.value)}
            />
          ) : (
            ""
          )}

          <Message>{inputMessage.email}</Message>
        </Div>
        <Div>
          <Label htmlfor="nickname">NICKNAME</Label>
          <Input
            type="nickname"
            name="nickname"
            id="nickname"
            onChange={changeInput}
            autocomplete="nickname"
            className="blockinput"
          />
          <Message>{inputMessage.nickname}</Message>
        </Div>
        <Div>
          <Label htmlfor="phone-number">PHONE</Label>
          <InnerDiv>
            <Select id="phone" name="phone" required>
              <option>010</option>
              <option>011</option>
              <option>017</option>
              <option>019</option>
            </Select>
            <Hyphen> - </Hyphen>
            <Input
              type="text"
              id="phone2"
              name="phone"
              required
              className="growinput"
              value={formInfo.phone2}
              onChange={changePhone}
              maxLength="4"
            />{" "}
            <Hyphen> - </Hyphen>
            <Input
              type="text"
              id="phone3"
              name="phone"
              required
              className="growinput"
              value={formInfo.phone3}
              onChange={changePhone}
              maxLength="4"
            />
          </InnerDiv>
          <Message>{inputMessage.phone}</Message>
        </Div>
        <Div>
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            className="blockinput"
            onChange={changeInput}
          />
          <Message>{inputMessage.password}</Message>
        </Div>
        <Div>
          <Label htmlFor="password">PASSWORD CHECK</Label>
          <Input
            type="password"
            name="password"
            id="passwordConfirm"
            required
            className="blockinput"
            onChange={changeInput}
          />
          <Message>{inputMessage.passwordConfirm}</Message>
        </Div>
      </WrapInput>
      <div className="mt-10">
        <Button type="submit" className="submitbtn">
          가입하기
        </Button>
      </div>
    </MyForm>
  );
};

const MyForm = styled.form`
  ${tw`
  mt-8 space-y-6
`}
`;
const WrapInput = styled.div`
  ${tw`grid grid-cols-1 gap-y-2 gap-x-8 sm:grid-cols-2`}
`;
const Div = styled.div`
  ${tw`sm:col-span-2`}
`;
const InnerDiv = styled.div`
  ${tw`
  flex flex-row
  `}
`;
const Label = styled.label`
  color: rgb(75, 75, 75);
  ${tw`
  px-1 mt-3 flex text-sm font-bold leading-6 
  `}
`;
const Input = styled.input`
  background-color: #fafaf3;
  ${tw`
  relative block w-full px-2 py-1.5 text-gray-800 border-b-2 border-gray-300
  py-1.5
   `}
  &.growinput {
    ${tw`grow py-1.5`}
  }
  &.blockinput {
    ${tw`block w-full py-1.5
    `}
  }
`;
const Button = styled.button`
  ${tw`
  flex-none grow-0 py-2.5 px-5 text-sm text-gray-800 border-b-2 border-gray-300
  `}
  &.submitbtn {
    background-color: rgb(160, 200, 70);
    ${tw`
    w-full ml-0 h-full py-5 px-10 font-bold border-b-0
    `}
  }
`;

const Message = styled.p`
  &.valid {
    color: green;
  }
  &.error {
    color: red;
  }
  ${tw`
  mt-2
  `}
`;

const Select = styled.select`
  background-color: #fafaf3;
  ${tw`
  grow h-full py-2 pl-2 pr-10 border-b-2 border-gray-300
  `}
`;

const Hyphen = styled.p`
  ${tw`
  px-3 border-b-2 border-gray-300
  `}
`;
export default Form;

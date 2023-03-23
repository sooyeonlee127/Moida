import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Form from './components/form'

const SignupPage = () => {
    const [ formInfo, setFormInfo ] = useState({
        email: "",
        nickname: "",
        phone1: "010",
        phone2: "",
        phone3: "",
        password: "",
        passwordConfirm: "",
    })

    return (
        <Container>
            <WrapTitle>
                <Title>회원가입</Title>
                <Form/>
            </WrapTitle>
            
        </Container>
    )
}
const Container = styled.div`
${tw`isolate bg-white py-28 px-6 sm:py-28 lg:px-8`}
`

const WrapTitle = styled.div`
${tw`mx-auto max-w-2xl text-center`}
`
const Title = styled.h2`
${tw`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl`}
`

// const WrapTitle = styled.div`
// ${tw`mx-auto max-w-2xl text-center`}
// `
// const WrapTitle = styled.div`
// ${tw`mx-auto max-w-2xl text-center`}
// `
// const WrapTitle = styled.div`
// ${tw`mx-auto max-w-2xl text-center`}
// `
export default SignupPage;
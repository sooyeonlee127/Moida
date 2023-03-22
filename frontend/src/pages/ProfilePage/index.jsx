import styled from "styled-components"
import tw from "twin.macro"
import UserStatus from './components/UserStatus'
import UserContent from './components/UserContent'

const ProfilePage = () => {
    return (
        <Wrapper>
            <Header>
                <MyMainNft />
                <WrapUserStatus>
                    <UserStatus/>
                </WrapUserStatus>
            </Header>
            <WrapUserContent>
                <UserContent />
            </WrapUserContent>
        </Wrapper>
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

`

const WrapUserContent = styled.div`
width: 100%;
min-height: 500px;
background-color: lightgrey;
${tw``}
`

export default ProfilePage;
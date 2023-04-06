import styled from 'styled-components'

const Footer = () => {

    return (
        <Div>
            <div>
                <p>모이다</p>
                <p>모이모이묑모임낭리아다다</p>
            </div>
            <div>
                <Box>
                    <Strong>BLOCKCHAIN TECHNOLOGY</Strong>
                    <p>저희 서비스는 블록체인 기술을 기반으로 한 Go-Ethereum을 이용하여 투명하고 안전하게 거래됩니다</p>
                </Box>
            </div>
            <img src="" alt="" />
        </Div>
    )
}

const Div = styled.div`
width: 100%;
height: 150px;
background: #EEEEEE;
`
const Box = styled.div`
border: 1px solid black;
border-radius: 10px;
background: gray;
font-size: 0.9rem;
display: inline-block;
max-width: 300px;
text-align: left;
padding: 15px;
`

const Strong = styled.p`
font-size: 1rem;
font-weight: 700;
margin-bottom: 0.5rem;
`
export default Footer;
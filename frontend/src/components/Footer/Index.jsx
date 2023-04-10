import styled from 'styled-components'
import blockChainImg from "./blockchain.png"

const Footer = () => {

    return (
        <Div>
            <InnerDiv>
            <div className='teaminfo'>
                <p id='teamname'>C207</p>
                <table>
                    <tbody>
                        <tr>
                            <td>문희주 github.com/Monacaron</td>
                            <td>이수연 github.com/Sooyeonlee127</td>
                        </tr>
                        <tr>
                            <td>이은혁 github.com/Itmakesmesoft</td>
                            <td>임세은 github.com/Seeun-lim</td>
                        </tr>
                        <tr>
                            <td>정혜수 github.com/Congmaru</td>
                            <td>한선영 github.com/Sy312</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Box>
                    <Strong>BLOCKCHAIN TECHNOLOGY</Strong>
                    <p style={{width: "221px", fontSize: "0.75rem"}}>저희 서비스는 블록체인 기술을 기반으로 한 Go-Ethereum을 이용하여 투명하고 안전하게 거래됩니다</p>
                    <img src={blockChainImg} alt="" style={{width: "60px", position: "absolute", right: "10px", bottom: "15px"}}/>
                </Box>
            </div>
            </InnerDiv>
        </Div>
    )
}

const Div = styled.div`
width: 100%;
height: 190px;
display: flex;
padding: 20px;
background: rgb(238, 238, 238);
flex-direction: row;
justify-content: center;
align-items: flex-start;
`
const InnerDiv = styled.div`
max-width: 900px;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
color: #8c8a8a;
& .teaminfo {
    font-size: 0.75rem;
    text-align: left;
}
& #teamname {
    font-size: 1.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #aaaaaa;
}
& .teaminfo > table > tbody > tr > td {
    padding-right: 10px;
}
`
const Box = styled.div`
color: #4a4a4a;
border: 1px solid #e7e7e7;
border-radius: 10px;
background: white;
display: inline-block;
width: 320px;
text-align: left;
padding: 15px;
position: relative;
margin-top: .5rem;
`

const Strong = styled.p`
font-size: 0.85rem;
font-weight: 700;
margin-bottom: 0.3rem;
`
export default Footer;
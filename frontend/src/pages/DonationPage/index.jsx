import styled from "styled-components"
import tw from "twin.macro"

const DonationPage = () => {
    const ratio = 50;
    // const ratio = parseInt(모금액/목표금액*100) => 반환값 0~100사이 정수

    return (
        <div>
            <Main>
                <MainImage />
                <Aside>
                    <TabGroup>
                        <Tab>기부하기</Tab>
                        <Tab>봉사하기</Tab>
                    </TabGroup>
                    <div>
                        <span>D-day</span>
                        <p>Title</p>
                        <p>content</p>
                        <div>
                            <p>{ratio}%</p>
                            기부 목표금액<br/>
                            <progress id="progress" value={ratio} min="0" max="100" />
                            현재 모금액
                        </div>
                        <div>
                            <p>10000 원</p>
                            <CoinButtonGroup>
                                <CoinButton>1,000원</CoinButton>
                                <CoinButton>5,000원</CoinButton>
                                <CoinButton>10,000원</CoinButton>
                                <CoinButton>50,000원</CoinButton>
                            </CoinButtonGroup>
                        </div>
                        <GroupButton>
                            <Button>초기화</Button>
                            <Button>기부하기</Button>
                        </GroupButton>
                    </div>
                </Aside>
            </Main>
            <Article>
                <Content></Content>
            </Article>
        </div>
    )
}

const Main = styled.div`
padding-top: 50px;
max-width: 1200px;
${tw`flex flex-row space-x-5 mx-auto`}
`

const MainImage = styled.div`
height: 500px;
${tw`basis-3/5 bg-cover bg-[url('https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/')]`}
`

const Aside = styled.div`
${tw`border basis-2/5`}
`
const TabGroup = styled.div`
border-color: black;
${tw`flex flex-row ring-1 ring-current divide-x`}
`

const Tab = styled.button`
${tw`basis-1/2 px-2 py-3 hover:bg-sky-500 active:bg-sky-600`}
`

const CoinButtonGroup = styled.div`
${tw`grid grid-cols-4 gap-1 `}
`

const CoinButton = styled.button`
${tw`border px-3 py-1 hover:bg-sky-500 active:bg-sky-600`}
`

const GroupButton = styled.div`
${tw`flex space-x-3`}
`

const Button = styled.button`
${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
`

const Article = styled.div`
margin: 20px 0;
border-top: 1px solid black;
${tw``}
`

const Content = styled.div`
${tw`container mx-auto`}
`

export default DonationPage
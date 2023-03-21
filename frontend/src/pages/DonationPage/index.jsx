import styled from "styled-components"
import tw from "twin.macro"


const DonationPage = () => {
    return (
        <div>
            <h1>donation page</h1>
            <main className="container mx-auto px-4">
                <MainImage></MainImage>
                <div>
                    <div></div>
                </div>
            </main>
            <div></div>
        </div>
    )
}

const MainImage = styled.div`
${tw`h-96 w-64 bg-cover bg-[url('https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/')]`}
`



export default DonationPage
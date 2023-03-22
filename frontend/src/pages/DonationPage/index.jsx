import styled from 'styled-components'
import tw from 'twin.macro'


const cardList = [
    {
        title: "Apple Watch",
        image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
        description: "",
        alt: "",
        path: ""
    }, 
    {
        title: "Apple Watch",
        image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
        description: "",
        alt: "",
        path: ""
    }, 
    {
        title: "Apple Watch",
        image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
        description: "",
        alt: "",
        path: ""
    }, 
]

const DonationPage = () => {
    return (
        <WrapPage>
            <p>프로젝트 목록 관련 설명</p>
            <WrapCard>
                {cardList.map((element, index)=>{
                    return (
                    <Card 
                    key={index}
                    >
                        <CardImage src={element.image} alt={element.alt} />
                        <CardContent>
                            <CardTitle>{element.title}</CardTitle>
                            <Stars>
                                <Star aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></Star>
                                <Star aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></Star>
                                <Star aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></Star>
                                <Star aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></Star>
                                <Star aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></Star>
                                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                            </Stars>
                            <WrapBtn>
                                <Button>자세히</Button>
                            </WrapBtn>
                        </CardContent>
                    </Card>
                    )
                })}
            </WrapCard>
        </WrapPage>
    )
}
const WrapPage = styled.div`
width: 100%;
`
const WrapCard = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const Card = styled.div`
${tw`w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 mx-2`}
`
const CardImage = styled.img`
${tw``}
`
const CardContent = styled.div`
${tw`px-5 pb-5`}
`
const CardTitle = styled.p`
${tw`text-xl font-semibold tracking-tight text-gray-900 dark:text-white`}
`
const Stars = styled.div`
${tw`flex items-center mt-2.5 mb-5`}
`
const Star = styled.svg`
${tw`w-5 h-5 text-yellow-300`}
`
const WrapBtn = styled.div`
${tw`flex items-center justify-between`}
`
const Button = styled.button`
${tw`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
`
export default DonationPage
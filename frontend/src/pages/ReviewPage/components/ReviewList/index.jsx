// 리뷰 리스트
import React from 'react';
import styled from "styled-components"
import Example from '../ReviewDetailModal';

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      
  ]
  
  export default function ReviewList() {
    return <>
    <Example/>
        <Wrapper>
        <SubWrapper>
          <TitleText>
            <h2>Gallery</h2>
          </TitleText>
          <PictureWrapper>
            {products.map((product) => (
                <div key={product.id}>
                    <div>
                        <img src={product.imageSrc} alt={product.imageAlt} />
                        onC
                    </div>
                </div>

            ))}
          </PictureWrapper>
          </SubWrapper>
        </Wrapper>
        </>
  }


const Wrapper = styled.div`
${tw`bg-white`}`

const SubWrapper = styled.div`
${tw`mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}`

const PictureWrapper = styled.div`
${tw`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`}`

const TitleText = styled.div`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const ImageFile = styled.img`
${tw`h-full w-full object-cover object-center lg:h-full lg:w-full`}`

const Pro = styled.div`
group relative`

const ProSub = styled.div`
min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80`



{/* <div key={product.id} className="group relative">
<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
<img
src={product.imageSrc}
alt={product.imageAlt}
/>
</div>
</div> */}
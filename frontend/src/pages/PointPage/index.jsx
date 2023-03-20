import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const product = {
  href: '#',
  points: [
    { name: '초기화', inStock: true },
    { name: '+50,000원', inStock: true },
    { name: '+10,000원', inStock: true },
    { name: '+5,000원', inStock: true },
    { name: '+1,000원', inStock: true },
  ],
  }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const PointPage = () => {
  const [selectedPoint, setSelectedPoint] = useState()
  const currentPoint = useState(0);

return  <div className="bg-white">
<div className="pt-6">
  <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">블록체인 사진</h1>
    </div>
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <form className="mt-10">
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">금액</h3>
            <h3 className="text-sm font-medium text-gray-900">{currentPoint} 원</h3>
          </div>
          <RadioGroup value={selectedPoint} onChange={setSelectedPoint} className="mt-4">
            <div className="grid grid-cols-5 gap-4 sm:grid-cols-5 lg:grid-cols-5">
              {product.points.map((point) => (
                <RadioGroup.Option
                  key={point.name}
                  value={point}
                  disabled={!point.inStock}
                  className={({ active }) =>
                    classNames(
                      point.inStock
                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                      active ? 'ring-2 ring-indigo-500' : '',
                      'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as="span">{point.name}</RadioGroup.Label>
                      {point.inStock ? (
                        <span
                          className={classNames(
                            active ? 'border' : 'border-2',
                            checked ? 'border-indigo-500' : 'border-transparent',
                            'pointer-events-none absolute -inset-px rounded-md'
                          )}
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                          >
                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">최종 결제 금액</h3>
          </div>
          <h2>카카오페이 API</h2>
        </div>
        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          결제하기
        </button>
      </form>
    </div>
  </div>
</div>
</div>
};

export default PointPage;
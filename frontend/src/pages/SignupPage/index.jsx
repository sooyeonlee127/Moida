const SignupPage = () => {
    return (
            <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
                <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                <defs>
                    <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9089FC" />
                    <stop offset="1" stop-color="#FF80B5" />
                    </linearGradient>
                </defs>
                </svg>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlfor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                    <div className="mt-2.5">
                    <input type="email" name="email" id="email" autocomplete="email" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlfor="nickname" className="block text-sm font-semibold leading-6 text-gray-900">Nickname</label>
                    <div className="mt-2.5">
                    <input type="text" name="nickname" id="nickname" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlfor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
                    <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlfor="country" className="sr-only">Country</label>
                        <svg className="pointer-events-none absolute top-0 right-3 h-full w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" className="block w-full rounded-md border-0 py-2 px-3.5 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlfor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                    <div className="mt-2.5">
                    <textarea name="message" id="message" rows="4" className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>
                <div className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                    <button type="button" className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                        <span className="sr-only">Agree to policies</span>
                        <span aria-hidden="true" className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                    </button>
                    </div>
                    <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
                    By selecting this, you agree to our
                    <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
                    </label>
                </div>
                </div>
                <div className="mt-10">
                <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's talk</button>
                </div>
                <label htmlFor="phone" className="">phone</label>
                <div className="flex flex-row space-x-4">
                    <select id="country" name="country" className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>010</option>
                    </select><input type="text" name="phone" className="rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5 "/>
                    <input type="text" name="phone" className="rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5 "/>
                </div>
                <label htmlFor="password1" className="">password</label>
                <input 
                type="password" 
                name="password1" 
                id="password1" 
                required
                className="rounded-md ring-1 ring-inset ring-gray-300 relative block w-full rounded-t-md border-0 py-1.5 "
                />
                <label htmlFor="password2" className="">check password</label>
                <input 
                type="password" 
                name="password2" 
                id="password2" 
                required
                className="rounded-md ring-1 ring-inset ring-gray-300 relative block w-full rounded-t-md border-0 py-1.5 "
                />
  </form>
</div>
    )
}

export default SignupPage;
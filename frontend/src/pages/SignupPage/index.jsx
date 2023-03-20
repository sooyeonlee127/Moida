const SignupPage = () => {
    return (
        <div className="isolate bg-white py-28 px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">회원가입</h2>
            </div>
            <form action="#" method="POST" className="mx-auto mt-8 max-w-xl sm:mt-8">
                <div className="grid grid-cols-1 gap-y-2 gap-x-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlfor="email" className="block text-sm leading-6 text-gray-900">Email</label>
                        <div className="mt-2.5 space-x-4 flex flex-row">
                            <input type="email" name="email" id="email" autocomplete="email" required className="grow rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5"/>
                            <button className="grow-0">중복확인</button>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlfor="nickname" className="block text-sm leading-6 text-gray-900">Nickname</label>
                        <div className="mt-2.5 space-x-4 flex flex-row">
                            <input type="email" name="email" id="email" autocomplete="email" required className="grow rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5"/>
                            <button className="grow-0">중복확인</button>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlfor="phone-number" className="block text-sm leading-6 text-gray-900">Phone number</label>
                        <div className="space-x-4 flex-row">
                            <select id="phone" name="phone" required className="grow h-full rounded-md ring-1 ring-inset ring-gray-300 border-0 py-1.5 pl-4 pr-9">
                                <option>010</option>
                            </select>
                            -
                            <input type="text" name="phone" required className="grow rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5 "/> -
                            <input type="text" name="phone" required className="grow rounded-md ring-1 ring-inset ring-gray-300 relative rounded-t-md border-0 py-1.5 "/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                    <label htmlFor="password1" className="block text-sm leading-6 text-gray-900">Password</label>
                    <input type="password" name="password1" id="password1" required className="rounded-md ring-1 ring-inset ring-gray-300 relative block w-full rounded-t-md border-0 py-1.5 "/>
                    </div>
                    <div className="sm:col-span-2">
                    <label htmlFor="password2" className="block text-sm leading-6 text-gray-900">Check password</label>
                    <input type="password" name="password2" id="password2" required className="rounded-md ring-1 ring-inset ring-gray-300 relative block w-full rounded-t-md border-0 py-1.5 "/>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                        <button type="button" className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                            <span className="sr-only">Agree to policies</span>
                            <span aria-hidden="true" className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                        </button>
                        </div>
                        <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
                        이용 약관에 동의하시겠습니까?
                        <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage;
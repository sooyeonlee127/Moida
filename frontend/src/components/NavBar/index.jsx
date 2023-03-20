const navigation = [
    { name: 'HOME', href: '#', current: true },
    { name: '기부하기', href: '#', current: false },
    { name: '인증하기', href: '#', current: false },
    { name: '가챠샵', href: '#', current: false },
    { name: '티켓 5', href: '#', current: false },
    { name: '15000P', href: '#', current: false },
    { name: 'SIGNUP/LOGIN', href: '#', current: false },
  ]

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }
  

const NavBar = () => {
    return  <> 
        <div className=" bg-yellow-200 fixed top-0 left-0 right-0 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center px-7">
                <p className="text-black">우리로고</p>
              </div>
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'text-red-500' : 'text-gray-900 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </>

};

export default NavBar;
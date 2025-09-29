import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex w-full py-4 px-8 text-xl font-bold justify-between bg-green-400 sm:px-20 sm:text-2xl'>
            <div className="title"><span className='text-blue-600'>P</span>assly</div>
            <div className="github-login border rounded-4xl px-4 flex py-1 items-center gap-1">
                <img src="icons/github.svg" alt="git-logo" className='text-[10px]'/>
                Github
                </div>
        </nav>
    )
}

export default Navbar

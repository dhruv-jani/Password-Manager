import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-900 text-white'>
            <div className="myconatainer flex py-4 justify-around items-center px-4">

            <div className="logo">
                <h1 className='font-bold text-lg'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
            </div>
            <ul className='flex gap-5'>
                <li className='hover:font-bold hover:text-green-500 cursor-pointer'>Home</li>
                <li className='hover:font-bold hover:text-green-500 cursor-pointer'>About</li>
                <li className='hover:font-bold hover:text-green-500 cursor-pointer'>Contact</li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar

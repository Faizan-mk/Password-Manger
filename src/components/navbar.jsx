import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-800  text-white  '> 
    <div className="container flex justify-between items-center h-14 px-4 w-2/3 py-5 mx-auto">
        
    <div className="logo font-bold text-2xl text-white">
        
        <span className='text-green-500'>&lt;</span>
        Pss
        <span className='text-green-500'>Op/&gt;</span>
        
        </div>
      {/* <ul className='flex gap-4 p-4'>
        <li><a className='hover:font-bold' href="/">Home</a></li>
        <li><a className='hover:font-bold' href="#">About</a></li>
        <li><a className='hover:font-bold' href="#">Contact</a></li>
      </ul> */}
      <button className='text-white bg-green-700 rounded-full justify-between items-center flex ring-white ring-1'>
        <img className='w-[25px] invert p-1' src="icons/github.png" alt="github logo" />
        <span className='font-bold px-2'>GitHub</span>
      </button>
    </div>
    </nav>
  )
}

export default navbar

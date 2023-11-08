import React from 'react'
import LoginButton from './LoginButton'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='bg-[#292929] border-b-2 border-[#4ed4ac] flex flex-row justify-between'>
        <div className='ml-2 lg:ml-4'>
            <Link href='/'>
            <h1 className='lg:text-4xl text-xl font-semibold text-white mt-2'>Access Timetables</h1>
            </Link>
            <p className='text-[#ADB7BE]'>by nasko.</p>
        </div>
        <div className='lg:px-16 px-8 mb-4 lg:mb-0 mt-4'>
            <LoginButton />
        </div>
    </div>
  )
}

export default Navbar
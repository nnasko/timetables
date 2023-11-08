import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className='flex flex-row justify-between lg:p-8 p-4 bg-[#292929] border-t-2 border-[#181818]'>
            <div>
                <h1 className='lg:text-xl text-lg'>Access Timetables.</h1>
                <p className='text-[#ADB7BE] font-thin text-sm'>2023</p>
            </div>
            <p className='text-sm mt-4 text-[#ADB7BE] font-thin'>All Rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
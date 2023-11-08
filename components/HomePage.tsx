import React from 'react'

const HomePage = () => {
  return (
    <div className='bg-[#292929] flex'>
        <div className='min-h-screen lg:w-1/2 h-full z-2 items-center justify-center'>
            <h1 className='text-4xl font-semibold text-center mt-64 bg-gradient-to-r bg-clip-text from-blue-400 to-green-600 text-transparent'>Welcome!</h1>
            <p className='text-center font-light text-lg p-4'>
            This is a basic timetabling application that allows users to login and book out rooms within the college.
            </p>
        </div>
            <div className='lg:w-1/2 bg-[url("/homepage.jpg")] bg-cover bg-center h-screen mt-4 mb-2 rounded blur z-1'>
        </div>
    </div>
  )
}

export default HomePage
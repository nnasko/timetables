import ActivityForm from '@/components/ActivityForm'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-cover h-screen flex flex-wrap-reverse bg-[#181818]'>
        <div className='p-16'>
            <h1 className='text-center font-semibold p-2 text-2xl'>Add an activity</h1>
        <ActivityForm />
        </div>
    </div>
  )
}

export default Dashboard
// components/ActivityForm.js
"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const ActivityForm = () => {
  const [activityName, setActivityName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const { data: session } = useSession();

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Your form submission logic goes here
    console.log({
      activityName,
      startTime,
      endTime,
      description,
      userName: session?.user?.name || 'Unknown User',
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='bg-[#292929] shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          Title
        </label>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          Start
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          End
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          User
        </label>
        <input
          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type="text"
          value={session?.user?.name || 'Unknown User'}
          disabled
        />
      </div>

      <div className='flex items-center justify-between'>
        <button
          type="submit"
          className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;

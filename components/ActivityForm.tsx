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
    <form onSubmit={handleFormSubmit} className='bg-[#292929] shadow-md  border-4 border-violet-400 rounded px-8 pt-6 pb-6'>
      <label className=''>
        Activity Name
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className='block text-gray-700 rounded text-sm font-bold mb-4'
        />
      </label>

      <label>
        Activity Start
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className='block text-gray-700 rounded text-sm font-bold mb-4'
        />
      </label>

      <label>
        Activity End
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className='block text-gray-700 rounded text-sm font-bold mb-4'
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='block text-gray-700 rounded text-sm'
        />
      </label>
      <br />

      <label className='mr-2 mb-4'>
        User:
        <input className='p-1 inline-block'
        type="text" value={session?.user?.name || 'Unknown User'} disabled />
      </label>
      <br />

      <button type="submit" className='bg-green-400 hover:bg-green-600 text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
    </form>
  );
};

export default ActivityForm;

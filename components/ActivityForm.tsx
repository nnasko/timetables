// components/ActivityForm.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';


interface ActivityFormProps {
  onAddActivity: (newActivity: Activity) => void;
}

interface Activity {
  id: number;
  title: string;
  date: Date;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [date, setDate] = useState<string>(''); 
  const [description, setDescription] = useState<string>('');

  const { data: session } = useSession();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Parse the date string to a Date object
    const parsedDate = new Date(date);
  
    // Check if the parsedDate is a valid Date object
    if (isNaN(parsedDate.getTime())) {
      // Handle the case where the date is not valid
      console.error('Invalid date');
      return;
    }
  
    // Create the newActivity object
    const newActivity: Activity = {
      id: Date.now(),
      title: activityName,
      date: parsedDate, // Use the parsedDate
    };
  
    // Call the onAddActivity function
    onAddActivity(newActivity);
  
    // Reset form fields
    setActivityName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setDate('');
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='bg-[#181818] shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          Title
        </label>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className='appearance-none border rounded w-full py-2 px-3 text-[#ADB7BE] leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-[#ADB7BE] text-sm font-bold mb-2'>
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          className='appearance-none border rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline'
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

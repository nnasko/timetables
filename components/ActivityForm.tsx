// components/ActivityForm.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ActivityFormProps {
  onAddActivity: (newActivity: Activity) => void;
}

interface Activity {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  userId: number;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [date, setDate] = useState<string>(''); 
  const [description, setDescription] = useState<string>('');

  const getUserId = async (username: string) => {
    try {
      console.log('Searching for user with username:', username);
      
      const user = await prisma.user.findFirst({
        where: {
          name: username,
        },
        select: {
          id: true,
        },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return user.id;
    } catch (error) {
      console.error('Error obtaining userId:', error);
      throw new Error('Error obtaining userId');
    }
  };
  
  const { data: session } = useSession();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date');
      return;
    }

    if (!session?.user?.name) {
      console.error('User not authenticated');
      return;
    }

    try {
      const userId = await getUserId(session.user.name);

      const newActivity: Activity = {
        title: activityName,
        date: parsedDate,
        startTime,
        endTime,
        description,
        userId: userId, // Assign the obtained userId
      };

      const response = await fetch('/api/submit-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });

      if (response.ok) {
        // Handle success
        console.log('Activity submitted successfully');
        setActivityName('');
        setStartTime('');
        setEndTime('');
        setDescription('');
        setDate('');
      } else {
        // Handle error
        console.error('Error submitting activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
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

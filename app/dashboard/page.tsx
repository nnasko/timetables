// components/Dashboard.tsx
"use client"
import React, { useState, useEffect } from 'react';
import ActivityForm from '../../components/ActivityForm';
import UpcomingActivities from '../../components/UpcomingActivities';
import { Activity } from '../type';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's login status


  const handleAddActivity = (newActivity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (!session) {
        router.push('/login'); // Redirect to '/' if a session doesn't exist
      } else {
        setIsLoggedIn(true); // Set the state to indicate the user is logged in
      }
    };

    checkSession();
  }, [router]);

  if (!isLoggedIn) {
    return (
      <div className='min-h-screen bg-cover bg-[#181818] flex items-center justify-center'>
        <div className='rounded bg-violet-400 p-4 text-white'>
          <p className='font-semilight text-md'>You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-cover bg-[#181818] flex'>
      <div className='p-16 w-1/3'>
        <h1 className='text-center font-semibold p-2 text-2xl'>Add an activity</h1>
        <ActivityForm onAddActivity={handleAddActivity} />
      </div>
      <div className='w-2/3'>
        <UpcomingActivities activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;

// components/Dashboard.tsx
'use client'
import React, { useState } from 'react';
import ActivityForm from '../../components/ActivityForm';
import UpcomingActivities from '../../components/UpcomingActivities';
import { Activity } from '../type';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleAddActivity = (newActivity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

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

import React, { useState, useEffect } from 'react';

// Define a type for your activity
interface Activity {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  id: number; // Change `any` to `number` assuming userId is of type `number` in the database
}

interface UpcomingActivitiesProps {
  activities: Activity[];
}

const UpcomingActivities: React.FC<UpcomingActivitiesProps> = ({ activities }) => {
  const [timeframe, setTimeframe] = useState('today'); // Default timeframe


  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch activities from your data source (e.g., API)
    // Update the 'filteredActivities' state with the fetched data
    // For now, I'm using the mockActivities as an example
    setFilteredActivities(filteredActivities);
  }, [filteredActivities]); // Run this effect only once on component mount

  const filterActivities = (timeframe: string) => {
    const currentDate = new Date();
  
    switch (timeframe) {
      case 'today':
        setFilteredActivities(
          activities.filter((activity) =>
            activity.date instanceof Date && activity.date.toDateString() === currentDate.toDateString()
          )
        );
        break;
      case 'thisWeek':
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - currentDate.getDay())); // Calculate end of the week
        setFilteredActivities(
          activities.filter(
            (activity) =>
              activity.date instanceof Date &&
              activity.date >= currentDate &&
              activity.date <= endOfWeek
          )
        );
        break;
      // Add more cases for different timeframes as needed
      default:
        setFilteredActivities(activities);
        break;
    }
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    filterActivities(newTimeframe);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Activities</h2>

      {/* Timeframe Selector */}
      <div className="mb-4">
        <label className="mr-2">Filter by Timeframe:</label>
        <select
          value={timeframe}
          onChange={(e) => handleTimeframeChange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          {/* Add more options for different timeframes */}
        </select>
      </div>

      {/* Display Activities Table */}
      {filteredActivities.length > 0 ? (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="border p-2">{activity.title}</td>
                <td className="border p-2">{activity.date.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No upcoming activities in the selected timeframe.</p>
      )}
    </div>
  );
};

export default UpcomingActivities;

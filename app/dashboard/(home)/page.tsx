'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoAddOutline, IoPeopleOutline } from 'react-icons/io5';
import StatsGrid from './components/StatsGrid';
import RecentTasksTable from './components/RecentTasksTable';
import ActivityFeed from './components/ActivityFeed';
import SprintProgress from './components/SprintProgress';

const HomePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('there');

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) setUsername(JSON.parse(stored).username || 'there');
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className='flex flex-col gap-6 p-6 min-h-full'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>{greeting}, {username} 👋</h1>
          <p className='mt-0.5 text-sm text-gray-500'>Here's what's happening with your projects today.</p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => router.push('/dashboard/team')}
            className='flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm'
          >
            <IoPeopleOutline size={15} /> Manage Team
          </button>
          <button
            onClick={() => router.push('/dashboard/tasks')}
            className='flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm'
          >
            <IoAddOutline size={15} /> New Task
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <RecentTasksTable />
        <ActivityFeed />
      </div>

      <SprintProgress />
    </div>
  );
};

export default HomePage;

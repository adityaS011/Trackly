'use client';
import React from 'react';
import ProfileCard from './components/ProfileCard';
import PlanCards from './components/PlanCards';
import { IoShieldCheckmarkOutline, IoStatsChartOutline } from 'react-icons/io5';

const stats = [
  { label: 'Tasks Created', value: '42' },
  { label: 'Tasks Completed', value: '28' },
  { label: 'Comments', value: '15' },
  { label: 'Days Active', value: '8' },
];

const ProfilePage = () => (
  <div className='flex flex-col gap-6 p-6'>
    <div>
      <h1 className='text-2xl font-bold text-gray-900'>Profile</h1>
      <p className='mt-0.5 text-sm text-gray-500'>Manage your account and subscription.</p>
    </div>

    <ProfileCard />

    {/* Usage stats */}
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-2 mb-4'>
        <IoStatsChartOutline size={15} className='text-gray-400' />
        <h2 className='text-sm font-semibold text-gray-800'>Usage This Month</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((s) => (
          <div key={s.label} className='flex flex-col items-center rounded-lg bg-gray-50 border border-gray-100 py-4'>
            <p className='text-2xl font-bold text-gray-900'>{s.value}</p>
            <p className='text-xs text-gray-400 mt-1 text-center'>{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Security row */}
    <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
      <div className='flex items-center gap-2 mb-4'>
        <IoShieldCheckmarkOutline size={15} className='text-gray-400' />
        <h2 className='text-sm font-semibold text-gray-800'>Security</h2>
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700'>Password</p>
          <p className='text-xs text-gray-400 mt-0.5'>Last changed 30 days ago</p>
        </div>
        <button className='px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors'>
          Change password
        </button>
      </div>
    </div>

    <PlanCards />
  </div>
);

export default ProfilePage;

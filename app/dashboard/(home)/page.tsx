'use client';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [renderTask, setRenderTask] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (renderTask === false) return;
    router.push('/dashboard/tasks');
  }, [renderTask]);

  return (
    <main className='w-full h-full min-h-screen bg-white p-6'>
      <header className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-blue-600'>Task Manager</h1>
          <p className='text-sm text-gray-500'>
            Stay organized and boost your productivity with ease.
          </p>
        </div>
        <button
          className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
          onClick={() => router.push('/dashboard/team')}
        >
          Manage Teams
        </button>
      </header>

      <section className='md:flex flex-row grid  grid-cols-2  gap-4 mb-8'>
        {[
          { label: 'Total Tasks', value: 42, color: 'text-blue-600' },
          { label: 'Completed Tasks', value: 28, color: 'text-green-600' },
          { label: 'Pending Tasks', value: 10, color: 'text-orange-600' },
          { label: 'Overdue Tasks', value: 4, color: 'text-red-600' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className='bg-white p-2 shadow border w-fit min-w-48 rounded-lg flex flex-row gap-2 items-center justify-center'
          >
            <h3 className='text-sm font-medium text-gray-500'>{label}:</h3>
            <p className={`text-lg font-semibold ${color}`}>{value}</p>
          </div>
        ))}
      </section>

      <section className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Open Tasks</h2>
          <button
            className='text-blue-600 hover:underline'
            onClick={() => router.push('/dashboard/tasks')}
          >
            View All
          </button>
        </div>
        <div className='overflow-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-blue-50 text-gray-700 uppercase text-sm'>
                {[
                  'ID',
                  'Name',
                  'Status',
                  'Created At',
                  'Updated At',
                  'Priority',
                ].map((header) => (
                  <th key={header} className='py-2 px-4 border'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className='text-sm text-gray-700 hover:bg-gray-100'
                >
                  <td className='py-2 px-4 border'>TSK{index + 101}</td>
                  <td className='py-2 px-4 border'>Task {index + 1}</td>
                  <td className='py-2 px-4 border'>
                    {index % 2 === 0 ? 'Pending' : 'Completed'}
                  </td>
                  <td className='py-2 px-4 border'>2024-11-14</td>
                  <td className='py-2 px-4 border'>2024-11-15</td>
                  <td className='py-2 px-4 border'>
                    {index % 2 === 0 ? 'High' : 'Medium'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

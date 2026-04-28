'use client';
import React from 'react';
import { IoArrowForwardOutline, IoEllipsisHorizontal } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { recentTasks, statusConfig, priorityConfig } from '../homeData';

const RecentTasksTable = () => {
  const router = useRouter();
  return (
    <div className='xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
        <div>
          <h2 className='text-sm font-semibold text-gray-800'>Recent Tasks</h2>
          <p className='text-xs text-gray-400 mt-0.5'>Your latest active items</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/tasks')}
          className='flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors'
        >
          View all <IoArrowForwardOutline size={12} />
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='bg-gray-50 text-xs uppercase tracking-wide text-gray-400'>
              {['Task', 'Assignee', 'Status', 'Priority', 'Due', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left font-medium'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {recentTasks.map((task) => (
              <tr key={task.id} className='group hover:bg-gray-50 transition-colors'>
                <td className='px-5 py-3'>
                  <p className='font-medium text-gray-800 group-hover:text-blue-600 transition-colors'>{task.name}</p>
                  <p className='text-xs text-gray-400'>{task.id}</p>
                </td>
                <td className='px-5 py-3'>
                  <div className='flex items-center gap-2'>
                    <div className='h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0'>
                      {task.assignee[0]}
                    </div>
                    <span className='text-gray-600'>{task.assignee}</span>
                  </div>
                </td>
                <td className='px-5 py-3'>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[task.status]?.cls ?? 'bg-gray-100 text-gray-600'}`}>
                    {task.status}
                  </span>
                </td>
                <td className='px-5 py-3'>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityConfig[task.priority]}`}>
                    {task.priority}
                  </span>
                </td>
                <td className='px-5 py-3 text-xs text-gray-500'>{task.date}</td>
                <td className='px-5 py-3'>
                  <button className='hidden group-hover:flex items-center justify-center h-6 w-6 rounded-md hover:bg-gray-200 text-gray-400'>
                    <IoEllipsisHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTasksTable;

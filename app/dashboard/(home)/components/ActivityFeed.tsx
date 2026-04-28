'use client';
import React from 'react';
import { activity } from '../homeData';

const ActivityFeed = () => (
  <div className='rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden'>
    <div className='px-5 py-4 border-b border-gray-100'>
      <h2 className='text-sm font-semibold text-gray-800'>Recent Activity</h2>
      <p className='text-xs text-gray-400 mt-0.5'>Team updates in real time</p>
    </div>
    <ul className='divide-y divide-gray-50'>
      {activity.map((item, i) => (
        <li key={i} className='flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors'>
          <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.color} text-white text-xs font-semibold`}>
            {item.user[0]}
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm text-gray-700 leading-snug'>
              <span className='font-medium text-gray-900'>{item.user}</span>
              {' '}{item.action}{' '}
              <span className='font-medium text-blue-600'>{item.task}</span>
            </p>
            <p className='text-xs text-gray-400 mt-0.5'>{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className='px-5 py-3 border-t border-gray-100 text-center'>
      <span className='text-xs text-blue-600 cursor-pointer hover:underline'>View full activity</span>
    </div>
  </div>
);

export default ActivityFeed;

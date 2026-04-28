'use client';
import React from 'react';

const SprintProgress = () => (
  <div className='rounded-xl border border-gray-200 bg-white shadow-sm p-5'>
    <div className='flex items-center justify-between mb-3'>
      <div>
        <h2 className='text-sm font-semibold text-gray-800'>Sprint Progress</h2>
        <p className='text-xs text-gray-400 mt-0.5'>Apr 21 – Apr 28 · 28 of 42 tasks done</p>
      </div>
      <span className='text-2xl font-bold text-gray-900'>67%</span>
    </div>
    <div className='h-3 rounded-full bg-gray-100 overflow-hidden'>
      <div className='h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all' style={{ width: '67%' }} />
    </div>
    <div className='mt-3 flex items-center gap-5 text-xs text-gray-500'>
      <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-emerald-400' /> 28 Completed</span>
      <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-blue-400' /> 10 In Progress</span>
      <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-red-400' /> 4 Overdue</span>
    </div>
  </div>
);

export default SprintProgress;

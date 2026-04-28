'use client';
import React, { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

const DangerZone = () => {
  const [confirm, setConfirm] = useState('');

  return (
    <div className='rounded-xl border border-red-200 bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-2 mb-4'>
        <IoWarningOutline size={16} className='text-red-500' />
        <h2 className='text-sm font-semibold text-red-600'>Danger Zone</h2>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3'>
          <div>
            <p className='text-sm font-medium text-gray-800'>Reset all tasks</p>
            <p className='text-xs text-gray-400 mt-0.5'>Permanently delete every task in the workspace.</p>
          </div>
          <button className='px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors'>
            Reset
          </button>
        </div>
        <div className='rounded-lg border border-red-100 bg-red-50/40 p-4'>
          <p className='text-sm font-medium text-gray-800 mb-1'>Delete account</p>
          <p className='text-xs text-gray-500 mb-3'>This action is irreversible. Type <strong>delete my account</strong> to confirm.</p>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder='delete my account'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 mb-3 transition-all'
          />
          <button
            disabled={confirm !== 'delete my account'}
            className='px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all'
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;

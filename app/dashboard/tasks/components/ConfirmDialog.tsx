'use client';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

const ConfirmDialog = ({ status, onConfirm, onCancel }: { status: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-[60]'>
    <div className='bg-white rounded-2xl shadow-2xl w-80 p-6 flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-50'>
          <IoWarningOutline size={20} className='text-amber-500' />
        </div>
        <div>
          <p className='text-sm font-semibold text-gray-900'>Change status?</p>
          <p className='text-xs text-gray-400 mt-0.5'>Set to <span className='font-medium text-gray-700'>{status}</span></p>
        </div>
      </div>
      <p className='text-sm text-gray-500'>This will update the task status immediately. You can change it again at any time.</p>
      <div className='flex gap-2'>
        <button onClick={onConfirm} className='flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors'>
          Confirm
        </button>
        <button onClick={onCancel} className='flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors'>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;

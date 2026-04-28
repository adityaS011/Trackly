'use client';
import React, { useState } from 'react';

const timezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Kolkata', 'Asia/Tokyo'];

const GeneralSettings = () => {
  const [workspace, setWorkspace] = useState('My Workspace');
  const [timezone, setTimezone] = useState('UTC');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <h2 className='text-sm font-semibold text-gray-800 mb-4'>General</h2>
      <div className='flex flex-col gap-5'>
        <div>
          <label className='block text-xs font-medium text-gray-600 mb-1.5'>Workspace Name</label>
          <input
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all'
          />
          <p className='text-xs text-gray-400 mt-1'>This is the name displayed across your dashboard.</p>
        </div>
        <div>
          <label className='block text-xs font-medium text-gray-600 mb-1.5'>Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all'
          >
            {timezones.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div>
          <label className='block text-xs font-medium text-gray-600 mb-1.5'>Language</label>
          <select className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all'>
            <option>English (US)</option>
            <option>English (UK)</option>
          </select>
        </div>
        <div className='flex justify-end pt-2'>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;

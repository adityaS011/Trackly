'use client';
import React, { useState } from 'react';
import GeneralSettings from './components/GeneralSettings';
import NotificationSettings from './components/NotificationSettings';
import DangerZone from './components/DangerZone';

const tabs = ['General', 'Notifications', 'Danger Zone'] as const;
type Tab = typeof tabs[number];

const SettingsPage = () => {
  const [tab, setTab] = useState<Tab>('General');

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Settings</h1>
        <p className='mt-0.5 text-sm text-gray-500'>Manage your workspace preferences.</p>
      </div>

      {/* Tab bar */}
      <div className='flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 w-fit'>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'General' && <GeneralSettings />}
      {tab === 'Notifications' && <NotificationSettings />}
      {tab === 'Danger Zone' && <DangerZone />}
    </div>
  );
};

export default SettingsPage;

'use client';
import React, { useState } from 'react';

const toggles = [
  { id: 'task_assign', label: 'Task Assigned to You', desc: 'Get notified when someone assigns you a task.' },
  { id: 'task_complete', label: 'Task Completed', desc: 'When a task in your project is marked done.' },
  { id: 'comments', label: 'New Comments', desc: 'When someone comments on your tasks.' },
  { id: 'overdue', label: 'Overdue Reminders', desc: 'Daily digest of tasks past their due date.' },
  { id: 'sprint', label: 'Sprint Updates', desc: 'Start and end of sprint notifications.' },
];

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-gray-200'}`}
  >
    <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-[18px]' : 'translate-x-[3px]'}`} />
  </button>
);

const NotificationSettings = () => {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ task_assign: true, overdue: true, comments: false, task_complete: false, sprint: true });

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <h2 className='text-sm font-semibold text-gray-800 mb-4'>Notifications</h2>
      <div className='flex flex-col divide-y divide-gray-50'>
        {toggles.map((t) => (
          <div key={t.id} className='flex items-center justify-between py-4 first:pt-0 last:pb-0'>
            <div>
              <p className='text-sm font-medium text-gray-800'>{t.label}</p>
              <p className='text-xs text-gray-400 mt-0.5'>{t.desc}</p>
            </div>
            <Toggle on={!!prefs[t.id]} onToggle={() => setPrefs((p) => ({ ...p, [t.id]: !p[t.id] }))} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;

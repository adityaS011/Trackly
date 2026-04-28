'use client';
import React, { useEffect, useState } from 'react';
import { IoMailOutline, IoCalendarOutline, IoPencilOutline } from 'react-icons/io5';

const ProfileCard = () => {
  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('user@trackly.app');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ username: '', email: '' });

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUsername(u.username || 'User');
      setEmail(u.email || 'user@trackly.app');
    }
  }, []);

  const initials = username.slice(0, 2).toUpperCase();

  const handleEdit = () => { setDraft({ username, email }); setEditing(true); };
  const handleSave = () => {
    setUsername(draft.username);
    setEmail(draft.email);
    setEditing(false);
  };

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='flex items-center gap-4 mb-6'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md'>
          {initials}
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-lg font-semibold text-gray-900'>{username}</p>
          <p className='text-sm text-gray-400'>{email}</p>
        </div>
        <button onClick={handleEdit} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors'>
          <IoPencilOutline size={13} /> Edit
        </button>
      </div>

      {editing ? (
        <div className='flex flex-col gap-3'>
          <div>
            <label className='text-xs font-medium text-gray-600 block mb-1'>Display Name</label>
            <input value={draft.username} onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
              className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all' />
          </div>
          <div>
            <label className='text-xs font-medium text-gray-600 block mb-1'>Email</label>
            <input value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all' />
          </div>
          <div className='flex gap-2 pt-1'>
            <button onClick={handleSave} className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors'>Save</button>
            <button onClick={() => setEditing(false)} className='px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors'>Cancel</button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2.5'>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <IoMailOutline size={14} className='text-gray-400' />
            <span>{email}</span>
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <IoCalendarOutline size={14} className='text-gray-400' />
            <span>Member since April 2025</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

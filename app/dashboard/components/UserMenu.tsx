'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
  const router = useRouter();
  const [username, setUsername] = useState('User');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) setUsername(JSON.parse(stored).username || 'User');
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    if (!confirm('Are you sure you want to logout?')) return;
    sessionStorage.setItem('isLoggedIn', 'false');
    router.push('/auth/login');
  };

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors'
      >
        <div className='flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold shrink-0'>
          {initials}
        </div>
        <span className='hidden sm:block text-sm font-medium text-gray-700 max-w-24 truncate'>{username}</span>
        <IoChevronDownOutline size={13} className='text-gray-400 hidden sm:block' />
      </button>
      {open && (
        <div className='absolute right-0 top-10 w-44 rounded-xl border border-gray-100 bg-white shadow-lg z-50 overflow-hidden'>
          <div className='px-4 py-3 border-b border-gray-100'>
            <p className='text-sm font-medium text-gray-800 truncate'>{username}</p>
            <p className='text-xs text-gray-400 mt-0.5'>Free plan</p>
          </div>
          <ul className='py-1'>
            <li className='px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 transition-colors'>Profile</li>
            <li className='px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer rounded-lg mx-1 transition-colors'>Settings</li>
            <li onClick={handleLogout} className='px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-lg mx-1 transition-colors'>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

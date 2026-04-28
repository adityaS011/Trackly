'use client';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { LogoIcon } from '@/app/utils/icons';
import { useSidebar } from './SidebarContext';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';

const HamburgerIcon = () => (
  <span className='flex flex-col gap-[3px]'>
    <span className='block h-0.5 w-[18px] bg-current rounded' />
    <span className='block h-0.5 w-[13px] bg-current rounded' />
    <span className='block h-0.5 w-[18px] bg-current rounded' />
  </span>
);

const Navbar = () => {
  const { toggle } = useSidebar();

  return (
    <header className='flex items-center justify-between border-b border-gray-200 bg-white px-4 py-0 min-h-14 shrink-0 z-20'>
      {/* Left */}
      <div className='flex items-center gap-3'>
        <button
          onClick={toggle}
          className='flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
          title='Toggle sidebar'
        >
          <HamburgerIcon />
        </button>
        <div className='flex items-center gap-1.5'>
          <LogoIcon className='w-6 h-6' />
          <span className='text-base font-semibold text-gray-900 tracking-tight'>Trackly</span>
        </div>
      </div>

      {/* Search */}
      <div className='hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-72 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all'>
        <IoSearchOutline className='text-gray-400 shrink-0' size={15} />
        <input
          type='text'
          placeholder='Search tasks, members…'
          className='flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none'
        />
        <kbd className='hidden sm:inline-flex items-center rounded border border-gray-200 px-1 text-xs text-gray-400 font-mono'>⌘K</kbd>
      </div>

      {/* Right */}
      <div className='flex items-center gap-2'>
        <NotificationsMenu />
        <div className='h-5 w-px bg-gray-200' />
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;

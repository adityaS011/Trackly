'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { GoTasklist } from 'react-icons/go';
import { RiTeamFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.has('/dashboard'));
  const handleClick = (route: string) => {
    router.push(route);
  };
  return (
    <div className='bg-blue-50 border-e w-52 h-full'>
      <div className='px-4 pt-6 flex flex-col gap-2 '>
        <p
          className='flex flex-row gap-2 p-2 items-center tracking-wide rounded-md hover:bg-blue-200 cursor-pointer'
          onClick={() => {
            handleClick('/dashboard');
          }}
        >
          <RxDashboard /> Home
        </p>
        <p
          className='flex flex-row gap-2 p-2 items-center tracking-wide rounded-md hover:bg-blue-200 cursor-pointer'
          onClick={() => {
            handleClick('/dashboard/tasks');
          }}
        >
          <GoTasklist /> Tasks
        </p>
        <p
          className='flex flex-row gap-2 p-2 items-center tracking-wide rounded-md hover:bg-blue-200 cursor-pointer'
          onClick={() => {
            handleClick('/dashboard/team');
          }}
        >
          <RiTeamFill /> Team
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

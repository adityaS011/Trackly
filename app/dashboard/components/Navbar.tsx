'use client';
import { LogoIcon } from '@/app/utils/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiCaretDown, BiTask, BiUser } from 'react-icons/bi';

type UserName = {
  username: string;
  email: string;
  password: string;
};

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('user');
  const [dropdownState, setDropdownState] = useState<boolean>(false);
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user: UserName = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);
  const handleLogout = () => {
    let ans = confirm('Are you sure you want to logout');
    if (!ans) return;
    sessionStorage.setItem('isLoggedIn', 'false');
    router.push('/auth/login');
  };
  return (
    <div className='flex flex-row justify-between border-b w-full py-2 px-6 items-center bg-[#3369f3] min-h-14 '>
      <div className='flex flex-row gap-2 items-center font-medium font-mono uppercase bg-blue-50 px-2 py-1 rounded shadow-md text-lg'>
        <LogoIcon className='w-8  h-6' />

        <p>Trackly</p>
      </div>
      <div
        className='flex flex-row gap-2 items-center bg-blue-50 rounded px-2 py-1 hover:bg-blue-50 cursor-pointer'
        onClick={() => {
          setDropdownState(!dropdownState);
        }}
      >
        <BiUser className='w-5 h-5' />
        <div className='flex flex-row gap-2 items-center'>
          <p>{username}</p>
          <BiCaretDown className='mt-0.5' />
        </div>
        {dropdownState && (
          <div
            onClick={handleLogout}
            className='flex  flex-col text-sm absolute w-fit top-11 items-center rounded-md px-4 py-2 min-w-24  hover:bg-red-600 h-fit bg-red-500 text-white shadow-md right-8'
          >
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

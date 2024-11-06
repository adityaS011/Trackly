'use client';
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
    <div className='flex flex-row justify-between w-full py-2 px-6 items-center bg-slate-200 min-h-14 border-b'>
      <div className='flex flex-row gap-2 items-center font-medium bg-green-300 px-2 py-1 rounded-md shadow-md text-lg'>
        <BiTask className='h-5 w-5 ' />
        <p>Task X</p>
      </div>
      <div
        className='flex flex-row gap-2 items-center bg-green-300 rounded-lg px-2 py-1 hover:bg-green-400 cursor-pointer'
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
            className='flex  flex-col text-sm absolute w-fit top-11 items-center rounded-md px-4 min-w-24  hover:bg-red-700 py-1 h-fit bg-red-600 text-white shadow-md right-8'
          >
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

'use client';

import Image from 'next/image';
import { SkullIcon } from './icons';

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 md:hidden overflow-hidden text-center'>
        <div className='bg-teal-50 shadow-lg rounded-xl p-8 flex flex-col items-center space-y-6 transform transition duration-300 ease-in-out hover:scale-105'>
          <SkullIcon className='w-24 h-24 text-[#2fd09a] ' />
          <div className='font-semibold text-gray-700 text-center'>
            <p className='text-lg italic text-gray-600'>
              This site is not available on mobile devices.
            </p>
            <p className='text-xl uppercase text-[#b12929] font-serif mt-4'>
              {` Get a laptop, don’t be lazy`}
            </p>
          </div>
        </div>
      </div>
      <div className='hidden md:block'>{children}</div>
    </>
  );
}

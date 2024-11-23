import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ResponsiveLayout from '../utils/ResponsiveLayout';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ResponsiveLayout>
      <div className='flex flex-col h-screen w-screen overflow-hidden'>
        <Navbar />
        <div className='flex flex-row h-full w-full '>
          <Suspense>
            <Sidebar />
          </Suspense>
          {children}
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default layout;

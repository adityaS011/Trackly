import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden'>
      <Navbar />
      <div className='flex flex-row h-full w-full '>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layout;

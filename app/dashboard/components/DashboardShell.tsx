'use client';
import React, { Suspense } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider } from './SidebarContext';

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className='flex flex-col h-screen w-screen overflow-hidden bg-gray-50'>
        <Navbar />
        <div className='flex flex-row h-full w-full overflow-hidden'>
          <Suspense>
            <Sidebar />
          </Suspense>
          <main className='flex-1 overflow-auto'>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardShell;

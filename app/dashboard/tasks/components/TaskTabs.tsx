'use client';
import { TabsToShow } from '@/data';
import { TabsType } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TaskTabs = () => {
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const router = useRouter();

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    setActiveTab(TabsToShow[index]);
  };

  useEffect(() => {
    router.replace(`?tab=${activeTab.toLowerCase()}`);
  }, [activeTab, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tabIndex = parseInt(event.key, 10) - 1;
      if (tabIndex >= 0 && tabIndex < TabsToShow.length) {
        handleTabChange(tabIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const tabParam = new URLSearchParams(window.location.search).get(
      'tab'
    ) as TabsType;
    const index = TabsToShow.indexOf(tabParam);
    if (index !== -1) {
      setSelectedTabIndex(index);
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <div className='flex flex-row border-b gap-2 px-2 border-gray-300'>
      {TabsToShow.map((tab, index) => (
        <div
          key={tab}
          className={`tab cursor-pointer hover:bg-green-300 px-4 rounded-t-md py-1 first-letter:uppercase ${
            index === selectedTabIndex
              ? 'border-b-2 border-gray-700 font-semibold bg-green-200'
              : ''
          }`}
          onClick={() => handleTabChange(index)}
        >
          {tab}
        </div>
      ))}
      <div className='ml-auto'>
        <div className='flex flex-row gap-2 pr-4'>
          Current Tab:
          <p className='px-1 text-green-600 font-medium first-letter:uppercase'>
            {activeTab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskTabs;

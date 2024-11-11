'use client';
import { Tasks } from '@/types';
import React, { useEffect, useState } from 'react';
import { CgAtlasian } from 'react-icons/cg';

const page = () => {
  const [teamData, setTeamData] = useState<Tasks[]>();
  useEffect(() => {
    const fetchTasks = async () => {
      setTimeout(async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTeamData(data.tasks);
      }, 2000);
    };
    fetchTasks();
  }, []);
  return (
    <div className='flex flex-col p-6 w-full h-full overflow-y-auto '>
      <p className='text-lg text-center'>Team</p>
      {teamData?.map((item) => {
        return (
          <div className='border  p-2' key={item.id}>
            Name: {item.assignee}
          </div>
        );
      })}
    </div>
  );
};

export default page;

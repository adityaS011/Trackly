'use client';
import { Tasks } from '@/types';
import React, { useEffect, useState } from 'react';
import MemberTasks from './MemberTasks';

const Page = () => {
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
    <div className='flex flex-col p-8 w-full h-full overflow-y-auto bg-gray-50'>
      <h1 className='text-2xl font-semibold text-center mb-6 text-gray-700'>
        Team Tasks Overview
      </h1>

      {teamData ? (
        teamData.map((member) => (
          <div
            className='bg-white shadow-md rounded-lg p-6 mb-4'
            key={member.id}
          >
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                Name: {member.assignee}
              </h2>
            </div>
            <MemberTasks name={member.assignee} teamData={teamData} />
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500 mt-10'>Loading tasks...</p>
      )}
    </div>
  );
};

export default Page;

'use client';
import { Tasks } from '@/types';
import React, { useEffect, useState } from 'react';
import MemberTasks from './MemberTasks';

const Team = () => {
  const [teamData, setTeamData] = useState<Tasks[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setTimeout(async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTeamData(data.tasks);
        let daat = new Set(teamData);
        setLoading(false);
      }, 1500);
    };
    fetchTasks();
  }, []);

  return (
    <div className='flex flex-col p-8 w-full h-full bg-gray-50 '>
      <h1 className='text-3xl font-semibold text-center mb-8 text-gray-800'>
        Team Tasks Overview
      </h1>

      <div className='overflow-auto h-full p-1'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <div className='animate-spin w-10 h-10 border-4 border-t-blue-500 border-blue-300 rounded-full'></div>
          </div>
        ) : teamData && teamData.length === 0 ? (
          <p className='text-center text-gray-500 mt-10'>No tasks available.</p>
        ) : (
          teamData?.map((member) => (
            <div
              className='bg-white shadow-lg rounded-lg p-4 mb-6 '
              key={member.id}
            >
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  {member.assignee}'s Tasks
                </h2>
                <div className='text-sm text-gray-500'>{member.priority}</div>
              </div>
              <MemberTasks name={member.assignee} teamData={teamData} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Team;

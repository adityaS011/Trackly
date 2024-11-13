import { Tasks } from '@/types';
import React, { useEffect, useState } from 'react';

const MemberTasks = ({
  name,
  teamData,
}: {
  name: string;
  teamData: Tasks[];
}) => {
  const [memberTasks, setMemberTasks] = useState<Tasks[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown

  useEffect(() => {
    let data = teamData.filter((item) => item.assignee === name);
  }, [name, teamData]);

  return (
    <div>
      <div className='space-y-3'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='text-sm text-blue-600 focus:outline-none'
        >
          Total Tasks: {memberTasks.length} {isDropdownOpen ? '▲' : '▼'}
        </button>

        {isDropdownOpen && (
          <div className='space-y-3 mt-2'>
            {memberTasks.map((task) => (
              <div key={task.id} className='border rounded-md p-3'>
                <p className='text-sm text-gray-700'>
                  <strong>Task:</strong> {task.name}
                </p>
                <div className='flex flex-row justify-between items-center py-2'>
                  <div className='flex items-center space-x-2'>
                    <strong className='text-sm text-gray-600'>Priority:</strong>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        task.priority === 'High'
                          ? 'bg-red-500'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className='flex items-center space-x-4 mt-2'>
                    <label
                      htmlFor={`status-${task.id}`}
                      className={'text-sm text-gray-600'}
                    >
                      <strong>Status:</strong>
                    </label>
                    <select
                      id={`status-${task.id}`}
                      className='border border-gray-300 rounded p-1 text-sm text-gray-600 focus:outline-none'
                      defaultValue={task.status}
                    >
                      <option value='Pending'>Pending</option>
                      <option value='In Progress'>In Progress</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberTasks;

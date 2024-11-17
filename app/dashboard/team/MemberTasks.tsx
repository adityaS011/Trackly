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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const data = teamData.filter(
      (task) => task.assignee.toLowerCase().trim() === name.toLowerCase().trim()
    );
    setMemberTasks(data);
  }, [name, teamData]);

  const priorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div>
      <div className='space-y-4'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='text-sm text-blue-600 focus:outline-none hover:text-blue-700 transition-all'
        >
          {isDropdownOpen ? 'Hide Tasks' : `Show Tasks (${memberTasks.length})`}
        </button>

        {isDropdownOpen && memberTasks.length > 0 ? (
          <div className='space-y-4 mt-4'>
            {memberTasks.map((task) => (
              <div
                key={task.id}
                className='border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all'
              >
                <div className='flex justify-between items-center mb-3'>
                  <p className='text-lg font-semibold text-gray-700'>
                    {task.name}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-md text-sm ${priorityStyles(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </div>
                </div>
                <div className='text-sm text-gray-600 mb-2'>
                  <strong>Status:</strong> {task.status}
                </div>

                <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-2'>
                    <strong className='text-sm text-gray-600'>Status:</strong>
                    <select
                      className='border border-gray-300 rounded p-1 text-sm text-gray-600 focus:outline-none'
                      defaultValue={task.status}
                    >
                      <option value='Pending'>Pending</option>
                      <option value='In Progress'>In Progress</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </div>

                  <div>
                    <span className='text-xs text-gray-400'>
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : memberTasks.length === 0 ? (
          <p className='text-gray-500 text-sm mt-2'>No tasks assigned yet.</p>
        ) : null}
      </div>
    </div>
  );
};

export default MemberTasks;

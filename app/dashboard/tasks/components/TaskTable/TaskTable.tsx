import { useState, useEffect } from 'react';
import { Tasks } from '@/types';

const TaskTable = ({
  tasksData,
  loading,
  addTask,
  handleEditClick,
  selectedRowIndex,
}: {
  tasksData: Tasks[];
  loading: boolean;
  addTask: () => void;
  selectedRowIndex: number;
  handleEditClick: (id: number) => void;
}) => {
  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center animate-pulse p-4'>
        Loading...
      </div>
    );
  }
  if (!tasksData) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div>Oops! Unable to fetch data</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-auto p-4 w-full h-full '>
      <div className='flex flex-row justify-between px-6 items-center'>
        <h2 className=' font-medium font-serif text-lg '>Open Task List</h2>
        <button
          onClick={addTask}
          className='p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 font-medium'
        >
          + Add new Task
        </button>
      </div>
      <div className='border shadow-md my-4'>
        <div>
          <div className='bg-green-400 flex flex-row font-medium border p-2 pl-4 gap-2'>
            <div className='w-96 '>Name</div>
            <div className='w-36 text-center'>Labels</div>
            <div className='w-52 text-center'>Created At</div>
            <div className='w-52 text-center'>Updated At</div>
            <div className='w-32 text-center'>Priority</div>
          </div>
        </div>

        <div>
          {tasksData.map((task, index) => (
            <div
              key={task.id}
              className={`flex bg-white flex-row hover:bg-slate-100 border p-2 pl-4 gap-2 ${
                selectedRowIndex === index ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleEditClick(task.id - 1)}
            >
              <div className='w-96'>{task.name}</div>
              <div className='text-center w-36'>{task.labels.join(', ')}</div>
              <div className='text-center w-52'>
                {new Date(task.created_at).toLocaleString()}
              </div>
              <div className='text-center w-52'>
                {new Date(task.updated_at).toLocaleString()}
              </div>
              <div className='text-center w-32'>{task.priority}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;

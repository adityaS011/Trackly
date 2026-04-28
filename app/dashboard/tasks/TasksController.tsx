'use client';
import React, { useState } from 'react';
import TaskTabs from './components/TaskTabs';
import TaskTableController from './components/TaskTable/TaskTableController';

const TasksController = () => {
  const [dataCount, setDataCount] = useState<number | null>(null);
  return (
    <div className='flex flex-col h-full rounded-lg shadow-sm mt-4 w-full bg-white py-2 gap-2'>
      <TaskTabs dataCount={dataCount} />
      <TaskTableController setDataCount={setDataCount} />
    </div>
  );
};

export default TasksController;

'use client';
import React, { useState } from 'react';
import TaskTabs from './components/TaskTabs';
import TaskFilters from './components/TaskFilters';
import TaskTableController from './components/TaskTable/TaskTableController';

const TasksController = () => {
  const [dataCount, setDataCount] = useState<number | null>(null);
  return (
    <div className='flex flex-col h-full w-full bg-white py-2 gap-2'>
      <TaskTabs dataCount={dataCount} />
      <TaskFilters />
      <TaskTableController setDataCount={setDataCount} />
    </div>
  );
};

export default TasksController;

import React from 'react';
import TaskTabs from './components/TaskTabs';
import TaskFilters from './components/TaskFilters';
import TaskTableController from './components/TaskTable/TaskTableController';

const TasksController = () => {
  return (
    <div className='flex flex-col h-full w-full bg-slate-100 p-4 '>
      <TaskTabs />
      <TaskFilters />
      <TaskTableController />
    </div>
  );
};

export default TasksController;

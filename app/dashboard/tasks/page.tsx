import { Suspense } from 'react';
import TasksController from './TasksController';

const page = () => {
  return (
    <Suspense>
      <TasksController />
    </Suspense>
  );
};

export default page;

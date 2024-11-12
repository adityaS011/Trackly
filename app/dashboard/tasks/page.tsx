'use client';
import { Suspense, useEffect } from 'react';
import TasksController from './TasksController';
import { useAuth } from '@/customHooks/useAuth';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { getUser } = useAuth();
  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace('/auth/login');
    }
  }, []);

  return (
    <div className=' mx-auto max-w-[1150px]  w-full flex flex-grow'>
      <Suspense>
        <TasksController />
      </Suspense>
    </div>
  );
};

export default page;

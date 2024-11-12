'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard/tasks');
  }, []);
  return <div></div>;
};

export default page;

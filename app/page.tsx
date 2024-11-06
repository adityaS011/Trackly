'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, []);
  return null;
};

export default page;

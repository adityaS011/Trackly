// pages/signup.tsx

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveUser, getUser } from '@/utils/auth';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (getUser()) {
      alert('User already exists. Please login.');
      router.push('/auth/login');
      return;
    }

    saveUser(formData);
    alert('Signup successful. Please login.');
    router.push('/auth/login');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        className='md:w-1/3 w-fit mx-4 md:mx-1 bg-gray-100 p-8 rounded shadow-md'
        onSubmit={handleSignup}
      >
        <h2 className='text-2xl font-bold mb-6'>Sign Up</h2>
        <input
          className='w-full p-2 mb-4 border'
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          className='w-full p-2 mb-4 border'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className='w-full p-2 mb-4 border'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

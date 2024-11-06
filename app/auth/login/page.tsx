'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, validateLogin } from '@/utils/auth';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin(formData.username, formData.password)) {
      alert('Login successful!');
      router.push('/dashboard');
    } else if (getUser() === null) {
      alert('Please Signup to login');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div
        className='md:w-1/3 w-fit mx-4 md:mx-1 bg-gray-100 p-8 rounded shadow-md'
        onSubmit={handleLogin}
      >
        <h2 className='text-2xl font-bold mb-6'>Log In</h2>
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
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <div className='flex md:flex-row flex-col gap-2 items-center'>
          <button
            onClick={handleLogin}
            className='w-full bg-blue-500 text-white py-2 rounded'
          >
            Log In
          </button>
          <p>or</p>
          <button
            onClick={() => {
              router.push('/auth/signup');
            }}
            className='w-full bg-green-500 text-white py-2 rounded mt-2'
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

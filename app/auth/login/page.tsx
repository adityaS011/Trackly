'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/customHooks/useAuth';
import { LogoIcon } from '@/app/utils/icons';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { validateLogin, getUser } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin(formData.username, formData.password)) {
      router.push('/dashboard');
    } else if (getUser() === null) {
      alert('Please sign up first.');
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleGuest = () => {
    sessionStorage.setItem('user', JSON.stringify({ username: 'Guest', email: 'guest@trackly.app', password: '' }));
    sessionStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-8'>
          <LogoIcon className='w-8 h-8' />
          <span className='text-xl font-bold text-gray-900'>Trackly</span>
        </div>

        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-8'>
          <h1 className='text-xl font-semibold text-gray-900 mb-1'>Welcome back</h1>
          <p className='text-sm text-gray-400 mb-6'>Sign in to your workspace</p>

          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <div>
              <label className='text-xs font-medium text-gray-600 block mb-1.5'>Username</label>
              <input type='text' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder='e.g. admin'
                className='w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all' required />
            </div>
            <div>
              <label className='text-xs font-medium text-gray-600 block mb-1.5'>Password</label>
              <input type='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder='••••••••'
                className='w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all' required />
              <p className='text-xs text-gray-400 mt-1.5'>Demo: username <strong>admin</strong>, password <strong>admin</strong></p>
            </div>
            <button type='submit' className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors mt-1'>
              Sign in
            </button>
          </form>

          <div className='flex items-center gap-3 my-5'>
            <div className='flex-1 h-px bg-gray-100' />
            <span className='text-xs text-gray-400'>or</span>
            <div className='flex-1 h-px bg-gray-100' />
          </div>

          <button onClick={handleGuest}
            className='w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
            Continue as Guest
          </button>

          <p className='text-center text-xs text-gray-400 mt-5'>
            No account?{' '}
            <button onClick={() => router.push('/auth/signup')} className='text-blue-600 hover:underline font-medium'>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BiCaretDown, BiUser } from 'react-icons/bi';
import { gsap } from 'gsap';
import { LogoIcon } from './utils/icons';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('User');
  const [dropdownState, setDropdownState] = useState<boolean>(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user: { username: string } = JSON.parse(storedUser);
      setUsername(user.username);
    }

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
    );

    gsap.fromTo(
      illustrationRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.5 }
    );
  }, []);

  const handleLogout = () => {
    const confirmation = confirm('Are you sure you want to logout?');
    if (!confirmation) return;

    sessionStorage.setItem('isLoggedIn', 'false');
    router.push('/auth/login');
  };
  const handleLoginPage = () => {
    router.push('/auth/login');
  };

  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-900 relative overflow-hidden'>
      {/* Navbar */}
      <nav className='flex justify-between items-center py-4 px-6 bg-white shadow-md fixed w-full z-10'>
        {/* Logo */}
        <div className='flex items-center gap-3 text-lg font-semibold text-black'>
          <LogoIcon className='w-8 h-8' />
          <span className='uppercase tracking-wide'>Trackly</span>
        </div>

        {/* User Section */}
        <div
          className='relative flex items-center gap-2 cursor-pointer'
          onClick={() => setDropdownState(!dropdownState)}
        >
          <BiUser className='w-6 h-6' />
          <span className='font-medium'>{username}</span>
          <BiCaretDown
            className={`w-4 h-4 transition-transform ${
              dropdownState ? 'rotate-180' : ''
            }`}
          />

          {/* Dropdown */}
          {dropdownState && (
            <div
              className='absolute top-10 right-0 bg-white text-black rounded-md shadow-xl py-2'
              role='menu'
              aria-label='User Menu'
            >
              <button
                onClick={handleLogout}
                className='block w-full px-4 py-2 text-sm text-left hover:bg-red-500 hover:text-white transition-colors'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className='flex flex-col items-center  flex-1 px-6 text-center pt-28'>
        <div ref={heroRef} className='max-w-4xl'>
          <h1 className='text-5xl font-extrabold mb-6 leading-tight'>
            Track Your Tasks With <span className='text-blue-600'>Ease</span>
          </h1>
          <p className='text-lg text-gray-700 font-medium mb-10'>
            Your all-in-one platform for managing tasks, tracking progress, and
            achieving your goals.
          </p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className='flex gap-6'>
          <button
            onClick={handleLoginPage}
            className='px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all'
          >
            Get Started
          </button>
          <button className='px-8 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg shadow-lg transform hover:scale-105 transition-all'>
            Learn More!
          </button>
        </div>
      </section>

      {/* Illustration */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl pointer-events-none'>
        <img
          ref={illustrationRef}
          src='/device.svg'
          alt='Illustration'
          className='w-full h-auto'
        />
      </div>
    </div>
  );
};

export default Page;

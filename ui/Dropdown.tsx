'use client';
import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline-block'>
      <button
        onClick={toggleDropdown}
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Dropdown
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
          <div className='py-1'>
            <a
              href='#'
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
            >
              Option 1
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
            >
              Option 2
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

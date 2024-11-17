import React from 'react';
import Team from './Team';

const page = () => {
  return (
    <div className='bg-gray-50 flex flex-row w-full  justify-center'>
      <div className=' mx-auto max-w-[1150px]  w-full flex flex-grow '>
        <Team />
      </div>
    </div>
  );
};

export default page;

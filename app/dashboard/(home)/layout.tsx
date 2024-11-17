import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=' mx-auto max-w-[1150px]  w-full flex flex-grow'>
      {children}
    </div>
  );
};

export default layout;

import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full h-full overflow-auto'>
      {children}
    </div>
  );
};

export default layout;

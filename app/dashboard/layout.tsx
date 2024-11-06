import React from 'react';
import Navbar from './components/Navbar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default layout;

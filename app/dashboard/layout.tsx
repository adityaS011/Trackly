import React from 'react';
import DashboardShell from './components/DashboardShell';
import ResponsiveLayout from '../utils/ResponsiveLayout';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ResponsiveLayout>
      <DashboardShell>{children}</DashboardShell>
    </ResponsiveLayout>
  );
};

export default layout;

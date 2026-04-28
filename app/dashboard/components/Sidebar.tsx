'use client';
import cn from '@/app/utils/cn';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoTasklist } from 'react-icons/go';
import { RiTeamFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { IoChevronBackOutline, IoChevronForwardOutline, IoSettingsOutline, IoBarChartOutline, IoPersonOutline } from 'react-icons/io5';
import { useSidebar } from './SidebarContext';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  route: string;
  tab: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: <RxDashboard size={18} />, route: '/dashboard', tab: 'dashboard' },
  { label: 'Tasks', icon: <GoTasklist size={18} />, route: '/dashboard/tasks', tab: 'tasks' },
  { label: 'Team', icon: <RiTeamFill size={18} />, route: '/dashboard/team', tab: 'team' },
  { label: 'Analytics', icon: <IoBarChartOutline size={18} />, route: '/dashboard/analytics', tab: 'analytics' },
];

const bottomItems: NavItem[] = [
  { label: 'Profile', icon: <IoPersonOutline size={18} />, route: '/dashboard/profile', tab: 'profile' },
  { label: 'Settings', icon: <IoSettingsOutline size={18} />, route: '/dashboard/settings', tab: 'settings' },
];

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggle } = useSidebar();

  useEffect(() => {
    if (pathname.includes('/team')) setCurrentTab('team');
    else if (pathname.includes('/tasks')) setCurrentTab('tasks');
    else if (pathname.includes('/analytics')) setCurrentTab('analytics');
    else if (pathname.includes('/settings')) setCurrentTab('settings');
    else if (pathname.includes('/profile')) setCurrentTab('profile');
    else setCurrentTab('dashboard');
  }, [pathname]);

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = currentTab === item.tab;
    return (
      <button
        title={collapsed ? item.label : undefined}
        onClick={() => router.push(item.route)}
        className={cn(
          'group relative flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
          active
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          collapsed && 'justify-center px-2'
        )}
      >
        <span className='shrink-0'>{item.icon}</span>
        {!collapsed && <span className='truncate'>{item.label}</span>}
        {collapsed && (
          <span className='pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-50'>
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Toggle button */}
      <button
        onClick={toggle}
        className='absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-colors'
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <IoChevronForwardOutline size={12} /> : <IoChevronBackOutline size={12} />}
      </button>

      {/* Logo area */}
      <div className={cn('flex items-center gap-2.5 border-b border-gray-100 px-3 py-4', collapsed && 'justify-center px-2')}>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm'>
          T
        </div>
        {!collapsed && (
          <div>
            <p className='text-sm font-semibold text-gray-900'>Trackly</p>
            <p className='text-xs text-gray-400'>Workspace</p>
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className='flex flex-col gap-1 p-2 flex-1'>
        {!collapsed && (
          <p className='px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400'>
            Main
          </p>
        )}
        {navItems.map((item) => (
          <NavLink key={item.tab} item={item} />
        ))}
      </nav>

      {/* Divider */}
      <div className='mx-2 border-t border-gray-100' />

      {/* Bottom nav */}
      <nav className='flex flex-col gap-1 p-2'>
        {bottomItems.map((item) => (
          <NavLink key={item.tab} item={item} />
        ))}
      </nav>

      {/* User pill at bottom */}
      {!collapsed && (
        <div className='border-t border-gray-100 p-3'>
          <div className='flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-50 cursor-pointer transition-colors'>
            <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold'>
              U
            </div>
            <div className='min-w-0'>
              <p className='truncate text-xs font-medium text-gray-800'>My Account</p>
              <p className='truncate text-xs text-gray-400'>Free plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

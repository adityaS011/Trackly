'use client';
import React, { useRef, useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

const notifications = [
  { id: 1, text: 'Task "Design review" is overdue', time: '2m ago', unread: true },
  { id: 2, text: 'Alice assigned you a new task', time: '1h ago', unread: true },
  { id: 3, text: 'Sprint planning starts tomorrow', time: '3h ago', unread: false },
];

const NotificationsMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => n.unread).length;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className='relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
      >
        <IoNotificationsOutline size={18} />
        {unread > 0 && (
          <span className='absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold'>
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className='absolute right-0 top-10 w-80 rounded-xl border border-gray-100 bg-white shadow-lg z-50 overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
            <p className='text-sm font-semibold text-gray-800'>Notifications</p>
            <span className='text-xs text-blue-600 cursor-pointer hover:underline'>Mark all read</span>
          </div>
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${n.unread ? 'bg-blue-50/40' : ''}`}>
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? 'bg-blue-500' : 'bg-gray-200'}`} />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm text-gray-700 leading-snug'>{n.text}</p>
                  <p className='text-xs text-gray-400 mt-0.5'>{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className='px-4 py-2 border-t border-gray-100 text-center'>
            <span className='text-xs text-blue-600 cursor-pointer hover:underline'>View all notifications</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;

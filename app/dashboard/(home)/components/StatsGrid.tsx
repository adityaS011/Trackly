'use client';
import React from 'react';
import { IoTrendingUpOutline, IoListOutline, IoCheckmarkCircleOutline, IoTimeOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { stats } from '../homeData';

const iconMap: Record<string, React.ReactNode> = {
  list: <IoListOutline size={20} />,
  check: <IoCheckmarkCircleOutline size={20} />,
  time: <IoTimeOutline size={20} />,
  alert: <IoAlertCircleOutline size={20} />,
};

const StatsGrid = () => (
  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
    {stats.map((s) => (
      <div
        key={s.label}
        className={`flex flex-col gap-3 rounded-xl border ${s.border} bg-white p-4 shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className='flex items-center justify-between'>
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
            {iconMap[s.icon]}
          </div>
          <span className={`flex items-center gap-0.5 text-xs font-medium ${s.positive ? 'text-emerald-600' : 'text-red-500'}`}>
            <IoTrendingUpOutline size={12} />
            {s.change}
          </span>
        </div>
        <div>
          <p className='text-2xl font-bold text-gray-900'>{s.value}</p>
          <p className='text-xs text-gray-500 mt-0.5'>{s.label}</p>
        </div>
        <div className='h-1.5 rounded-full bg-gray-100'>
          <div className={`h-1.5 rounded-full ${s.bar} transition-all`} style={{ width: `${s.pct}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export default StatsGrid;

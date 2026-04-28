'use client';
import React from 'react';
import TrendLineChart from './components/TrendLineChart';
import StatusPieChart from './components/StatusPieChart';
import MemberBarChart from './components/MemberBarChart';
import WeeklyActivityBar from './components/WeeklyActivityBar';
import { IoBarChartOutline, IoTrendingUpOutline, IoCheckmarkDoneOutline, IoTimeOutline } from 'react-icons/io5';

const kpis = [
  { label: 'Completion Rate', value: '67%', sub: '+5% vs last month', icon: <IoTrendingUpOutline size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg. Resolution', value: '3.2d', sub: '−0.4d vs last month', icon: <IoTimeOutline size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Tasks Closed', value: '28', sub: 'This sprint', icon: <IoCheckmarkDoneOutline size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Open Issues', value: '14', sub: '4 overdue', icon: <IoBarChartOutline size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const AnalyticsPage = () => (
  <div className='flex flex-col gap-6 p-6'>
    <div>
      <h1 className='text-2xl font-bold text-gray-900'>Analytics</h1>
      <p className='mt-0.5 text-sm text-gray-500'>Project health and team performance overview.</p>
    </div>

    {/* KPI row */}
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {kpis.map((k) => (
        <div key={k.label} className='flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${k.bg} ${k.color}`}>
            {k.icon}
          </div>
          <div>
            <p className='text-xl font-bold text-gray-900'>{k.value}</p>
            <p className='text-xs text-gray-500'>{k.label}</p>
            <p className='text-xs text-gray-400 mt-0.5'>{k.sub}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Charts row 1 */}
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'><TrendLineChart /></div>
      <StatusPieChart />
    </div>

    {/* Charts row 2 */}
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <WeeklyActivityBar />
      <MemberBarChart />
    </div>
  </div>
);

export default AnalyticsPage;

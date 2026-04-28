'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { weeklyActivity } from '../analyticsData';

const WeeklyActivityBar = () => {
  const max = Math.max(...weeklyActivity.map((d) => d.tasks));
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
      <h3 className='text-sm font-semibold text-gray-800 mb-0.5'>Weekly Activity</h3>
      <p className='text-xs text-gray-400 mb-4'>Tasks touched per day this week</p>
      <ResponsiveContainer width='100%' height={240}>
        <BarChart data={weeklyActivity} margin={{ top: 4, right: 8, left: -24, bottom: 0 }} barSize={28}>
          <XAxis dataKey='day' tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
            formatter={(v) => [`${v} tasks`]}
          />
          <Bar dataKey='tasks' radius={[4, 4, 0, 0]}>
            {weeklyActivity.map((entry, i) => (
              <Cell key={i} fill={entry.tasks === max ? '#6366f1' : '#e0e7ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivityBar;

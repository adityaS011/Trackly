'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { memberPerf } from '../analyticsData';

const MemberBarChart = () => (
  <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
    <h3 className='text-sm font-semibold text-gray-800 mb-0.5'>Team Performance</h3>
    <p className='text-xs text-gray-400 mb-4'>Completed vs in-progress per member</p>
    <ResponsiveContainer width='100%' height={240}>
      <BarChart data={memberPerf} margin={{ top: 4, right: 16, left: -20, bottom: 0 }} barSize={18}>
        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' vertical={false} />
        <XAxis dataKey='name' tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
        <Legend iconType='circle' iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Bar dataKey='completed' fill='#10b981' name='Completed' radius={[4, 4, 0, 0]} />
        <Bar dataKey='inProgress' fill='#3b82f6' name='In Progress' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MemberBarChart;

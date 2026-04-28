'use client';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { monthlyTrend } from '../analyticsData';

const TrendLineChart = () => (
  <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
    <h3 className='text-sm font-semibold text-gray-800 mb-0.5'>Task Trends</h3>
    <p className='text-xs text-gray-400 mb-4'>Created vs completed over 6 months</p>
    <ResponsiveContainer width='100%' height={240}>
      <LineChart data={monthlyTrend} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
        <XAxis dataKey='month' tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
          itemStyle={{ padding: 0 }}
        />
        <Legend iconType='circle' iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Line type='monotone' dataKey='created' stroke='#6366f1' strokeWidth={2} dot={false} name='Created' />
        <Line type='monotone' dataKey='completed' stroke='#10b981' strokeWidth={2} dot={false} name='Completed' />
        <Line type='monotone' dataKey='overdue' stroke='#ef4444' strokeWidth={2} dot={false} strokeDasharray='4 2' name='Overdue' />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TrendLineChart;

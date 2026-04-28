'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { statusBreakdown } from '../analyticsData';

const StatusPieChart = () => (
  <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
    <h3 className='text-sm font-semibold text-gray-800 mb-0.5'>Status Breakdown</h3>
    <p className='text-xs text-gray-400 mb-4'>Current task distribution</p>
    <ResponsiveContainer width='100%' height={240}>
      <PieChart>
        <Pie
          data={statusBreakdown}
          cx='50%'
          cy='45%'
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey='value'
        >
          {statusBreakdown.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
          formatter={(v) => [`${v} tasks`]}
        />
        <Legend iconType='circle' iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 4 }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatusPieChart;

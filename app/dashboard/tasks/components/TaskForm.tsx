'use client';
import React, { useState } from 'react';
import { Tasks, TabsType } from '@/types';
import ConfirmDialog from './ConfirmDialog';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-xs font-medium text-gray-600'>{label}</label>
    {children}
  </div>
);

const inputCls = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-white';

const TaskForm = ({ formData, onChange, onStatusChange, onSubmit, isEdit }: {
  formData: Tasks;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onStatusChange: (s: TabsType) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEdit: boolean;
}) => {
  const [pendingStatus, setPendingStatus] = useState<TabsType | null>(null);

  const handleStatusSelect = (val: string) => {
    if (val !== formData.status) setPendingStatus(val as TabsType);
  };

  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-5 pb-20'>
        <Field label='Task Name *'>
          <input name='name' value={formData.name} onChange={onChange} required placeholder='e.g. Redesign landing page'
            className={inputCls} />
        </Field>

        <Field label='Description'>
          <textarea name='description' rows={3} placeholder='Add details about this task…'
            className={`${inputCls} resize-none`} />
        </Field>

        <div className='grid grid-cols-2 gap-3'>
          <Field label='Assignee'>
            <input name='assignee' value={formData.assignee} onChange={onChange} placeholder='Name'
              className={inputCls} />
          </Field>
          <Field label='Priority'>
            <select name='priority' value={formData.priority} onChange={onChange} className={inputCls}>
              <option value='High'>🔴 High</option>
              <option value='Medium'>🟡 Medium</option>
              <option value='Low'>🟢 Low</option>
            </select>
          </Field>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <Field label='Status'>
            <select value={formData.status} onChange={(e) => handleStatusSelect(e.target.value)} className={inputCls}>
              <option value='open'>Open</option>
              <option value='inprogress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </Field>
          <Field label='Label'>
            <select name='labels' value={formData.labels} onChange={onChange} className={inputCls}>
              <option value='Going On'>Going On</option>
              <option value='Completed'>Completed</option>
              <option value='Update Pending'>Update Pending</option>
            </select>
          </Field>
        </div>

        <div className='fixed bottom-0 right-0 w-[38%] bg-white border-t border-gray-100 px-6 py-4'>
          <button type='submit'
            className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm'>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>

      {pendingStatus && (
        <ConfirmDialog
          status={pendingStatus}
          onConfirm={() => { onStatusChange(pendingStatus); setPendingStatus(null); }}
          onCancel={() => setPendingStatus(null)}
        />
      )}
    </>
  );
};

export default TaskForm;

'use client';
import { Tasks, TabsType } from '@/types';
import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { IoChatbubbleOutline, IoCheckboxOutline } from 'react-icons/io5';
import Comments from './Comments';
import TaskForm from './TaskForm';

const tabs = [
  { id: 'task', label: 'Task', icon: <IoCheckboxOutline size={14} /> },
  { id: 'comments', label: 'Comments', icon: <IoChatbubbleOutline size={14} /> },
] as const;

const TaskModal = ({ task, onClose, onSubmit }: { task: Tasks | null; onClose: () => void; onSubmit: (t: Tasks) => void }) => {
  const [formData, setFormData] = useState<Tasks>({
    id: task?.id || crypto.randomUUID(),
    name: task?.name || '',
    tasks: [],
    assignee: task?.assignee || '',
    status: task?.status || 'open',
    labels: task?.labels || '',
    created_at: task?.created_at || new Date().toISOString(),
    updated_at: task?.updated_at || new Date().toISOString(),
    priority: task?.priority || 'Medium',
  });
  const [activeTab, setActiveTab] = useState<'task' | 'comments'>('task');

  useEffect(() => {
    if (task) setFormData({ ...task, tasks: [] });
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleStatusChange = (s: TabsType) => setFormData((p) => ({ ...p, status: s }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className='fixed inset-0 flex items-center justify-end bg-black/30 backdrop-blur-[2px] z-50' onClick={onClose}>
      <div
        className='relative bg-white animate-slideInRight shadow-2xl w-[38%] h-full flex flex-col overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 pt-5 pb-0 shrink-0'>
          <h2 className='text-base font-semibold text-gray-900'>{task ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className='flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors'>
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className='flex gap-1 px-6 pt-3 pb-0 border-b border-gray-100 shrink-0'>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                activeTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className='flex-1 overflow-y-auto px-6'>
          {activeTab === 'task' && (
            <TaskForm
              formData={formData}
              onChange={handleChange}
              onStatusChange={handleStatusChange}
              onSubmit={handleSubmit}
              isEdit={!!task}
            />
          )}
          {activeTab === 'comments' && <Comments taskId={task?.id} />}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

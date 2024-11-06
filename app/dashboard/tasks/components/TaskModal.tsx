import { Tasks, LabelType, LabelsType } from '@/types';
import React, { useState, useEffect } from 'react';

const TaskModal = ({
  task,
  onClose,
  onSubmit,
}: {
  task?: Tasks;
  onClose: () => void;
  onSubmit: (task: Tasks) => void;
}) => {
  const [formData, setFormData] = useState<Tasks>({
    id: task?.id || 0,
    name: task?.name || '',
    status: task?.status || 'Open', // Default status is "Open"
    labels: task?.labels || [],
    created_at: task?.created_at || new Date().toISOString(),
    updated_at: task?.updated_at || new Date().toISOString(),
    priority: task?.priority || '',
  });

  const labelsOptions: LabelsType = ['Going On', 'Completed', 'Update Pending']; // Predefined label options

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        name: task.name,
        status: task.status,
        labels: task.labels,
        created_at: task.created_at,
        updated_at: task.updated_at,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLSelectElement | HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabelChange = (label: LabelType) => {
    setFormData((prev) => {
      const updatedLabels = prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label];
      return { ...prev, labels: updatedLabels };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-medium'>
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1' htmlFor='name'>
              Task Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium mb-1'
              htmlFor='priority'
            >
              Priority
            </label>
            <input
              type='text'
              id='priority'
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='w-full p-2 border rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Labels</label>
            <div className='space-y-2'>
              {labelsOptions.map((label) => (
                <div key={label} className='flex items-center'>
                  <input
                    type='checkbox'
                    id={label}
                    checked={formData.labels.includes(label)}
                    onChange={() => handleLabelChange(label)}
                    className='mr-2'
                  />
                  <label htmlFor={label} className='text-sm'>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1' htmlFor='status'>
              Status
            </label>
            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={(e) => handleChange(e)}
              className='w-full p-2 border rounded-md'
            >
              <option value='Open'>Open</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-500 text-white rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md'
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

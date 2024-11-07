import { Tasks, LabelType } from '@/types';
import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import { BiX } from 'react-icons/bi';

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
    id: task?.id || crypto.randomUUID(),
    name: task?.name || '',
    assignee: task?.assignee || '',
    status: task?.status || '',
    labels: task?.labels || '',
    created_at: task?.created_at || new Date().toISOString(),
    updated_at: task?.updated_at || new Date().toISOString(),
    priority: task?.priority || '',
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<string>(formData.status);
  const [selectedTab, setSelectedTab] = useState<'task' | 'comments'>('task'); // State to manage the active tab

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        name: task.name,
        status: task.status,
        labels: task.labels,
        assignee: task.assignee,
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatusToUpdate(newStatus);
    setIsConfirmModalOpen(true);
  };

  const handleStatusConfirmation = (confirm: boolean) => {
    if (confirm) {
      setFormData((prev) => ({ ...prev, status: statusToUpdate }));
    }
    setIsConfirmModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-end h-screen bg-gray-500 bg-opacity-50 z-50'>
      <div className='bg-white p-6 shadow-lg w-2/5 h-full '>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-lg font-medium'>
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
          <div onClick={onClose} className='hover:bg-slate-100 p-2'>
            <BiX className='w-6 h-6 ' />
          </div>
        </div>
        <div className='flex flex-row gap-4 border-b border-gray-700'>
          <div
            className={`tab cursor-pointer hover:bg-blue-300 px-4 py-1 ${
              selectedTab === 'task'
                ? 'border-b-2 border-gray-700 font-semibold text-blue-600'
                : ''
            }`}
            onClick={() => setSelectedTab('task')}
          >
            Task
          </div>
          <div
            className={`tab cursor-pointer hover:bg-blue-300 px-4  py-1 first-letter:uppercase ${
              selectedTab === 'comments'
                ? 'border-b-2 border-gray-700 font-semibold text-blue-600'
                : ''
            }`}
            onClick={() => setSelectedTab('comments')}
          >
            Comments
          </div>
        </div>
        {selectedTab === 'task' && (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col h-full gap-4 pb-16 justify-between'
          >
            <div className='flex flex-col gap-4 mt-6'>
              <div className='w-full col-span-2'>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='name'
                >
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
              <div className='w-full'>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='assignee'
                >
                  Assignee
                </label>
                <input
                  type='text'
                  id='assignee'
                  name='assignee'
                  value={formData.assignee}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                  required
                />
              </div>
              <div className='w-full'>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='priority'
                >
                  Priority
                </label>
                <select
                  id='priority'
                  name='priority'
                  value={formData.priority}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
              </div>
              <div className='w-full'>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='status'
                >
                  Status
                </label>
                <select
                  id='status'
                  name='status'
                  value={statusToUpdate}
                  onChange={handleStatusChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value='Open'>Open</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
              <div className='w-full'>
                <label
                  className='block text-sm font-medium mb-1'
                  htmlFor='labels'
                >
                  Label
                </label>
                <select
                  id='labels'
                  name='labels'
                  value={formData.labels}
                  onChange={handleChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value='Going On'>Going On</option>
                  <option value='Completed'>Completed</option>
                  <option value='Update Pending'>Update Pending</option>
                </select>
              </div>
            </div>

            <div className='flex justify-center gap-2 col-span-2'>
              <button
                type='submit'
                className='px-4 py-2 bg-green-600 text-white rounded-md'
              >
                {task ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        )}

        {selectedTab === 'comments' && <Comments taskId={task?.id} />}

        {isConfirmModalOpen && (
          <div className='fixed shadow-md inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
              <h3 className='text-lg font-medium'>Confirm Status Change</h3>
              <p>
                Are you sure you want to change the status to {statusToUpdate}?
              </p>
              <div className='flex justify-between gap-2'>
                <button
                  onClick={() => handleStatusConfirmation(true)}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md'
                >
                  Proceed
                </button>
                <button
                  onClick={() => handleStatusConfirmation(false)}
                  className='px-4 py-2 bg-red-500 text-white rounded-md'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;

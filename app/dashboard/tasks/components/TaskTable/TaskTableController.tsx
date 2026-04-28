'use client';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { TabsType, Tasks } from '@/types';
import { TabsToShow } from '@/data';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskModal from '../TaskModal';

const TaskTableController = ({ setDataCount }: { setDataCount: (val: number | null) => void }) => {
  const [tasksData, setTasksData] = useState<Tasks[]>([]);
  const [filteredData, setFilteredData] = useState<Tasks[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Tasks | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const addTask = () => { setTaskToEdit(null); setShowTaskModal(true); };

  const handleEditClick = (id: string) => {
    const task = tasksData.find((item) => item.id === id);
    if (task) setTaskToEdit(task);
    setShowTaskModal(true);
    const url = new URL(window.location.href);
    url.searchParams.set('task_id', id);
    router.replace(url.toString());
  };

  const handleModalClose = () => {
    setShowTaskModal(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('task_id');
    router.replace(url.toString());
  };

  const handleAddTask = (task: Tasks) => {
    const updated = taskToEdit
      ? tasksData.map((item) => item.id === taskToEdit.id ? { ...item, ...task, updated_at: new Date().toISOString() } : item)
      : [task, ...tasksData];
    setTasksData(updated);
    setFilteredData(updated.filter((item) => item.status.toLowerCase() === activeTab.toLowerCase()));
    handleModalClose();
    setTaskToEdit(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setLoading(false);
        setTasksData(data.tasks);
      }, 1000);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabsType;
    const taskIdParam = searchParams.get('task_id');
    setSelectedRowId(taskIdParam ?? null);
    setActiveTab(TabsToShow.includes(tabParam) ? tabParam : 'open');
  }, [searchParams]);

  useEffect(() => {
    if (!activeTab) return;
    const priority = searchParams.get('priority') ?? '';
    const filtered = tasksData.filter((item) => {
      const matchTab = item.status.toLowerCase() === activeTab.toLowerCase();
      const matchPriority = !priority || item.priority.toLowerCase() === priority.toLowerCase();
      return matchTab && matchPriority;
    });
    setFilteredData(filtered);
    setDataCount(filtered.length);
  }, [tasksData, activeTab, searchParams]);

  // Keyboard navigation: arrow keys for tab switching, Enter to open selected task
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const idx = TabsToShow.indexOf((searchParams.get('tab') as TabsType) || 'open');
        if (idx < TabsToShow.length - 1) router.replace(`?tab=${TabsToShow[idx + 1]}`);
      } else if (e.key === 'ArrowLeft') {
        const idx = TabsToShow.indexOf((searchParams.get('tab') as TabsType) || 'open');
        if (idx > 0) router.replace(`?tab=${TabsToShow[idx - 1]}`);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchParams]);

  return (
    <div className='w-full h-full'>
      <TaskTable
        tasksData={filteredData}
        loading={loading}
        addTask={addTask}
        handleEditClick={handleEditClick}
      />
      {showTaskModal && (
        <TaskModal onClose={handleModalClose} onSubmit={handleAddTask} task={taskToEdit} />
      )}
    </div>
  );
};

export default TaskTableController;

'use client';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { TabsType, Tasks } from '@/types';
import { TabsToShow } from '@/data';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskModal from '../TaskModal';

const TaskTableController = () => {
  const [tasksData, setTasksData] = useState<Tasks[]>([]);
  const [filteredData, setFilteredData] = useState<Tasks[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Tasks>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const searchParams = useSearchParams();
  const router = useRouter();
  const addTask = () => {
    setShowTaskModal(true);
  };

  const handleEditClick = (id: string) => {
    setShowTaskModal(true);

    const task = tasksData.find((item) => item.id === id);
    if (task) setTaskToEdit(task);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('task_id', id);

    router.replace(currentUrl.toString());
  };
  const handleModalClose = () => {
    setShowTaskModal(false);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('task_id');

    router.replace(currentUrl.toString());
  };
  const handleAddTask = (task: Tasks) => {
    if (taskToEdit) {
      setTasksData((prev) =>
        prev.map((item) =>
          item.id === taskToEdit.id
            ? { ...item, ...task, updated_at: new Date().toISOString() }
            : item
        )
      );
    } else {
      setTasksData((prev) => [task, ...prev]);
    }
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('task_id');

    router.replace(currentUrl.toString());
    setTaskToEdit(undefined);
    setShowTaskModal(false);
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabsType;
    if (tabParam && TabsToShow.includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab('open');
    }
    setSelectedRowIndex(0);
  }, [searchParams]);

  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedRowIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'ArrowDown') {
        setSelectedRowIndex((prev) => {
          const maxIndex = filteredData.length - 1;
          return Math.min(prev + 1, maxIndex);
        });
      } else if (event.key === 'Enter') {
        const selectedTask = filteredData[selectedRowIndex];
        if (selectedTask) {
          handleEditClick(selectedTask.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredData, selectedRowIndex, handleEditClick]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setLoading(false);
      setTasksData(data.tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!activeTab) return;
    const tabFilteredData = tasksData.filter(
      (item) => item.status.toLowerCase() === activeTab.toLowerCase()
    );
    setFilteredData(tabFilteredData);
  }, [tasksData, activeTab]);

  return (
    <div className='w-full h-full'>
      <TaskTable
        tasksData={filteredData}
        loading={loading}
        addTask={addTask}
        handleEditClick={handleEditClick}
        selectedRowIndex={selectedRowIndex}
      />
      {showTaskModal && (
        <TaskModal
          onClose={() => handleModalClose()}
          onSubmit={handleAddTask}
          task={taskToEdit}
        />
      )}
    </div>
  );
};

export default TaskTableController;

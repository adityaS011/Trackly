'use client';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { TabsType, Tasks } from '@/types';
import { TabsToShow } from '@/data';
import { useSearchParams } from 'next/navigation';
import TaskModal from '../TaskModal';

const TaskTableController = () => {
  const [tasksData, setTasksData] = useState<Tasks[]>([]);
  const [filteredData, setFilteredData] = useState<Tasks[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Tasks>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const searchParams = useSearchParams();

  const addTask = () => {
    setShowTaskModal(true);
  };
  const handleEditClick = (id: number) => {
    console.log(id);
    console.log(tasksData[id]);
    setShowTaskModal(true);
    setTaskToEdit(tasksData[id]);
  };
  const handleAddTask = (task: Tasks) => {
    if (taskToEdit) {
      setTasksData((prev) =>
        prev.map((item) =>
          item.id === taskToEdit.id ? { ...item, ...task } : item
        )
      );
    } else {
      setTasksData((prev) => [...prev, task]);
    }

    setTaskToEdit(undefined);
    setShowTaskModal(false);
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabsType;
    if (tabParam && TabsToShow.includes(tabParam)) {
      setActiveTab(tabParam);
    }
    setSelectedRowIndex(0);
  }, [searchParams]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedRowIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'ArrowDown') {
        setSelectedRowIndex((prev) => Math.min(prev + 1, tasksData.length - 1));
      } else if (event.key === 'Enter') {
        handleEditClick(tasksData[selectedRowIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tasksData, selectedRowIndex, handleEditClick]);
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await fetch('/api/tasks'); // fetches mock data
      const data = await response.json();
      setLoading(false);
      setTasksData(data.tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!activeTab) return;
    console.log(tasksData);
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
          onClose={() => {
            setShowTaskModal(false);
          }}
          onSubmit={handleAddTask}
          task={taskToEdit}
        />
      )}
    </div>
  );
};

export default TaskTableController;

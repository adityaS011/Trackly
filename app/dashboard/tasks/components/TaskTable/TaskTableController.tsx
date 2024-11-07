'use client';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import { TabsType, Tasks } from '@/types';
import { TabsToShow } from '@/data';
import { useRouter, useSearchParams } from 'next/navigation';
import TaskModal from '../TaskModal';

const TaskTableController = ({
  setDataCount,
}: {
  setDataCount: (val: number | null) => void;
}) => {
  const [tasksData, setTasksData] = useState<Tasks[]>([]);
  const [filteredData, setFilteredData] = useState<Tasks[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Tasks>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const [sortConfig, setSortConfig] = useState<{
    key: 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
  }>({
    key: 'updated_at',
    direction: 'desc',
  });
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
    let updatedTasksData;
    if (taskToEdit) {
      updatedTasksData = tasksData.map((item) =>
        item.id === taskToEdit.id
          ? { ...item, ...task, updated_at: new Date().toISOString() }
          : item
      );
    } else {
      updatedTasksData = [task, ...tasksData]; // Add new task to the top
    }

    setTasksData(updatedTasksData);
    setFilteredData(
      updatedTasksData.filter(
        (item) => item.status.toLowerCase() === activeTab.toLowerCase()
      )
    );
    console.log(tasksData);
    sortData();

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('task_id');

    router.replace(currentUrl.toString());
    setTaskToEdit(undefined);
    setShowTaskModal(false);
  };

  const sortData = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setFilteredData(sortedData);
  };

  const handleSortClick = (key: 'created_at' | 'updated_at') => {
    setSortConfig((prevState) => {
      const newDirection =
        prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction: newDirection };
    });
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
    const fetchTasks = async () => {
      setLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setLoading(false);
        setTasksData(data.tasks);
      }, 2000);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!activeTab) return;
    const tabFilteredData = tasksData.filter(
      (item) => item.status.toLowerCase() === activeTab.toLowerCase()
    );
    setFilteredData(tabFilteredData);
    if (tabFilteredData.length > 0) {
      setDataCount(tabFilteredData.length);
    }
  }, [tasksData, activeTab]);

  useEffect(() => {
    sortData();
  }, [sortConfig]);

  return (
    <div className='w-full h-full'>
      <TaskTable
        tasksData={filteredData}
        loading={loading}
        addTask={addTask}
        handleEditClick={handleEditClick}
        selectedRowIndex={selectedRowIndex}
        onSort={handleSortClick}
        sortConfig={sortConfig}
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

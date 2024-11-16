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
  const [taskToEdit, setTaskToEdit] = useState<Tasks | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsType>('open');
  const [currentActiveRowIndex, setcurrentActiveRowIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 11 });
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
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
    setTaskToEdit(null);
    setShowTaskModal(true);
  };

  const handleEditClick = (id: string, index?: number) => {
    setShowTaskModal(true);
    if (index !== undefined) {
      setcurrentActiveRowIndex(index);
    }
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
      updatedTasksData = [task, ...tasksData];
    }

    setTasksData(updatedTasksData);
    setFilteredData(
      updatedTasksData.filter(
        (item) => item.status.toLowerCase() === activeTab.toLowerCase()
      )
    );
    sortData();

    handleModalClose();
    setTaskToEdit(null);
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

  const updateVisibleRange = (index: number) => {
    const rangeSize = visibleRange.end - visibleRange.start; // Size of range
    const totalItems = filteredData.length;

    if (index < visibleRange.start && index >= 0) {
      // Shift range up
      setVisibleRange({
        start: Math.max(index, 0),
        end: Math.max(index, 0) + rangeSize,
      });
    } else if (index >= visibleRange.end && index < totalItems) {
      // Shift range down
      setVisibleRange({
        start: Math.min(index - rangeSize + 1, totalItems - rangeSize),
        end: Math.min(index + 1, totalItems),
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setcurrentActiveRowIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          updateVisibleRange(newIndex);
          return newIndex;
        });
      } else if (event.key === 'ArrowDown') {
        setcurrentActiveRowIndex((prev) => {
          const maxIndex = filteredData.length - 1;
          const newIndex = Math.min(prev + 1, maxIndex);
          updateVisibleRange(newIndex);
          return newIndex;
        });
      } else if (event.key === 'Enter') {
        const selectedTask = filteredData[currentActiveRowIndex];
        if (selectedTask) {
          handleEditClick(selectedTask.id);
        }
        if (showTaskModal) {
          handleModalClose();
        }
      } else if (event.key === 'ArrowRight') {
        console.log(searchParams.get('tab'));
        const currentTab = TabsToShow.indexOf(
          (searchParams.get('tab') as TabsType) || 'closed'
        );
        if (currentTab !== 2)
          router.replace(`?tab=${TabsToShow[currentTab + 1]}`);
      } else if (event.key === 'ArrowLeft') {
        const currentTab = TabsToShow.indexOf(
          (searchParams.get('tab') as TabsType) || 'closed'
        );
        if (currentTab !== 0)
          router.replace(`?tab=${TabsToShow[currentTab - 1]}`);
      }
    };
    updateVisibleRange(currentActiveRowIndex);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredData, currentActiveRowIndex, handleEditClick]);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabsType;
    const taskIdParam = searchParams.get('task_id');
    if (taskIdParam) {
      setSelectedRowId(taskIdParam);
    } else {
      setSelectedRowId(null);
    }
    if (tabParam && TabsToShow.includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab('open');
    }
  }, [searchParams]);

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

    const priorityFilter = searchParams.get('priority') || '';

    const tabFilteredData = tasksData.filter((item) => {
      const matchesTab = item.status.toLowerCase() === activeTab.toLowerCase();
      const matchesPriority =
        priorityFilter === '' ||
        item.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesTab && matchesPriority;
    });

    setFilteredData(tabFilteredData);
    setDataCount(tabFilteredData.length);
  }, [tasksData, activeTab, searchParams]);

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
        currentActiveRowIndex={currentActiveRowIndex - visibleRange.start}
        selectedRowId={selectedRowId}
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

import { tasks } from '@/data';
import { Tasks } from '@/types';
import { NextResponse } from 'next/server';

const initializeMockDataStore = () => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('tasks');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return tasks;
    }
  }
  return tasks;
};

const syncToLocalStorage = (tasks: Tasks) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

export async function GET() {
  const mockData = {
    tasks: initializeMockDataStore(),
    page_details: {
      page_size: 10,
      has_next: true,
    },
  };

  return NextResponse.json(mockData);
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    const tasksFromStorage = initializeMockDataStore();
    const newId = tasksFromStorage.length
      ? tasksFromStorage[tasksFromStorage.length - 1].id + 1
      : 1;
    const addedTask = {
      ...newTask,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    tasksFromStorage.push(addedTask);
    syncToLocalStorage(tasksFromStorage);

    return NextResponse.json(
      { success: true, task: addedTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add task' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTask = await request.json();
    const tasksFromStorage = initializeMockDataStore();
    const taskIndex = tasksFromStorage.findIndex(
      (task: Tasks) => task.id === updatedTask.id
    );

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasksFromStorage[taskIndex] = {
      ...tasksFromStorage[taskIndex],
      ...updatedTask,
      updated_at: new Date().toISOString(),
    };

    syncToLocalStorage(tasksFromStorage);

    return NextResponse.json({
      success: true,
      task: tasksFromStorage[taskIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 400 }
    );
  }
}

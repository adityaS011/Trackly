import { tasks } from '@/data';
import { NextResponse } from 'next/server';

export async function GET() {
  const mockData = {
    tasks,
    page_details: {
      page_size: 10,
      has_next: false,
    },
  };

  return NextResponse.json(mockData);
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const addedTask = {
      ...newTask,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    tasks.push(addedTask);

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
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updatedTask,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, task: tasks[taskIndex] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 400 }
    );
  }
}

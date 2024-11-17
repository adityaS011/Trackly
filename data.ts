import { LabelType, TabsType } from './types';

export const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Emma',
  'Fiona',
  'George',
  'Hannah',
  'Irene',
  'Jack',
];

export const tasks = Array.from({ length: 100 }, (_, i) => {
  const statuses = ['Open', 'InProgress', 'Closed'];
  const status = statuses[Math.floor(i / 40)];

  let labels: LabelType = 'Going On';
  if (status === 'Closed') {
    labels = 'Completed';
  } else if (status === 'InProgress') {
    labels = 'Going On';
  } else if (status === 'Open') {
    labels = 'Update Pending';
  }

  const assignee = names[i % names.length];

  return {
    id: crypto.randomUUID(),
    name: `Task ${i + 1}`,
    labels: labels,
    status: status,
    assignee: assignee,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    priority: i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low',
  };
});

export const TabsToShow: TabsType[] = ['open', 'closed', 'inprogress'];

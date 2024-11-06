import { LabelsType, TabsType } from './types';

export const tasks = Array.from({ length: 30 }, (_, i) => {
  const statuses = ['Open', 'InProgress', 'Closed'];
  const status = statuses[Math.floor(i / 10)]; // Group tasks by status

  let labels: LabelsType = [];
  if (status === 'Closed') {
    labels = ['Completed'];
  } else if (status === 'InProgress') {
    labels = ['Going On'];
  } else if (status === 'Open') {
    labels = ['Update Pending'];
  }

  return {
    id: i + 1,
    name: `Task ${i + 1}`,
    labels: labels,
    status: status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    priority: i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low', // Varying priorities
  };
});

export const TabsToShow: TabsType[] = ['open', 'closed', 'inprogress'];

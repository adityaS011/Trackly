export const stats = [
  { label: 'Total Tasks', value: 42, change: '+4 this week', positive: true, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', bar: 'bg-blue-500', pct: 100, icon: 'list' },
  { label: 'Completed', value: 28, change: '+6 this week', positive: true, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', bar: 'bg-emerald-500', pct: 67, icon: 'check' },
  { label: 'In Progress', value: 10, change: '−2 this week', positive: false, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', bar: 'bg-amber-400', pct: 24, icon: 'time' },
  { label: 'Overdue', value: 4, change: '+1 this week', positive: false, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', bar: 'bg-red-400', pct: 10, icon: 'alert' },
];

export const recentTasks = [
  { id: 'TSK-101', name: 'Design system audit', assignee: 'Alice', status: 'Overdue', priority: 'High', date: 'Apr 20' },
  { id: 'TSK-102', name: 'API rate limiting', assignee: 'Bob', status: 'In Progress', priority: 'High', date: 'Apr 24' },
  { id: 'TSK-103', name: 'Write unit tests', assignee: 'Charlie', status: 'Completed', priority: 'Medium', date: 'Apr 25' },
  { id: 'TSK-104', name: 'Update onboarding flow', assignee: 'Alice', status: 'In Progress', priority: 'Medium', date: 'Apr 26' },
  { id: 'TSK-105', name: 'Fix mobile nav', assignee: 'Dave', status: 'Completed', priority: 'Low', date: 'Apr 27' },
];

export const activity = [
  { user: 'Alice', action: 'completed', task: 'Design review', time: '2m ago', color: 'bg-purple-500' },
  { user: 'Bob', action: 'commented on', task: 'API rate limiting', time: '18m ago', color: 'bg-blue-500' },
  { user: 'Charlie', action: 'created', task: 'Write unit tests', time: '1h ago', color: 'bg-emerald-500' },
  { user: 'Dave', action: 'moved', task: 'Fix mobile nav → Done', time: '2h ago', color: 'bg-amber-500' },
];

export const statusConfig: Record<string, { cls: string }> = {
  Completed: { cls: 'bg-emerald-100 text-emerald-700' },
  'In Progress': { cls: 'bg-blue-100 text-blue-700' },
  Overdue: { cls: 'bg-red-100 text-red-700' },
  Pending: { cls: 'bg-gray-100 text-gray-600' },
};

export const priorityConfig: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-gray-100 text-gray-500',
};

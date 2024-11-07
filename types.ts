export type Tasks = {
  id: string;
  name: string;
  labels: string;
  status: string;
  created_at: string;
  updated_at: string;
  priority: string;
  assignee: string;
};

export type TabsType = 'open' | 'closed' | 'inprogress';
export type LabelType = 'Going On' | 'Completed' | 'Update Pending';

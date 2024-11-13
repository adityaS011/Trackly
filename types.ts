export type Tasks = {
  id: string;
  name: string;
  labels: string;
  status: TabsType;
  created_at: string;
  updated_at: string;
  tasks: string[];
  priority: string;
  assignee: string;
};

export type TabsType = 'open' | 'closed' | 'inprogress';
export type LabelType = 'Going On' | 'Completed' | 'Update Pending';

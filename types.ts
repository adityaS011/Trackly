export type Tasks = {
  id: number;
  name: string;
  labels: string[];
  status: string;
  created_at: string;
  updated_at: string;
  priority: string;
};

export type TabsType = 'open' | 'closed' | 'inprogress';
export type LabelType = 'Going On' | 'Completed' | 'Update Pending';
export type LabelsType = LabelType[];

'use client';
import { Grid as GridComponent } from 'gridjs-react';
import { html, h, Config } from 'gridjs';
import { Tasks } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    open: 'background:#dbeafe;color:#1d4ed8',
    inprogress: 'background:#fef3c7;color:#b45309',
    completed: 'background:#d1fae5;color:#065f46',
    closed: 'background:#f3f4f6;color:#6b7280',
  };
  const style = map[s.toLowerCase()] ?? 'background:#f3f4f6;color:#6b7280';
  const label = s === 'inprogress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1);
  return html(`<span style="display:inline-flex;align-items:center;border-radius:9999px;padding:2px 10px;font-size:11px;font-weight:500;${style}">${label}</span>`);
};

const priorityBadge = (p: string) => {
  const map: Record<string, string> = {
    High: 'background:#fee2e2;color:#b91c1c',
    Medium: 'background:#fef9c3;color:#854d0e',
    Low: 'background:#dcfce7;color:#166534',
  };
  const style = map[p] ?? 'background:#f3f4f6;color:#6b7280';
  return html(`<span style="display:inline-flex;align-items:center;border-radius:9999px;padding:2px 10px;font-size:11px;font-weight:500;${style}">${p}</span>`);
};

const TaskTable = ({
  tasksData,
  loading,
  addTask,
  handleEditClick,
}: {
  tasksData: Tasks[];
  loading: boolean;
  addTask: () => void;
  handleEditClick: (id: string, index?: number) => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (filterValue: string, filterOption: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (!filterValue) {
      currentParams.delete(filterValue, filterOption);
    } else {
      currentParams.set(filterValue, filterOption);
    }
    router.replace(`${window.location.pathname}?${currentParams.toString()}`);
  };
  const gridKey = tasksData.map((t) => t.id + t.updated_at).join('|');

  const columns: Config['columns'] = [
    { 
      id: 'id', 
      name: 'ID', 
      width: '100px', 
      formatter: (c) => `TSK-${String(c).substring(0, 4).toUpperCase()}`,
      sort: false
    },
    { id: 'name', name: 'Task' },
    { 
      id: 'status', 
      name: 'Status', 
      width: '120px', 
      formatter: (c) => statusBadge(String(c)) 
    },
    { id: 'labels', name: 'Label', width: '140px' },
    { 
      id: 'created_at', 
      name: 'Created', 
      width: '110px', 
      formatter: (c) => new Date(String(c)).toLocaleDateString() 
    },
    { 
      id: 'updated_at', 
      name: 'Updated', 
      width: '110px', 
      formatter: (c) => new Date(String(c)).toLocaleDateString() 
    },
    { 
      id: 'priority', 
      name: 'Priority', 
      width: '100px', 
      formatter: (c) => priorityBadge(String(c)) 
    },
    { id: 'assignee', name: 'Assignee', width: '110px' },
    {
      name: 'Edit',
      width: '70px',
      sort: false,
      formatter: (_c, row) =>
        h('button', {
          className: 'gridjs-edit-btn',
          onClick: () => handleEditClick(String(row.cells[0].data)),
        }, '✏️'),
    },
  ];

  const data = tasksData.map((t) => [t.id, t.name, t.status, t.labels, t.created_at, t.updated_at, t.priority, t.assignee]);

  if (loading) {
    return (
      <div className='flex flex-col gap-3 p-6 w-full animate-pulse'>
        <div className='flex justify-between items-center mb-2'>
          <div className='h-5 w-36 rounded bg-gray-200' />
          <div className='h-8 w-28 rounded-lg bg-gray-200' />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='h-10 rounded-lg bg-gray-100 w-full' />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full px-4 py-3 gap-3'>
      <div className='flex justify-between items-center px-2'>
        <h2 className='font-semibold text-gray-800 text-sm'>Task List</h2>
        <div className='flex items-center gap-3'>
          <div className='gridjs-search'>
            <input type='search' placeholder='Type a keyword...' className='gridjs-search-input' />
          </div>
          <select
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className='px-4 py-2 font-medium border border-blue-200 focus:outline-none bg-white shadow-sm rounded-lg text-sm'
          >
            <option value=''>Select Priority</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
          <button onClick={addTask} className='flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm'>
            + New Task
          </button>
        </div>
      </div>
      <div className=' pt-2 px-2 overflow-auto flex-1'>
        <GridComponent
          key={gridKey}
          columns={columns}
          data={data}
          pagination={{ limit: 15, summary: true }}
          className={{
            container: 'gridjs-custom',
            table: 'w-full',
            thead: 'gridjs-thead-custom',
            th: 'gridjs-th-custom',
            td: 'gridjs-td-custom',
          }}
        />
      </div>
    </div>
  );
};

export default TaskTable;

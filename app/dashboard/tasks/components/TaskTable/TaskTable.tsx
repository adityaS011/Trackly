import { Tasks } from '@/types';

const TaskTable = ({
  tasksData,
  loading,
  addTask,
  handleEditClick,
  selectedRowIndex,
  onSort,
  sortConfig,
}: {
  tasksData: Tasks[];
  loading: boolean;
  addTask: () => void;
  selectedRowIndex: number;
  handleEditClick: (id: string) => void;
  onSort: (key: 'created_at' | 'updated_at') => void;
  sortConfig: { key: 'created_at' | 'updated_at'; direction: 'asc' | 'desc' };
}) => {
  const getArrow = (key: 'created_at' | 'updated_at') => {
    if (sortConfig.key !== key) return '↑';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className='flex flex-col mx-auto p-4 w-full h-full'>
        <div className='flex flex-row justify-between px-6 items-center h-8 mb-4'>
          <h2 className='font-medium font-serif text-lg bg-gray-300 rounded-md w-1/4 h-6 animate-pulse'></h2>
          <div className='p-2 w-24 bg-gray-300 rounded-lg animate-pulse'></div>
        </div>
        <div className='border shadow-md overflow-auto'>
          <div className='bg-blue-600 text-white font-mono flex flex-row font-medium border uppercase p-2  gap-4'>
            {[
              'Id',
              'Name',
              'Status',
              'Labels',
              'Created At',
              'Updated At',
              'Priority',
              'Assignee',
            ].map((header) => (
              <div key={header} className='w-full text-center'>
                {header}
              </div>
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='flex bg-gray-100 flex-row border p-2 gap-4 animate-pulse'
            >
              <div className='w-24 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-80 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-28 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-32 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-36 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-36 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-24 h-8 bg-gray-300 rounded-md'></div>
              <div className='w-24 h-8 bg-gray-300 rounded-md'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!tasksData) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div>Oops! Unable to fetch data</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-auto p-4 w-full h-full pb-12'>
      <div className='flex flex-row justify-between px-6 items-center'>
        <h2 className=' font-medium font-serif text-lg '>Open Task List</h2>
        <button
          onClick={addTask}
          className='p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 font-medium'
        >
          + Add new Task
        </button>
      </div>
      <div className='border shadow-md my-4 overflow-auto h-full mb-10'>
        <div>
          <div className='bg-blue-600 text-white font-mono flex flex-row font-medium border uppercase p-2 gap-4'>
            <div className='w-24 text-center'>Id</div>
            <div className='w-80 '>Name</div>
            <div className='w-28 '>Status</div>
            <div className='w-32 text-center'>Labels</div>
            <div
              className='w-36 text-center selection:bg-transparent cursor-pointer'
              onClick={() => onSort('created_at')}
            >
              Created At {getArrow('created_at')}
            </div>
            <div
              className='w-36 text-center selection:bg-transparent cursor-pointer'
              onClick={() => onSort('updated_at')}
            >
              Updated At {getArrow('updated_at')}
            </div>
            <div className='text-left w-24'>Priority</div>
            <div className='text-left w-24'>Assignee</div>
          </div>
        </div>

        <div>
          {tasksData.map((task, index) => (
            <div
              key={task.id}
              className={`flex bg-white flex-row hover:bg-slate-100 border p-2 gap-4 ${
                selectedRowIndex === index ? 'bg-[#dae0ff]' : ''
              }`}
              onClick={() => handleEditClick(task.id)}
            >
              <div className='w-24 text-center'>{`TSK${task.id
                .toString()
                .substring(0, 4)
                .toUpperCase()}`}</div>
              <div className='w-80'>{task.name}</div>
              <div className='w-28'>{task.status}</div>
              <div className='text-center w-32'>{task.labels}</div>
              <div className='text-center w-36'>
                {new Date(task.created_at).toLocaleDateString()}
              </div>
              <div className='text-center w-36'>
                {new Date(task.updated_at).toLocaleDateString()}
              </div>
              <div className='text-left w-24'>{task.priority}</div>
              <div className='text-left w-24'>{task.assignee}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;

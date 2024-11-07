import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const FilterTuples = [
  {
    label: 'Priority',
    value: 'priority',
    options: ['High', 'Medium', 'Low'],
  },
];

const TaskFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterAdditionToUrl = (
    filterValue: string,
    filterOption: string
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (!filterValue) {
      currentParams.delete(filterValue, filterOption);
    } else {
      currentParams.set(filterValue, filterOption);
    }
    router.replace(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <div className='w-fit flex flex-row items-center px-4'>
      {FilterTuples.map((item, index) => {
        return (
          <div key={index} className=''>
            <select
              onChange={(e) =>
                handleFilterAdditionToUrl(item.value, e.target.value)
              }
              className='px-4 py-2 font-medium border flex flex-row items-center gap-4 border-blue-200 w-full focus:outline-none bg-white shadow-sm rounded-lg text-sm'
            >
              <option value=''>Select {item.label}</option>
              {item.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default TaskFilters;

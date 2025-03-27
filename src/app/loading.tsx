import React from "react";

const loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
      <p className='mt-4 text-lg text-gray-700 dark:text-gray-300'>
        Loading...
      </p>
    </div>
  );
};

export default loading;

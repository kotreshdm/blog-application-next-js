import React from "react";

export default function Loading() {
  return (
    <div className='flex justify-center items-center padding-1'>
      <div className='w-7 h-7 border-1  border-gray-300 border-t-black rounded-full animate-spin'></div>
    </div>
  );
}

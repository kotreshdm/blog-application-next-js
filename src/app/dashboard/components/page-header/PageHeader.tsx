"use client";
import React from "react";

type PageheaderProps = {
  onRefresh?: () => void;
  onAdd?: () => void;
  title: string;
};

export default function Pageheader({
  onRefresh,
  onAdd,
  title,
}: PageheaderProps) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='flex gap-2'>
        <button
          onClick={onRefresh}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Refresh
        </button>
        {onAdd && (
          <button
            onClick={onAdd}
            className='bg-green-500 text-white px-4 py-2 rounded'
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

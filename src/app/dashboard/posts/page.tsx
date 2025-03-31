"use client";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const POSTS_PER_PAGE = 20;
export default function Posts() {
  const [page] = useState(1);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/dashboard/posts?page=${page}&limit=${POSTS_PER_PAGE}`
      );
      return response.data;
    },
  });
  console.log("Data loaded.....", data);

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <button
          onClick={() => refetch()}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'
        >
          Refresh
        </button>
      </div>

      {isLoading && <p className='text-center'>Loading data...</p>}
      {isError && <p className='text-center'>Failed to fetch data.</p>}

      {data && <div className='flex gap-6 justify-center'>Data loaded</div>}
    </div>
  );
}

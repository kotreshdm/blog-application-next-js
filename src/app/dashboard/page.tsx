"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/dashboard/dashboard-data");
      return response.data;
    },
    enabled: true,
  });

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

      {data && (
        <div className='flex gap-6 justify-center'>
          <Link href='/dashboard/posts'>
            <div className='flex-1 p-6 border rounded-lg shadow-md text-center'>
              <h2 className='text-lg font-semibold'>Total Posts</h2>
              <p className='text-3xl font-bold text-blue-600'>{data.posts}</p>
            </div>
          </Link>
          <Link href='/dashboard/categories'>
            <div className='flex-1 p-6  border rounded-lg shadow-md text-center'>
              <h2 className='text-lg font-semibold'>Total Categories</h2>
              <p className='text-3xl font-bold text-green-600'>
                {data.categories}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

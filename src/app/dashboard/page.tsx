"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import Pageheader from "./components/page-header/Pageheader";
import Loading from "./components/loading/Loading";
import ErrorPage from "./components/error-page/ErrorPage";
import { useDashboardContext } from "@/utils/context/DashboardContext";

export default function DashboardPage() {
  const ctx = useDashboardContext();

  console.log(ctx);
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
      <Pageheader refresh={refetch} title='Dashboard' />
      {isLoading && <Loading />}
      {isError && <ErrorPage />}

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

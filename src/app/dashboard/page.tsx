"use client";
import Link from "next/link";
import Loading from "./components/loading/Loading";
import { useDashboardContext } from "@/utils/context/DashboardContext";
import Pageheader from "./components/page-header/PageHeader";

export default function DashboardPage() {
  const { postState, categoryState, fetchCategories, fetchPosts } =
    useDashboardContext();

  const refreshFunction = () => {
    fetchPosts();
    fetchCategories();
  };

  return (
    <div className='p-6'>
      <Pageheader title='Dashboard' onRefresh={refreshFunction} />
      <div className='flex gap-6 justify-center'>
        <Link href='/dashboard/posts'>
          <div className='flex-1 p-6 border rounded-lg shadow-md text-center'>
            <h2 className='text-lg font-semibold'>Total Posts</h2>
            {postState.loading ? (
              <Loading />
            ) : (
              <p className='text-3xl font-bold text-blue-600'>
                {postState.posts.length}
              </p>
            )}
          </div>
        </Link>
        <Link href='/dashboard/categories'>
          <div className='flex-1 p-6  border rounded-lg shadow-md text-center'>
            <h2 className='text-lg font-semibold'>Total Categories</h2>
            {categoryState.loading ? (
              <Loading />
            ) : (
              <p className='text-3xl font-bold text-green-600'>
                {categoryState.categories.length}
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Pageheader from "../components/page-header/PageHeader";
import { useDashboardContext } from "@/utils/context/DashboardContext";

export default function page() {
  const { postState, fetchPosts } = useDashboardContext();
  return (
    <div className='p-6'>
      <Pageheader title='Posts' onRefresh={fetchPosts} />
    </div>
  );
}

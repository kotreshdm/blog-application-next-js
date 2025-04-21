"use client";
import React from "react";
import Pageheader from "../components/page-header/PageHeader";

export default function page() {
  return (
    <div className='p-6'>
      <Pageheader title='Posts' onRefresh={() => {}} />
    </div>
  );
}

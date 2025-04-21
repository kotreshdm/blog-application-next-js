import React from "react";
import Loading from "../loading/Loading";

export default function LoadingModal() {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md shadow-lg max-w-md relative'>
        <Loading />
      </div>
    </div>
  );
}

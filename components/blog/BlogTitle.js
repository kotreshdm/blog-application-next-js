"use client";
import { useBlog } from "@/context/blog";

export default function BlogTitle({ onNextStep }) {
  // context
  const { title, setTitle } = useBlog();

  return (
    <>
      <div className='col-lg-6 offset-lg-3'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control p-3 mb-5'
          placeholder='Blog title'
        />
      </div>

      <div className='d-flex justify-content-center my-4'>
        <button
          className='btn btn-primary p-3 col-6 mb-5'
          onClick={onNextStep}
          disabled={!title?.trim() || title.length < 11}>
          Next
        </button>
      </div>
    </>
  );
}

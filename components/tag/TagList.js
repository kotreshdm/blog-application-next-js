"use client";
import { useEffect } from "react";
import { useBlog } from "@/context/blog";
import toast from "react-hot-toast";
export default function TagList() {
  const {
    tagList,
    tags,
    searchTerm,
    selectedTags,
    setSelectedTags,
    tagDelete,
  } = useBlog();

  useEffect(() => {
    tagList();
  }, []);

  const handleTagSelect = () => {};
  return (
    <div className='row d-flex justify-content-center align-items-center'>
      {selectedTags?.length > 0 && (
        <p className='text-secondary'>Selected tags</p>
      )}
      <div>
        {selectedTags?.map((tag) => (
          <button
            key={tag?._id}
            className='btn btn-lg btn-outline-success m-1'
            onClick={() => handleTagRemove(tag)}>
            {tag?.name}
          </button>
        ))}
      </div>
      <div className='col custom-scrollbar'>
        <p className='text-secondary mt-3'>Tags</p>
        {tags?.map((tag) => (
          <span key={tag?._id}>
            <button
              className='btn btn-lg btn-outline-secondary m-1'
              onClick={() => handleTagSelect(tag)}>
              {tag?.name}
            </button>

            {/* {tag?.postedBy === data?.user?._id && (
              <button
                onClick={() => tagDelete(tag?._id)}
                className='btn btn-lg btn-outline-danger me-4'>
                X
              </button>
            )} */}
          </span>
        ))}
      </div>
    </div>
  );
}

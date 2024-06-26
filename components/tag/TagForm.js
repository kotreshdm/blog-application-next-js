"use client";
import { useBlog } from "@/context/blog";
import TagList from "@/components/tag/TagList";

export default function TagForm() {
  const {
    tagName,
    setTagName,
    tags,
    setTags,
    tagCreate,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
  } = useBlog();
  return (
    <>
      <div className='row mt-3 mb-5'>
        <div className='col-lg-6'>
          <div className='col-lg-6'>
            <form onSubmit={tagCreate}>
              <input
                type='text'
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className='form-control p-5'
                placeholder='Create tag'
              />
            </form>
          </div>
        </div>
      </div>
      <TagList />
    </>
  );
}

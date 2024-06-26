import TagForm from "@/components/tag/TagForm";

import { useBlog } from "@/context/blog";

export default function BlogTags({ onNextStep, onPrevStep }) {
  // context
  const { selectedTags } = useBlog();

  return (
    <div>
      <TagForm />
      <div className='d-flex justify-content-center my-4'>
        <button
          className='btn btn-outline-primary p-3 col-6 mb-5 me-1'
          onClick={onPrevStep}>
          Previous
        </button>
        <button
          className='btn btn-outline-primary p-3 col-6 mb-5 ms-1'
          onClick={onNextStep}
          disabled={selectedTags?.length < 1}>
          Next
        </button>
      </div>
    </div>
  );
}

"use client";
import { useBlog } from "@/context/blog";
import BlogTitle from "@/components/blog/BlogTitle";

export default function BlogCreatePage() {
  const {
    title,
    markdown,
    selectedTags,
    featuredImage,
    step,
    setStep,
    current,
    handleNextStep,
    handlePrevStep,
  } = useBlog();
  return (
    <>
      <div className='container my-5'>
        <div className='d-flex justify-content-between lead pointer'>
          <div onClick={() => setStep(1)}>
            {current(1, title?.trim().length > 10)} Blog Title
          </div>
          <div onClick={() => setStep(2)}>
            {current(2, markdown?.trim().length > 60)} Blog Content
          </div>
          <div onClick={() => setStep(3)}>
            {current(3, selectedTags?.length > 0)} Tags
          </div>
          <div onClick={() => setStep(4)}>
            {current(4, featuredImage)} Featured Image
          </div>
          <div onClick={() => setStep(5)}>{current(5)} Review and Submit</div>
        </div>
      </div>
      {step === 1 && <BlogTitle onNextStep={handleNextStep} />}
      {step}
    </>
  );
}

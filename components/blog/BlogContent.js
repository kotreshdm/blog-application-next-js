"use client";
// import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
// import { imageUpload } from "@/utils/imageUpload";
import { useBlog } from "@/context/blog";
import md from "@/utils/md";

export default function BlogContent({ onNextStep, onPrevStep }) {
  // context
  const { markdown, setMarkdown } = useBlog();
  return (
    <div className={"container"}>
      <MdEditor
        value={markdown}
        style={{ height: "80vh" }}
        onChange={({ text }) => setMarkdown(text)}
        renderHTML={(text) => md.render(text)}
        // onImageUpload={(file) => imageUpload(file)}
      />
      <div className='d-flex justify-content-center my-4'>
        <button
          className='btn btn-outline-primary p-3 col-6 me-1'
          onClick={onPrevStep}>
          Previous
        </button>
        <button
          className='btn btn-outline-primary p-3 col-6 ms-1'
          onClick={onNextStep}
          disabled={!markdown?.trim()}>
          Next
        </button>
      </div>
    </div>
  );
}

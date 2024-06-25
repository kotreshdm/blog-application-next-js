"use client";
import { createContext, useContext, useState, useEffect } from "react";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  // state
  const [title, setTitle] = useState();
  const [markdown, setMarkdown] = useState("");
  // multi step form
  const [step, setStep] = useState(1);
  // tags
  const [selectedTags, setSelectedTags] = useState([]);
  // featured image
  const [featuredImage, setFeaturedImage] = useState("");
  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);
  const current = (n, condition = true) =>
    step >= n && condition ? "✅" : null;

  return (
    <BlogContext.Provider
      value={{
        title,
        setTitle,
        markdown,
        setMarkdown,
        selectedTags,
        setSelectedTags,
        featuredImage,
        setFeaturedImage,
        handleNextStep,
        handlePrevStep,
        step,
        setStep,
        current,
      }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);

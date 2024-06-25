"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/context/theme";
import editorDarkCss from "@/utils/editorDarkCss";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const { theme } = useTheme();
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

  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.classList.add("editor-dark-theme"); // add a class for identification
    customStyle.innerHTML = editorDarkCss;

    const existingStyle = document.querySelector(".editor-dark-theme");
    if (theme === "dark") {
      if (!existingStyle) {
        document.head.appendChild(customStyle);
      }
    } else {
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    }
  }, [theme]);

  useEffect(() => {
    // load the content from local storage on component mount
    const savedTitle = localStorage.getItem("savedTitle");
    const savedMarkdown = localStorage.getItem("savedMarkdown");

    if (savedTitle && savedMarkdown) {
      setTitle(savedTitle);
      setMarkdown(savedMarkdown);
    }
  }, []);

  useEffect(() => {
    // save the content to local storage whenever it changes
    localStorage.setItem("savedTitle", title);
    localStorage.setItem("savedMarkdown", markdown);
  }, [title, markdown]);

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

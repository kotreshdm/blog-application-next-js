"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import Pageheader from "../../components/page-header/PageHeader";
import { useDashboardContext } from "@/utils/context/DashboardContext";
import InputField from "../../components/form/input/InputField";
// import SelectField from "../../components/form/input/SelectField";
import axios from "axios";
import SelectField from "../../components/form/input/SelectField";

interface EditPostProps {
  params: Promise<{ id: string }>;
}

const initialPostState = {
  name: "",
  shortDescription: "",
  category: "",
  seoDescription: "",
  seoKeyword: "",
  description: "",
  image: "",
  blogStatus: "",
};

export default function EditPost({ params }: EditPostProps) {
  const { id } = use(params);
  const [editingPost, setEditingPost] = useState(initialPostState);
  const [inputError, setInputError] = useState(initialPostState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { categoryState } = useDashboardContext();

  async function getPost(id: string) {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`/api/dashboard/posts/id`, { id });
      console.log(response);
      setEditingPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      setEditingPost(initialPostState);
      setError("Failed to fetch post data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost(id);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputError((prev) => ({ ...prev, [name]: "" }));
    setEditingPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setEditingPost((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error messages

    try {
      const response = await axios.put(`/api/dashboard/posts`, editingPost);
      console.log("response", response);
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios error
        if (err.response) {
          // Server responded with a status other than 2xx
          const serverMessage =
            err.response.data?.error ||
            "An error occurred while updating the post.";
          setError(serverMessage);
          if (serverMessage.includes("name")) {
            setInputError({ ...inputError, name: serverMessage });
          }
          if (serverMessage.includes("category")) {
            setInputError({ ...inputError, category: serverMessage });
          }
        } else if (err.request) {
          // Request was made but no response received
          setError(
            "No response received from the server. Please check your network connection."
          );
        } else {
          // Something happened in setting up the request
          setError(`Request error: ${err.message}`);
        }
      } else {
        // Non-Axios error
        setError("An unexpected error occurred.");
      }
      console.error("Error updating post:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    //router.push("/dashboard/posts"); // or wherever your post list is
  };

  if (loading) {
    return (
      <div className='p-6'>
        <Pageheader title='Edit Post' />
        <div>Loading post data...</div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <Pageheader title='Edit Post' />
      <form
        className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'
        onSubmit={handleSubmit}
      >
        {/* Post Name */}
        <div className='flex flex-col'>
          <InputField
            value={editingPost.name ?? ""}
            onChange={handleChange}
            id='post-name'
            name='name'
            required
            label='Post Name'
            error={inputError.name}
          />
        </div>
        <div className='flex flex-col'>
          <SelectField
            label='Category'
            id='post-category'
            error={editingPost.category}
            options={categoryState.categories}
            selectedCategory={editingPost.category ?? ""}
            handleChange={handleSelectChange}
          />
        </div>
        {/* Short Description */}
        <div className='flex flex-col'>
          <InputField
            label={" Short Description:"}
            value={editingPost.shortDescription ?? ""}
            onChange={handleChange}
            id='post-shortDescription'
            name='shortDescription'
            required
            error={inputError.shortDescription}
          />
        </div>
        <div className='flex flex-col'>
          <InputField
            value={editingPost.seoDescription ?? ""}
            onChange={handleChange}
            id='post-seoDescription'
            name='seoDescription'
            label={"Description:"}
            required
            error={inputError.seoDescription}
          />
        </div>

        <div className='flex flex-col'>
          <InputField
            label={" Seo Keyword:"}
            value={editingPost.seoKeyword ?? ""}
            onChange={handleChange}
            id='post-seoKeyword'
            name='seoKeyword'
            required
            error={inputError.seoKeyword}
          />
        </div>

        {/* Description */}
        <div className='flex flex-col'>
          <InputField
            label={" Description"}
            value={editingPost.description ?? ""}
            onChange={handleChange}
            id='post-description'
            name='description'
            required
            error={inputError.description}
          />
        </div>

        {/* Image */}
        <div className='flex flex-col'>
          <InputField
            value={editingPost.image ?? ""}
            onChange={handleChange}
            id='post-image'
            name='image'
            required
            label={"Image"}
            error={inputError.image}
          />
        </div>

        {/* Blog Status */}
        <div className='flex flex-col'>
          <InputField
            value={editingPost.blogStatus ?? ""}
            onChange={handleChange}
            id='post-status'
            name='status'
            required
            label={"Status"}
            error={inputError.blogStatus}
          />
        </div>
        {error && <p>{error}</p>}
        {/* Action Buttons */}
        <div className='col-span-1 md:col-span-2 flex gap-4 justify-end mt-6'>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded'
          >
            Submit
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded'
          >
            Back to posts
          </button>
        </div>
      </form>
    </div>
  );
}

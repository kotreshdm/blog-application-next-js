"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import Pageheader from "../../components/page-header/PageHeader";
// import { useDashboardContext } from "@/utils/context/DashboardContext";
import InputField from "../../components/form/input/InputField";
// import SelectField from "../../components/form/input/SelectField";
import axios from "axios";

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
  // const { categoryState, fetchPosts } = useDashboardContext();

  async function getPost(id: string) {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(`/api/dashboard/posts/${id}`);
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
    setInputError(initialPostState);
    setEditingPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSelectChange = (value: string) => {
  //   setEditingPost((prev) => ({
  //     ...prev,
  //     category: value,
  //   }));
  // };

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
            err.response.data?.message ||
            "An error occurred while updating the post.";
          setError(serverMessage);
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
    console.log("Cancelled editing");
    // maybe reset form or redirect
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
          <label htmlFor='post-name' className='mb-1 font-medium text-gray-700'>
            Post Name:
          </label>
          <InputField
            value={editingPost.name ?? ""}
            onChange={handleChange}
            id='post-name'
            name='name'
            required
            error={inputError.name}
          />
        </div>

        {/* Short Description */}
        <div className='flex flex-col'>
          <label
            htmlFor='post-shortDescription'
            className='mb-1 font-medium text-gray-700'
          >
            Short Description:
          </label>
          <InputField
            value={editingPost.shortDescription ?? ""}
            onChange={handleChange}
            id='post-shortDescription'
            name='shortDescription'
            required
            error={inputError.shortDescription}
          />
        </div>

        {/* Seo Description */}
        <div className='flex flex-col'>
          <label
            htmlFor='post-seoDescription'
            className='mb-1 font-medium text-gray-700'
          >
            Seo Description:
          </label>
          <InputField
            value={editingPost.seoDescription ?? ""}
            onChange={handleChange}
            id='post-seoDescription'
            name='seoDescription'
            required
            error={inputError.seoDescription}
          />
        </div>

        {/* Seo Keyword */}
        <div className='flex flex-col'>
          <label
            htmlFor='post-seoKeyword'
            className='mb-1 font-medium text-gray-700'
          >
            Seo Keyword:
          </label>
          <InputField
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
          <label
            htmlFor='post-description'
            className='mb-1 font-medium text-gray-700'
          >
            Description:
          </label>
          <InputField
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
          <label
            htmlFor='post-image'
            className='mb-1 font-medium text-gray-700'
          >
            Image:
          </label>
          <InputField
            value={editingPost.image ?? ""}
            onChange={handleChange}
            id='post-image'
            name='image'
            required
            error={inputError.image}
          />
        </div>

        {/* Blog Status */}
        <div className='flex flex-col'>
          <label
            htmlFor='post-blogStatus'
            className='mb-1 font-medium text-gray-700'
          >
            Blog Status:
          </label>
          <InputField
            value={editingPost.blogStatus ?? ""}
            onChange={handleChange}
            id='post-blogStatus'
            name='blogStatus'
            required
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

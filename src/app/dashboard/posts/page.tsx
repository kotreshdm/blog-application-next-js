"use client";
import React, { useEffect, useState } from "react";
import Pageheader from "../components/page-header/PageHeader";
import {
  PostType,
  useDashboardContext,
} from "@/utils/context/DashboardContext";
import Modal from "../components/modal/Modal";
import axios, { AxiosError } from "axios";
import LoadingModal from "../components/loading-modal/LoadingModal";
import { DateFormt } from "@/utils/formmat-data/FormatData";

const initialPostState: PostType = {
  _id: 0,
  id: 0,
  name: "",
  createdAt: "",
};

export default function PostsPage() {
  // ===== STATE =====
  const { postState, fetchPosts } = useDashboardContext();
  const [selectedPost, setSelectedPost] = useState(initialPostState);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== EFFECTS =====
  useEffect(() => {
    setError("");
  }, [modalType]);

  // ===== HANDLERS =====
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (modalType === "add") {
        await axios.post("/api/dashboard/posts", selectedPost);
      } else if (modalType === "edit") {
        await axios.put("/api/dashboard/posts", selectedPost);
      } else if (modalType === "delete") {
        await axios.delete("/api/dashboard/posts", {
          data: { id: selectedPost._id },
        });
      }

      setModalType(null);
      setSelectedPost(initialPostState);
      fetchPosts();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: "add" | "edit" | "delete", post?: PostType) => {
    setSelectedPost(post || initialPostState);
    setModalType(type);
  };

  const renderModal = () => {
    if (!modalType) return null;

    const titles = {
      add: "Add Post",
      edit: "Edit Post",
      delete: "Delete Post",
    };

    return (
      <Modal
        title={titles[modalType]}
        onClose={() => setModalType(null)}
        submitButtonText={
          modalType === "delete"
            ? "Delete Post"
            : modalType === "edit"
            ? "Update"
            : "Submit"
        }
        disabled={loading}
        onSubmit={handleSubmit}
      >
        <CategoryForm
          post={selectedPost}
          onChange={setSelectedPost}
          readOnly={modalType === "delete"}
          error={error}
          setError={setError}
        />
      </Modal>
    );
  };

  // ===== RETURN =====
  return (
    <div className='p-6'>
      <Pageheader
        title='Posts'
        onAdd={() => openModal("add")}
        onRefresh={fetchPosts}
      />

      {postState.error && <p className='text-red-600'>{postState.error}</p>}
      {!postState.loading && postState.posts.length === 0 && (
        <p>No Posts found.</p>
      )}

      {postState.posts.length > 0 && (
        <table className='min-w-full border-collapse border border-gray-200 mt-4'>
          <thead>
            <tr>
              <th className='border p-2'>ID</th>
              <th className='border p-2'>Name</th>
              <th className='border p-2'>Created At</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postState.posts.map((post) => (
              <tr key={post._id}>
                <td className='border p-2'>{post._id}</td>
                <td className='border p-2'>{post.name}</td>
                <td className='border p-2'>{DateFormt(post.createdAt)}</td>
                <td className='border p-2'>
                  <button
                    onClick={() => openModal("edit", post)}
                    className='bg-yellow-500 text-white px-2 py-1 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", post)}
                    className='bg-red-500 text-white px-2 py-1 rounded ml-2'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {postState.loading && <LoadingModal />}
      {renderModal()}
    </div>
  );
}

// ===== REUSABLE FORM COMPONENT =====
function CategoryForm({
  post,
  onChange,
  readOnly = false,
  error,
  setError,
}: {
  post: PostType;
  onChange: (c: PostType) => void;
  readOnly?: boolean;
  error: string;
  setError: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...post, name: e.target.value });
    setError(""); // clear the error on input change
  };
  return (
    <form className='flex flex-col gap-4'>
      <label htmlFor='category-name' className='text-gray-700'>
        Post Name:
      </label>
      <input
        value={post.name}
        onChange={handleChange}
        type='text'
        id='post-name'
        className='border border-gray-300 p-2 rounded text-black'
        required
        readOnly={readOnly}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  );
}

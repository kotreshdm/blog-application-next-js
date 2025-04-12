"use client";
import DisplayPost from "@/components/dashboard/posts/DisplayPost";
import Modal from "@/components/modal/Modal";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { log } from "console";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Posts {
  id: number;
  _id: number;
  name: string;
  createdAt: string;
}

export default function Posts() {
  const queryClient = useQueryClient();
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );

  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/dashboard/posts`);
      return response.data;
    },
  });

  // Add & Edit Mutation
  const mutation = useMutation({
    mutationFn: async (post: Partial<Posts>) => {
      if (modalType === "edit" && post.id) {
        console.log("Post data:", post, modalType);
        return axiosInstance.put(`/dashboard/posts/${post.id}`, post);
      } else {
        return axiosInstance.post(`/dashboard/posts`, post);
      }
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setModalType(null);
      setSelectedPost(null);
      if (modalType === "edit") {
        toast.success(response.data.message || `Post updated successfully!!! `);
      } else {
        toast.success(response.data.message || `Post created successfully!!! `);
      }
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.response.data.error || "Something went wrong!!! ");
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      return axiosInstance.delete(`/dashboard/posts/${id}`);
    },
    onSuccess: (response: any) => {
      setModalType(null);
      setSelectedPost(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(response.data.message || `Post deleted successfully!!! `);
    },
    onError: (error: any) => {
      console.error("Error:", error);
      toast.error(error.response.data.error || "Something went wrong!!! ");
    },
  });

  const handleEdit = (post: any) => {
    console.log("Edit post:", post);
    setModalType("edit");
    setSelectedPost(post);
  };
  const handleDelete = (post: any) => {
    setModalType("delete");
    setSelectedPost(post);
  };
  const handleAdd = () => {
    setModalType("add");
    setSelectedPost(null);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredData(data || []);
      return;
    }
    if (searchRef.current) {
      clearTimeout(searchRef?.current);
    }
    const debounceTimeout = setTimeout(() => {
      setFilteredData(
        data?.filter((post: any) =>
          post.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }, 400);
    return () => clearTimeout(debounceTimeout);
  }, [data, search]);
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div>
          <input
            type='text'
            placeholder='Search...'
            value={search}
            ref={searchRef}
            onChange={(e) => setSearch(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md'
          />
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={() => refetch()}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'
          >
            Refresh
          </button>
          <button
            onClick={handleAdd}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer'
          >
            Add New
          </button>
        </div>
      </div>

      {isLoading && <p className='text-center'>Loading data...</p>}
      {isError && (
        <p className='text-center'>
          Failed to fetch data. Please try again later.
        </p>
      )}

      {filteredData && filteredData.length === 0 && (
        <p className='text-center'>No data available.</p>
      )}
      {filteredData && filteredData.length > 0 && (
        <DisplayPost
          data={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {/* Add / Edit Modal */}
      {modalType === "add" || modalType === "edit" ? (
        <Modal onClose={() => setModalType(null)}>
          <h2 className='text-xl font-semibold text-gray-900'>
            {modalType === "edit" ? "Edit Category" : "Add New Category"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const psot: Partial<Posts> = {
                id: selectedPost?._id,
                name: formData.get("name") as string,
              };
              mutation.mutate(psot);
            }}
            className='mt-4'
          >
            <input
              type='text'
              name='name'
              defaultValue={selectedPost?.name || ""}
              placeholder='Category Name'
              className='w-full p-2 border border-gray-300 rounded  text-gray-900'
              required
            />
            <div className='mt-4 flex justify-end space-x-2'>
              <button
                type='button'
                onClick={() => setModalType(null)}
                className='px-4 py-2 bg-gray-400 text-white rounded-md'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-500 text-white rounded-md'
              >
                {modalType === "edit" ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {/* Delete Confirmation Modal */}
      {modalType === "delete" && selectedPost ? (
        <Modal onClose={() => setModalType(null)}>
          <h2 className='text-gray-900 text-xl font-semibold text-center'>
            Confirm Delete
          </h2>
          <p className='text-center text-gray-700'>
            Are you sure you want to delete &#34;{selectedPost.name}&#34;?
          </p>
          <div className='mt-4 flex justify-center space-x-2'>
            <button
              onClick={() => setModalType(null)}
              className='px-4 py-2 bg-gray-400 text-white rounded-md'
            >
              Cancel
            </button>
            <button
              onClick={() => deleteMutation.mutate(selectedPost?._id)}
              className='px-4 py-2 bg-red-500 text-white rounded-md'
            >
              Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/modal/Modal";
import toast from "react-hot-toast";
import Category from "@/models/Category";

interface Category {
  id: number;
  _id: number;
  name: string;
  createdAt: string;
}

type ModalType = "add" | "edit" | "delete" | null;

export default function Categories() {
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get<Category[]>(
        `/dashboard/categories`
      );
      return response.data;
    },
  });

  // Add & Edit Mutation
  const mutation = useMutation({
    mutationFn: async (category: Partial<Category>) => {
      if (modalType === "edit" && category.id) {
        return axiosInstance.put(
          `/dashboard/categories/${category.id}`,
          category
        );
      } else {
        return axiosInstance.post(`/dashboard/categories`, category);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(`Category created successfully!!! `);
      setModalType(null);
    },
    onError: (error: any) => {
      console.error("Error creating category:", error.response.data);
      toast.error(
        `Failed to create: ${
          error.response.data.message || "An unknown error occurred."
        }`
      );
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/dashboard/categories/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setModalType(null);
      toast.success(`${selectedCategory?.name} deleted successfully!`);
    },
    onError: (error: any) => {
      console.error("Error deleting category:", error);
      toast.error(
        `Failed to delete category: ${
          error.message || "An unknown error occurred."
        }`
      );
    },
  });

  function handleAdd() {
    setSelectedCategory(null);
    setModalType("add");
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);
    setModalType("edit");
  }

  function handleDelete(category: Category) {
    setSelectedCategory(category);
    setModalType("delete");
  }
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Categories</h1>
        <button
          onClick={handleAdd}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
        >
          Add New
        </button>
      </div>

      {isLoading && <p className='text-center'>Loading data...</p>}
      {isError && (
        <p className='text-center text-red-500'>Failed to fetch data.</p>
      )}

      {data && (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-200'>
            <thead>
              <tr className=''>
                <th className='border border-gray-300 px-4 py-2 text-left'>
                  SL No
                </th>
                <th className='border border-gray-300 px-4 py-2 text-left'>
                  Name
                </th>
                <th className='border border-gray-300 px-4 py-2 text-left'>
                  Created At
                </th>
                <th className='border border-gray-300 px-4 py-2 text-left'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((category, index) => (
                <tr key={category._id} className=''>
                  <td className='border border-gray-300 px-4 py-2'>
                    {index + 1}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {category.name}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className='border border-gray-300 px-4 py-2 space-x-2'>
                    <button
                      onClick={() => handleEdit(category)}
                      className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              const category: Partial<Category> = {
                id: selectedCategory?.id,
                name: formData.get("name") as string,
              };
              mutation.mutate(category);
            }}
            className='mt-4'
          >
            <input
              type='text'
              name='name'
              defaultValue={selectedCategory?.name || ""}
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
      {modalType === "delete" && selectedCategory ? (
        <Modal onClose={() => setModalType(null)}>
          <h2 className='text-gray-900 text-xl font-semibold text-center'>
            Confirm Delete
          </h2>
          <p className='text-center text-gray-700'>
            Are you sure you want to delete &#34;{selectedCategory.name}&#34;?
          </p>
          <div className='mt-4 flex justify-center space-x-2'>
            <button
              onClick={() => setModalType(null)}
              className='px-4 py-2 bg-gray-400 text-white rounded-md'
            >
              Cancel
            </button>
            <button
              onClick={() => deleteMutation.mutate(selectedCategory._id)}
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

"use client";
import React, { useEffect, useState } from "react";
import Pageheader from "../components/page-header/PageHeader";
import {
  CategoryType,
  useDashboardContext,
} from "@/utils/context/DashboardContext";
import Modal from "../components/modal/Modal";
import axios from "axios";
import LoadingModal from "../components/loading-modal/LoadingModal";

const initialCategoryState: CategoryType = {
  _id: 0,
  id: 0,
  name: "",
  createdAt: "",
};

export default function Page() {
  // ===== STATE =====
  const { categoryState, fetchCategories } = useDashboardContext();
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategoryState);
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
        await axios.post("/api/dashboard/categories", selectedCategory);
      } else if (modalType === "edit") {
        await axios.put("/api/dashboard/categories", selectedCategory);
      } else if (modalType === "delete") {
        await axios.delete("/api/dashboard/categories", {
          data: { id: selectedCategory._id },
        });
      }

      setModalType(null);
      setSelectedCategory(initialCategoryState);
      fetchCategories();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (
    type: "add" | "edit" | "delete",
    category?: CategoryType
  ) => {
    setSelectedCategory(category || initialCategoryState);
    setModalType(type);
  };

  const renderModal = () => {
    if (!modalType) return null;

    const titles = {
      add: "Add Category",
      edit: "Edit Category",
      delete: "Delete Category",
    };

    return (
      <Modal
        title={titles[modalType]}
        onClose={() => setModalType(null)}
        submitButtonText={
          modalType === "delete"
            ? "Delete Category"
            : modalType === "edit"
            ? "Update"
            : "Submit"
        }
        disabled={loading}
        onSubmit={handleSubmit}
      >
        <CategoryForm
          category={selectedCategory}
          onChange={setSelectedCategory}
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
        title='Categories'
        onAdd={() => openModal("add")}
        onRefresh={fetchCategories}
      />

      {categoryState.error && (
        <p className='text-red-600'>{categoryState.error}</p>
      )}
      {!categoryState.loading && categoryState.categories.length === 0 && (
        <p>No categories found.</p>
      )}

      {categoryState.categories.length > 0 && (
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
            {categoryState.categories.map((category) => (
              <tr key={category._id}>
                <td className='border p-2'>{category._id}</td>
                <td className='border p-2'>{category.name}</td>
                <td className='border p-2'>{category.createdAt}</td>
                <td className='border p-2'>
                  <button
                    onClick={() => openModal("edit", category)}
                    className='bg-yellow-500 text-white px-2 py-1 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", category)}
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

      {categoryState.loading && <LoadingModal />}
      {renderModal()}
    </div>
  );
}

// ===== REUSABLE FORM COMPONENT =====
function CategoryForm({
  category,
  onChange,
  readOnly = false,
  error,
  setError,
}: {
  category: CategoryType;
  onChange: (c: CategoryType) => void;
  readOnly?: boolean;
  error: string;
  setError: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...category, name: e.target.value });
    setError(""); // clear the error on input change
  };
  return (
    <form className='flex flex-col gap-4'>
      <label htmlFor='category-name' className='text-gray-700'>
        Category Name:
      </label>
      <input
        value={category.name}
        onChange={handleChange}
        type='text'
        id='category-name'
        className='border border-gray-300 p-2 rounded'
        required
        readOnly={readOnly}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  );
}

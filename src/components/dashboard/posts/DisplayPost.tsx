import React from "react";
interface Posts {
  id: number;
  _id: number;
  name: string;
  createdAt: string;
}
export default function DisplayPost({
  data,
  handleEdit,
  handleDelete,
}: {
  data: Posts[];
  handleEdit: (post: Posts) => void;
  handleDelete: (post: Posts) => void;
}) {
  return (
    <table className='table-auto w-full border-collapse border border-gray-300'>
      <thead>
        <tr>
          <th className='border border-gray-300 px-4 py-2'>ID</th>
          <th className='border border-gray-300 px-4 py-2'>Title</th>
          <th className='border border-gray-300 px-4 py-2'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((post: Posts, index: number) => (
          <tr key={post.name}>
            <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
            <td className='border border-gray-300 px-4 py-2'>{post.name}</td>
            <td className='border border-gray-300 px-4 py-2 space-x-2'>
              <button
                onClick={() => handleEdit(post)}
                className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post)}
                className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import React from "react";

const Category = (categories) =>
  categories?.categories?.length != 0 ? (
    <table className="w-full table-auto">
    <thead>
      <tr>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categories?.categories?.map((category) => (
        <tr key={category.id}>
          <td className="border px-4 py-2">{category.name}</td>
          <td className="border px-4 py-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  ): <div>There is no category</div>;

export default Category;

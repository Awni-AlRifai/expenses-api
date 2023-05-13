import React, { useState } from "react";

const Category = ({ categories }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleSaveClick = () => {
    // Save the updated category name to the server here
    setEditingCategory(null);
  };

  const handleCancelClick = () => {
    setEditingCategory(null);
    setNewCategoryName("");
  };

  return categories?.length !== 0 ? (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((category) => (
          <tr key={category.id}>
            <td className="border px-4 py-2">
              {editingCategory?.id === category.id ? (
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              ) : (
                category.name
              )}
            </td>
            <td className="border px-4 py-2 text-center">
              {editingCategory?.id === category.id ? (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
              )}
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2  rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>There is no category</div>
  );
};

export default Category;

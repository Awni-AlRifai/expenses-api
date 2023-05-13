import { useState } from "react";

function CategoryForm({ onAddCategory }) {
  const [name, setName] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
   
    setName("");
  }

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default CategoryForm;
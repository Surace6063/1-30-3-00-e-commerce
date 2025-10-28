

const AddCategoryForm = () => {
  return (
    <div className="bg-white shadow rounded-lg border border-slate-200 p-6 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Add Category</h2>
      </div>
      
      <form>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2" htmlFor="name">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter category name"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <button className="bg-slate-800 text-white rounded-md w-full py-2 cursor-pointer hover:bg-slate-700">Add</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
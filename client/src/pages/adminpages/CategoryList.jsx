import { Plus, Edit, Trash2 } from "lucide-react";
import { useCategories } from "../../api/fetchApi";

const CategoryList = () => {
  const {data,isLoading,isError,error} = useCategories()

  return (
    <div className="bg-white shadow rounded-lg border border-slate-200 p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Category List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-3 text-left text-slate-700">ID</th>
            <th className="px-6 py-3 text-left text-slate-700">Name</th>
            <th className="px-6 py-3 text-left text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {
           isLoading ? <tr>
            <td>loading...</td>
          </tr>:
          isError ? <tr>
            <td>{error.message}</td>
          </tr>:
          data.map((cat) => (
            <tr key={cat.id} className="hover:bg-slate-50">
              <td className="px-6 py-3 text-slate-700">{cat.id}</td>
              <td className="px-6 py-3 text-slate-700">{cat.name}</td>
              <td className="px-6 py-3 text-slate-700 flex items-center gap-3">
                <button className="text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="text-red-500 hover:text-red-800 flex items-center gap-1 cursor-pointer">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
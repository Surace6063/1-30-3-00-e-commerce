import { Plus, Edit, Trash2 } from "lucide-react";
import { useProducts } from "../../api/fetchApi";




const ProductList = () => {
  
  const {data,isLoading,isError,error} = useProducts()

  const handleDelete = (id) => {
    console.log("delete")
  };

  const handleEdit = (product) => {
    alert(`Edit Product: ${product.name}`);
  };

  return (
    <div className="bg-white shadow rounded-lg border border-slate-200 p-6 overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Product List</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-3 text-left text-slate-700">ID</th>
            <th className="px-6 py-3 text-left text-slate-700">Image</th>
            <th className="px-6 py-3 text-left text-slate-700">Name</th>
            <th className="px-6 py-3 text-left text-slate-700">Category</th>
            <th className="px-6 py-3 text-left text-slate-700">Price ($)</th>
            <th className="px-6 py-3 text-left text-slate-700">Quantity</th>
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
          data.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-6 py-3 text-slate-700">{p.id}</td>
              <td className="px-6 py-3 text-slate-700">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
              </td>
              <td className="px-6 py-3 text-slate-700">
                {p.name.length > 20 ? p.name.slice(0, 20) + "..." : p.name}
              </td>
              <td className="px-6 py-3 text-slate-700">{p.category}</td>
              <td className="px-6 py-3 text-slate-700">${p.price}</td>
              <td className="px-6 py-3 text-slate-700">{p.stock}</td>
              <td className="px-6 py-3 text-slate-700">
                <div className="flex gap-4 items-center">
                    <button
                  onClick={() => handleEdit(p)}
                  className="text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-3 text-center text-slate-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
import { useState } from "react";
import { ImagePlus } from "lucide-react";

const AddProductForm = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white shadow rounded-lg border border-slate-200 p-6 max-w-5xl w-full">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Add Product</h2>

      <form className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>

        {/* Category + Price */}
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <label className="block text-slate-700 mb-2 font-semibold">Category</label>
            <select className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700">
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Accessories</option>
              <option value="3">Gaming</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-slate-700 mb-2 font-semibold">Price ($)</label>
            <input
              type="number"
              placeholder="Enter product price"
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>

        {/* Image Upload */}
        <div className="relative border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-slate-500 transition">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <ImagePlus className="w-8 h-8" />
              <span>Click to upload or drag and drop</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Description</label>
          <textarea
            rows={4}
            placeholder="Enter product description"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-md w-full py-3 hover:bg-slate-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { categoryFormValidationSchema } from "../../utils/validate";
import { apiRequest } from "../../utils/apiRequest";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";



const UpdateCategoryForm = () => {
    const navigate = useNavigate()
    const location = useLocation()

  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
    resolver: yupResolver(categoryFormValidationSchema),
    defaultValues: {
        name: location?.state?.category?.name || ""
    }
  })

  const id = location?.state?.category?.id  // getting categroy id from uselocation hook

  const handleCategorySubmit = async (data) => {
    try {
      await apiRequest.put(`/categories/update/${id}/`, data)
      toast.success("Catgeory updated sucessfully.")
      navigate('/dashboard/categories/list')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="bg-white shadow rounded-lg border border-slate-200 p-6 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Update Category</h2>
      </div>
      
      <form onSubmit={handleSubmit(handleCategorySubmit)}>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2" htmlFor="name">
            Category Name
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder="Enter category name"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "submitting..." : "update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
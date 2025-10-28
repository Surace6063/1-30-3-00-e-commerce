import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerFormValidationSchema } from "../utils/validate";
import { apiRequest } from "../utils/apiRequest";
import toast from "react-hot-toast";

const Regsiter = () => {
  const {register,handleSubmit, formState:{errors,isSubmitting}} = useForm({
    resolver: yupResolver(registerFormValidationSchema),
  })

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try{
       await apiRequest.post("/auth/register/", data);
       toast.success("Registration successful!");
       navigate("/login");
    }catch(err){
      console.log(err);

      if(err.response && err.response.data){
        if( err.response.data.email){
          toast.error( err.response.data.email[0])
        }

         if( err.response.data.username){
          toast.error( err.response.data.username[0])
        }

      }
    }
  }

  return (
    <div className="max-w-xl mx-auto my-16 border border-slate-300 shadow p-10 rounded-md">
      <h1 className="text-3xl font-semibold text-slate-800 mb-4">Register</h1>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        {/* first name + last name */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="firstname">First Name</label>
            <input {...register("first_name")} className="w-full" type="text" id="firstname" placeholder="Enter your first name" />
            {errors.first_name && <p className="text-red-500 mt-1">{errors.first_name.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="lastname">Last Name</label>
            <input {...register("last_name")} className="w-full" type="text" id="lastname" placeholder="Enter your last name" />
            {errors.last_name && <p className="text-red-500 mt-1">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* email */}
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} className="w-full" type="email" id="email" placeholder="Enter your last email" />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

         {/* username */}
        <div>
          <label htmlFor="username">Username</label>
          <input {...register("username")} className="w-full" type="username" id="username" placeholder="Enter your username" />
          {errors.username && <p className="text-red-500 mt-1">{errors.username.message}</p>}
        </div>

        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} className="w-full" type="password" id="password" placeholder="Enter your password" />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* conform password */}
        <div>
          <label htmlFor="conform_password">Conform Password</label>
          <input  {...register("password2")} className="w-full" type="password" id="conform_password" placeholder="Enter your password again" />
          {errors.password2 && <p className="text-red-500 mt-1">{errors.password2.message}</p>}
        </div>

        <button disabled={isSubmitting} className="btn btn-primary w-full disabled:cursor-not-allowed">
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="space-x-1 mt-3">
          <span className="text-slate-700">Already have an account?</span> 
          <Link to="/login" className="text-teal-400 underline cursor-pointer">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Regsiter;

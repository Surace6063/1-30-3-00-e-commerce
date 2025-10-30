import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationSchema } from "../utils/validate";
import { apiRequest } from "../utils/apiRequest";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useUserStore } from "../zustand/userStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
  });

  const navigate = useNavigate();
  const {login} = useUserStore()

  const handleLogin = async (data) => {
    try {
      const response = await apiRequest.post("/auth/login/", data);
      console.log(response.data);
      login(response.data)
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data) {
        toast.error(err.response.data.detail);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-16 border border-slate-300 shadow p-10 rounded-md">
      <h1 className="text-3xl font-semibold text-slate-800 mb-4">Login</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {/* username */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            className="w-full"
            type="username"
            id="username"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            className="w-full"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
        type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full flex justify-center items-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <ThreeDots
              visible={true}
              width="20"
              height="20"
              color="#ffffff"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Login"
          )}
        </button>

        <p className="space-x-1 mt-3">
          <span className="text-slate-700">Dont have an account?</span>
          <Link
            to="/register"
            className="text-teal-400 underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;

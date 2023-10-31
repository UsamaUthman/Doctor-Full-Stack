import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(inputs);

      if (response.status === 200) {
        toast.success("Logged in successfully");
        setInputs({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <section className="flex items-center justify-center h-[80vh]">
      <div className="bg-white shadow-xl rounded-md p-12">
        <span className="text-[#639cff] text-4xl font-bold">
          Welcome back!😃
        </span>
        <div className="flex flex-col gap-4 items-center justify-between mt-4">
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text__para mt-0 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-300 rounded-md px-5 py-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text__para mt-0 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300 rounded-md px-5 py-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                disabled={true}
                type="checkbox"
                name="remember"
                id="remember"
                className="mr-2"
              />
              <label
                htmlFor="remember"
                className="text__para mt-0 font-semibold"
              >
                Remember me
              </label>
            </div>
            <Link to={"/forget-password"}>
              <p className="text__para mt-0 font-semibold">Forgot password?</p>
            </Link>
          </div>
          <button
            type="submit"
            className="bg-[#3D83FF] text-white rounded-md px-5 py-2"
          >
            Login
          </button>
          <Link to={"/register"}>
            <p className="text__para mt-0 font-semibold">
              Don't have an account?{" "}
              <span className="text-[#3D83FF]">Sign up</span>
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;

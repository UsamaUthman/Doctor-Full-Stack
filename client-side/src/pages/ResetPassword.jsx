import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const { email } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!password || !confirmPassword){
        toast.error("Please enter password and confirm password");
        return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match");
      return;
    }
    try {
      const response = await axios.post(
        "/api/v1/forgot/reset-password",
        {
          password,
        },
        {
          params: {
            email : email,
          },
          validateStatus : false
        }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully");
        localStorage.removeItem("email-otp");
        navigate("/login");
      } else {
        toast.error("Something went wrong please try again later");
        localStorage.removeItem("email-otp");
        navigate("/forget-password");
      }
    } catch (error) {
      toast.error("Something went wrong please try again later");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
        const response = await axios.get("/api/v1/forgot/create-session" , {
          validateStatus : false
        });


        if(response.status !== 201){
            toast.error("Something went wrong please try again later");
            navigate("/forget-password");
            if(localStorage.getItem("email-otp")){
                localStorage.removeItem("email-otp");
            }
        }
    }
    fetchSession();
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-h-[70vh] lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start"></div>
            <button
              type="submit"
              className="w-full text-white bg-primaryColor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;

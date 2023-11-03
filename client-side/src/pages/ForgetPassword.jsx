import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

import axios from "axios";

function ForgetPassword() {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    const response = await axios.post("/api/v1/forgot/generate-otp", null, {
      params: {
        email,
      },
    });

    if (response.status === 200) {
      toast.success("OTP sent successfully please check your email");
      localStorage.setItem("email-otp", email);
      navigate("/otp-verify");
    } else {
      toast.error("Something went wrong please try again later");
      navigate("/login");
    }
  };

  return (
    <section>
      <div className="container h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3 py-8 rounded-lg shadow-xl w-full">
          <h1 className="text-3xl font-semibold">Forget Password</h1>
          <p className="text-center mt-0 font-semibold">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-center text-[20px] mt-0 mb-4 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-gray-300 rounded-md px-5 py-2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#3D83FF] text-white rounded-md px-5 py-2 w-full"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;

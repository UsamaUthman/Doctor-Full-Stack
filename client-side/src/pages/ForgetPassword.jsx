import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    toast.success("Please check your email");

    // later we will add code to send email to user with backend api
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-3 py-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold">Forget Password</h1>
          <p className="text-center mt-0 font-semibold">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-center text-[20px] mt-0 mb-4 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-gray-300 rounded-md px-5 py-2"
                onChange={(e) => setEmail(e.target.value)}
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

      <ToastContainer />
    </section>
  );
}

export default ForgetPassword;

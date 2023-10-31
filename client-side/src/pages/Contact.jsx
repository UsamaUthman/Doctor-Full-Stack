import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineWarning } from "react-icons/ai";
import axios from "axios";

function Contact() {
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    message: "",
    subject: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!currentUser) {
      toast.error("You are not logged in");
      return;
    }

    if(currentUser?.role === "doctor") {
      toast.error("Hey Doc, You are not allowed to send message");
      return;
    }
    if (!inputs.message || !inputs.subject) {
      toast.error("Please fill out the form");
      return;
    }

    const response = await axios.post(
      "/api/v1/contact/send-email",
      {
        name: currentUser?.name,
        email: currentUser?.email,
        subject: inputs.subject,
        message: inputs.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Message sent successfully");
    } else {
      toast.error("Something went wrong");
      setInputs({
        message: "",
        subject: "",
      });
    }
  };
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-3 py-8 rounded-lg shadow-xl">
          {currentUser?.role === "doctor" &&(
            <h1 className="text-3xl text-red-500 font-semibold">
              👋Hey Doc, You are not allowed to send message
            </h1>
          )}
          <h1 className="text-3xl font-semibold">Contact Us</h1>
          <p className="text-center mt-0 font-semibold">
            Please fill out the form below to contact us
          </p>
          <div className="flex items-center justify-center flex-col md:flex-row md:items-start max-w-[450px]">
            <div>
              <AiOutlineWarning className="text-[#e1bb46] text-2xl block" />
            </div>
            <p className="text-[#e5bc43] font-semibold text-center">
              We are using your current user data to fill out the form if you
              are not logged in you can't send message
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div className="flex flex-col gap-5 md:flex-row-reverse">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-left text-[20px] mt-0 mb-2 font-semibold"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={(e) => {
                      setInputs({ ...inputs, subject: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-left text-[20px] mt-0 mb-2 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    disabled={true}
                    value={currentUser?.name || ""}
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={(e) => {
                      console.log(currentUser?.name);
                      e.target.value = currentUser?.name;
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-left text-[20px] mt-0 mb-2 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled={true}
                    value={currentUser?.email || ""}
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={(e) => {
                      e.target.value = currentUser?.email;
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-center text-[20px] mt-0 mb-4 font-semibold"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  className="border-2 border-gray-300 rounded-md px-5 py-2"
                  onChange={(e) => {
                    setInputs({ ...inputs, message: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={currentUser ? false : true}
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

export default Contact;

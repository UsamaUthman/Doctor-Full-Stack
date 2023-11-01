import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function OtpVerify() {
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // before join we need to check if all the inputs are filled
    if (otp.includes("")) {
      toast.error("Please enter OTP");
      return;
    }
    const enteredOtp = otp.join(""); // Combine OTP digits
    if (!enteredOtp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      const response = await axios.post("/api/v1/forgot/verify-otp", null, {
        params: {
          email,
          code: enteredOtp,
        },
        validateStatus: false,
      });
      if (response.status === 200) {
        toast.success(
          "OTP verified successfully now you can reset your password"
        );
        navigate("/reset-password");
      } else {
        toast.error(response.data.message);
        localStorage.removeItem("email-otp");
        navigate("/forget-password");
      }
    } catch (error) {
      toast.error("Something went wrong please try again later");
    }
  };

  const handleInputChange = (index, e) => {
    const input = e.target;
    const nextIndex = index + 1;
    if (input.value === "") {
      // Clear the input if it's empty
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = "";
        return updatedOtp;
      });
      // Move focus to the previous input
      if (inputRefs[index - 1] && inputRefs[index - 1].current) {
        inputRefs[index - 1].current.focus();
      }
    } else if (e.nativeEvent.inputType === "insertFromPaste") {
      // Paste event, get the pasted value and set each input's value
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = input.value[0];
        return updatedOtp;
      });
      if (inputRefs[nextIndex] && inputRefs[nextIndex].current) {
        inputRefs[nextIndex].current.focus();
      }
    } else if (index < otp.length) {
      // make all inputs take a one digit
      if (input.value.length > 1) {
        input.value = input.value[0];
      }

      // Update the input value and move to the next input
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = input.value;
        return updatedOtp;
      });

      if (nextIndex < otp.length) {
        // Move to the next input
        if (inputRefs[nextIndex] && inputRefs[nextIndex].current) {
          inputRefs[nextIndex].current.focus();
        }
      }
    }
  };

  const hnadleResendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      navigate("/forget-password");
      return;
    }
    const response = await axios.post("/api/v1/forgot/generate-otp", null, {
      params: {
        email,
      },
      validateStatus: false,
    });


    if (response.status === 200) {
      toast.success("OTP sent again successfully please check your email");
    } else {
      toast.error("Something went wrong please try again later");
      navigate("/forget-password");
    }
  };

  // 5 minutes timer
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  if(email){
    
  }

  useEffect(() => {
    if(!email){
      navigate("/forget-password");
      return;
    }
    const countdownInterval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        // Timer has reached zero, you can trigger a resend action here
        clearInterval(countdownInterval);
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [minutes, seconds]);


  // if no email in local storage then redirect to forget password page


  return (
    <div className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-xl rounded-2xl">
        <div className="mx-auto flex w-full flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-row flex-wrap items-center justify-center gap-4 mx-auto max-w-lg">
                {inputRefs.map((ref, index) => (
                  <div className="w-16 h-16" key={index}>
                    <input
                      ref={ref}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name={`otp${index + 1}`}
                      id={`otp${index + 1}`}
                      value={otp[index]}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                ))}
                {/* 5 minutes timer */}
                <div className="flex flex-col items-center justify-center text-center text-sm font-medium text-gray-400">
                  <p>
                    Resend code in {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    Verify Account
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive code?</p>{" "}
                  <button
                    className="flex flex-row items-center text-blue-600"
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={hnadleResendOtp}
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;

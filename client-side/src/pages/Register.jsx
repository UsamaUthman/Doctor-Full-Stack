import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import registerImg from "../assets/images/signup.gif";
import avatar from "../assets/images/avatar-icon.png";
import { Link  , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [terms, setTerms] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "", // patient or doctor
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImgUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      toast.error("Please accept terms and conditions");
      return;
    }
    const res = await register(inputs, imgUrl);
    if (res.status === 201) {
      toast.success("Registered successfully");
      navigate("/login");
        setInputs({
          name: "",
          email: "",
          password: "",
          gender: "",
          role: "",
        });
    } else if (res.status === 400) {
      toast.error("Email already exists");
    }
  };
  return (
    <section className="px-2 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* img box */}
          <div className="hidden lg:flex items-center justify-center">
            <img
              src={registerImg}
              alt="register"
              className="w-full rounded-l-lg"
            />
          </div>

          {/* sign up form */}
          <div className="flex items-center justify-center lg:px-20">
            <div className="p-4 shadow-lg rounded-lg lg:w-full">
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-3xl font-semibold">Sign up</h1>
                <p className="text__para mt-0 font-semibold">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-[#3D83FF]">
                    Login
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text__para mt-0 font-semibold"
                  >
                    Full name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text__para mt-0 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text__para mt-0 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 border-gray-300 rounded-md px-5 py-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text__para mt-0 font-semibold">
                    Are you a:
                    <select
                      name="role"
                      className=" rounded-md px-3 py-1 outline-none"
                      onChange={(e) => {
                        const newRole = e.target.value; // Get the selected role from the event
                        setInputs({
                          ...inputs,
                          role: newRole, // Update the role in your state with the selected value
                        });
                      }}
                    >
                      <option value="">select</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>
                  <label className="text__para mt-0 font-semibold">
                    Gender:
                    <select
                      name="gender"
                      className=" rounded-md px-3 py-1 outline-none"
                      onChange={(e) => {
                        const selectedGender = e.target.value;
                        setInputs({
                          ...inputs,
                          gender: selectedGender,
                        });
                      }}
                    >
                      <option value="">select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <img
                    src={imgUrl || avatar}
                    alt="avatar"
                    className="w-20 h-20 rounded-full border-2 border-solid border-primaryColor flex items-center justify-center block"
                  />
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    accept=".jpg , .png"
                    onChange={(e) => {
                      handleImageChange(e);
                    }}
                  />
                  <span
                    className="bg-[#3D83FF] text-white rounded-md px-5 py-2 cursor-pointer"
                    onClick={() => {
                      document.getElementById("avatar").click();
                    }}
                  >
                    Upload your picture
                  </span>
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="mr-2"
                    onClick={() => {
                      setTerms(!terms);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text__para mt-0 font-semibold"
                  >
                    I agree to the{" "}
                    <span className="text-[#3D83FF]">terms and conditions</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#3D83FF] text-white rounded-md px-5 py-2"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

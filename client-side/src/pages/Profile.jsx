import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appoinments, setAppoinments] = useState([]);
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    phone: "",
  });

  // handle image change
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

  // handle input change
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    const res = await updateProfile(inputs, imgUrl);
    if (res.status === 200) {
      toast.success("Profile updated successfully");
      setEditMode(false);
      setLoading(false);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
      setEditMode(false);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/appoinments/my-appoinments`
        );
        console.log(response);
        setAppoinments(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser?.role === "patient") {
      fetchAllUsers();
    }
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <p className="text-2xl text-red-500 font-bold text-gray-700">
          Something went wrong Please logout and login again to see your profile
        </p>
      </div>
    );
  }

  if (!currentUser)
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <p className="text-2xl font-bold text-gray-700">
          Please login to see your profile
        </p>
        <div className="flex justify-center items-center h-[20vh]">
          <MoonLoader color="#0d6efd" />
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <MoonLoader color="#0d6efd" />
      </div>
    );

  return (
    <section className="profile">
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        {currentUser?.role === "doctor" && (
          <h1 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            👋 Hey doctor you can update onther info like education ...., by
            connecting with admin
          </h1>
        )}
        <div className="h-full">
          <div className="border-b-2 block md:flex">
            <div className="w-full md:w-2/4 p-4 sm:p-6 lg:p-8 bg-white shadow-md h-full">
              <div className="flex justify-between mb-4">
                <span className="text-xl font-semibold block">
                  Update Profile
                </span>
                <a
                  href="#"
                  disabled={editMode}
                  className={`-mt-2 text-md font-bold text-white  rounded-full px-5 py-2 ${
                    editMode ? "bg-green-500" : "bg-gray-700"
                  }`}
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit mode {editMode ? "on" : "off"}
                </a>
              </div>

              <span className="text-gray-600">
                This information is secret so be careful
              </span>
              <div className="w-full p-8 mx-2 flex justify-center">
                <img
                  id="showImage"
                  className="max-w-xs w-32 items-center border"
                  src={imgUrl || currentUser?.photo}
                  alt=""
                />
                <input
                  type="file"
                  id="file"
                  accept=".png , .jpg"
                  className="hidden"
                  disabled={!editMode}
                  onChange={handleImageChange}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700 hover:text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              </div>
              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    disabled={!editMode}
                    id="name"
                    name="name"
                    type="text"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    placeholder={currentUser?.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="email"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email
                </label>
                <input
                  disabled={!editMode}
                  id="email"
                  type="email"
                  name="email"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  placeholder={currentUser?.email}
                  onChange={handleChange}
                  readOnly={true}
                />
              </div>
              <div className="pb-4">
                <label
                  htmlFor="password"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Password
                </label>
                <input
                  disabled={!editMode}
                  id="password"
                  name="password"
                  type="password"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  placeholder="**********"
                  onChange={handleChange}
                />
                <span className="text-gray-600 pt-4 block opacity-70">
                  Personal login information of your account
                </span>
              </div>
            </div>

            <div className="w-full h-full md:w-3/5 p-4 md:p-8 bg-white lg:ml-4 shadow-md">
              <div className="rounded  shadow p-6">
                <div className="pb-6">
                  <label
                    htmlFor="phone"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <input
                      disabled={!editMode}
                      id="1"
                      type="text"
                      name="phone"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      placeholder={currentUser?.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pb-6">
                  <label
                    htmlFor="bloodType"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Blood Type
                  </label>
                  <div className="flex">
                    <input
                      disabled={!editMode}
                      id="2"
                      type="text"
                      name="bloodType"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      placeholder={currentUser?.bloodType}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end mt-8">
          <button
            disabled={!editMode}
            className="text-xl font-bold text-white  rounded-full px-5 py-2 bg-gray-700"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* appoinments container */}
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        {appoinments.length === 0 && currentUser?.role === "patient" && (
          <h1 className="text-2xl text-center font-semibold text-gray-700 mt-8 mb-4">
            You don't have any appoinments yet
          </h1>
        )}
        {appoinments.length > 0 && (
          <div className="h-full">
            <div className="border-b-2 block md:flex">
              <div className="w-full p-4 sm:p-6 lg:p-8 bg-white shadow-md h-full">
                <div className="flex justify-between mb-4">
                  <span className="text-xl font-semibold block">
                    My Appoinments
                  </span>
                </div>
                <div className="pb-6">
                  <div className="flex">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Doctor Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appoinments.map((appoinment) => (
                          <tr key={appoinment._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className="text-sm font-medium text-gray-900
                             "
                                >
                                  {appoinment.doctorId.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {appoinment.date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {appoinment.time}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;

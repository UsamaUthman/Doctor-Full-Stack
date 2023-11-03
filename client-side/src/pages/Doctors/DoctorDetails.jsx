import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHospitalAlt } from "react-icons/fa";
import About from "./About";
import { formateDate } from "../../utils/formateDate";
import SidePanel from "./SidePanel";
import StarRating from "../../components/Doctors/StarRating";
import PutStarRating from "../../components/Doctors/PutStarRating";

function DoctorDetails() {
  const { currentUser, getSingelDoctor } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [tap, setTap] = useState(0);
  const [showfeedbackForm, setshowFeedbackForm] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [test, setTest] = useState(false);

  // check if the user has already given a feedback more than once and if yes return true
  const checkUser = () => {
    const userId = currentUser?._id;
    const user = feedbackData?.filter((item) => item.user._id === userId);
    if (user?.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation to check if the user has entered a review text
    if (text === "") {
      toast.error("Please enter a review text");
      return;
    }
    // validation to check if the user has already given a feedback more than once
    if (checkUser()) {
      toast.error("You have already given a feedback twice");
      return;
    }
    try {
      const res = await axios.post(
        `/api/v1/doctors/reviews/${id}/review`,
        {
          rating,
          reviewText: text,
        },
        {
          validateStatus: false,
        }
      );

      if (res.status === 201) {
        toast.success("Review added successfully");
        setshowFeedbackForm(false);
        setText("");
        setRating(0);
        setTest(!test);
      } else if (res.status === 403) {
        setText("");
        setRating(0);
        toast.error("Doctor can't give feedback");
      } else {
        toast.error("Something went wrong try again later");
        setText("");
        setRating(0);
        setshowFeedbackForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getDoctor = async () => {
      const res = await getSingelDoctor(id);
      if (res.status === 200) {
        setDoctor(res.data);
        setFeedbackData(res.data.reviews);
      } else {
        toast.error("Something went wrong try again later");
        navigate("/doctors");
      }
    };
    getDoctor();
  }, [test]);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex flex-col xl:flex-row items-center gap-5">
              <img
                className="h-[300px] w-[300px] block self-start"
                src={doctor?.photo || ""}
                alt=""
              />
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {doctor?.specialization}
                </span>
                <h2 className="text-2xl font-bold mt-4">Dr. {doctor?.name}</h2>
                <div className="flex items-center gap-[6px]">
                  {doctor?.averageRating?.toFixed(1)}
                  <StarRating rating={doctor?.averageRating} />
                </div>
                <div className="flex items-center gap-[6px] mt-4">
                  <FaHospitalAlt className="text-2xl text-blue-500" />
                  <p className="text-md text-gray-700">{doctor?.hospital}</p>
                </div>
                <p className="text-sm text-textColor mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, voluptatum, repellendus, voluptate quia
                  dolorum voluptas quas quod quibusdam natus doloribus.
                </p>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <div className="flex items-center justify-between">
                <button
                  className="text-irisBlueColor font-semibold text-[16px] leading-7"
                  onClick={() => {
                    setTap(0);
                  }}
                >
                  About
                </button>
                <button
                  className="text-irisBlueColor font-semibold text-[16px] leading-7"
                  onClick={() => {
                    setTap(1);
                  }}
                >
                  Education
                </button>
                <button
                  className="text-irisBlueColor font-semibold text-[16px] leading-7"
                  onClick={() => {
                    setTap(2);
                  }}
                >
                  Feedback
                </button>
              </div>
            </div>
            <div className="mt-[50px]">
              {tap === 0 && <About doctor={doctor} />}
              {tap === 1 && (
                <div className="mt-[20px]">
                  <h1 className="text-2xl font-bold text-red-400">
                    this functionality is not working now
                  </h1>
                  <h1 className="text-2xl font-bold">Education</h1>
                  <ul className="pt-4 md:p-5">
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[20px]">
                      <div className="flex items-center gap-5">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                          {formateDate("2014-01-01")}
                        </span>
                        <div>
                          <h2 className="text-lg font-bold">Master Dgree</h2>
                          {/* university of california */}
                          <p className="text-textColor text-sm mt-1">
                            University of California
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                      <div className="flex items-center gap-5">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                          {formateDate("2010-01-01")}
                        </span>
                        <div>
                          <h2 className="text-lg font-bold">Master Dgree</h2>
                          <p className="text-textColor text-sm mt-1">
                            University of California
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {tap === 2 && (
                <div className="mt-[20px]">
                  <h1 className="text-2xl font-bold">Feedback</h1>
                  {feedbackData?.length === 0 && (
                    <p className="text-gray-600 text-lg text-center mt-1 text-bold">
                      No feedback yet
                    </p>
                  )}
                  <div>
                    {feedbackData?.map((item, index) => (
                      <div
                        className="flex items-center gap-5 mt-[20px]"
                        key={index}
                      >
                        <img
                          className="h-[50px] w-[50px] rounded-full self-start"
                          src={item.user.photo}
                          alt=""
                        />
                        <div>
                          <h2 className="text-lg font-bold">
                            {item.user.name}
                          </h2>
                          <span>{formateDate(item.createdAt)}</span>
                          <p className="text-textColor text-sm mt-1 p-3 bg-[#f7f7f7] rounded-lg shadow-md">
                            {item.reviewText}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-[20px] flex items-center justify-center">
                      <button
                        className="bg-[#3D83FF] text-white rounded-md px-5 py-2"
                        onClick={() => {
                          setshowFeedbackForm(!showfeedbackForm);
                        }}
                      >
                        Add Feedback
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className={`${
                        showfeedbackForm ? "block" : "hidden"
                      } mt-[20px]`}
                    >
                      <div className="flex items-center gap-5">
                        <img
                          className="h-[50px] w-[50px] rounded-full self-start"
                          src={currentUser?.photo}
                          alt=""
                        />
                        <div>
                          <h2 className="text-lg font-bold">
                            {currentUser?.name}
                          </h2>
                          <span>{formateDate(new Date())}</span>
                          <textarea
                            className="w-full border-2 border-gray-300 rounded-md p-2 mt-2"
                            placeholder="Type your feedback here..."
                            rows="4"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                          />
                          {/* adding star rating */}
                          <div className="flex items-center gap-1 mt-2">
                            <PutStarRating
                              rating={rating}
                              setRating={setRating}
                              rat
                            />
                            <p className="text-sm text-gray-500 mr-1">
                              {rating}
                            </p>
                          </div>
                          <div className="mt-2">
                            <button
                              className="bg-[#3D83FF] text-white rounded-md px-5 py-2"
                              type="submit"
                            >
                              Submit
                            </button>
                            <button
                              className="bg-[#3D83FF] text-white rounded-md px-5 py-2 ml-2"
                              onClick={() => {
                                setshowFeedbackForm(false);
                                setText("");
                              }}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <SidePanel doctor={doctor} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDetails;

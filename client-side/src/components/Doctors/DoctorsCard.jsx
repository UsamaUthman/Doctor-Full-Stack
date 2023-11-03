import React from "react";
import StarRating from "../../components/Doctors/StarRating";
import { FaHospitalAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function DoctorsCard({ item }) {
  const {
    _id,
    name,
    specialization,
    averageRating,
    totalRating,
    photo,
    hospital,
    isVerified,
    isApproved,
  } = item;

  const disabled = function () {
    // if (!isVerified) {
    //   if (isApproved === "approved") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    // return true;
    return false;
  };

  return (
    <div className="bg-white rounded-md shadow-md p-5">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <img
            src={photo}
            alt={name}
            className="w-[100px] h-[100px] rounded-full"
          />
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Dr. {name}</h3>
            <p className="text-sm text-gray-500 text-center">
              {specialization}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <StarRating rating={averageRating} />
            <p className="text-sm text-gray-500 mr-1">{averageRating}</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mr-1">Total raitng :</p>
            <p className="text-sm text-gray-500">{totalRating}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between mt-3 gap-2">
        <FaHospitalAlt className="text-2xl text-blue-500" />
        <p className="text-md text-gray-700">{hospital}</p>
      </div>

      <Link
        to={!disabled() ? `/doctors/${_id}` : "#"}
        className="flex items-center justify-center w-full"
      >
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-5 py-2 mt-5 mx-auto w-full"
          disabled={disabled()}
        >
          Book Appointment
        </button>
      </Link>
    </div>
  );
}

export default DoctorsCard;

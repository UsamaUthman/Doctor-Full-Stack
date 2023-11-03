import { AiOutlineClose, AiFillDelete } from "react-icons/ai";
import { IoLogoUsd } from "react-icons/io";
import { toast } from "react-toastify";
const ProfileModal = ({ appointment, onClose }) => {

  const handleDelete = async () => {
    toast.warning("Deleting Appointment...");
  }
  return (
    <div
      className="fixed bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[450px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex justify-start items-center gap-1 mt-3">
            <h2 className="my-1 text-md font-bold text-gray-700">
                Appointment Date: {new Date(appointment.appointmentDate).toDateString()}
            </h2>
        </div>
        <div className="flex justify-start items-center gap-1">
            <h2 className="my-1 text-md font-bold text-gray-700">
                Appointment Time: {new Date(appointment.appointmentDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    })}
            </h2>
        </div>
        <div className="flex gap-6 mt-6">
          <div
            style={{ borderRight: "1px solid #ccc" }}
            className="pr-6 flex flex-col justify-center items-center"
          >
            <h4 className="my-2 text-center text-md font-bold text-gray-700">
              Doctor Name: {appointment.doctor.name}
            </h4>
            <img
              src={appointment.doctor.photo}
              alt=""
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div
            style={{ borderLeft: "1px solid #ccc" }}
            className="pl-6 flex flex-col justify-center items-center"
          >
            <h4 className="my-2 text-md text-center font-bold text-gray-700">
              Patient Name: {appointment.user.name.split(" ")[0]}
            </h4>
            <img
              src={appointment.user.photo}
              alt=""
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-1 mt-3">
          <h2 className="my-1 text-md font-bold text-gray-700">
            Specialization : {appointment.doctor.specialization}
          </h2>
        </div>
        <div className="flex justify-start items-center gap-1 mt-3">
          <h2 className="my-1">
            Ticket Price:
            {appointment.ticketPrice}
          </h2>
          <IoLogoUsd className="text-xl" />
          <div
            className={`px-2 py-1 rounded-full ${
              appointment.isPaid ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <h2 className="text-white text-sm">
              {appointment.isPaid ? "Paid" : "Not Paid"}
            </h2>
          </div>
        </div>
        <div className="flex justify-start items-center gap-1 mt-3">
          <h2 className="my-1">Status: {appointment.status}</h2>
          <div
            className={`px-2 py-1 rounded-full ${
              appointment.status === "Pending"
                ? "bg-yellow-400"
                : appointment.status === "Approved"
                ? "bg-green-400"
                : "bg-red-400"
            }`}
          >
            <h2 className="text-white text-sm">{appointment.status}</h2>
          </div>
        </div>
        {/* delete button */}
        <div className="flex justify-end items-center gap-1 mt-3">
          <button className="flex justify-center items-center gap-1 px-2 py-1 rounded-full bg-red-400 text-white" onClick={handleDelete}>
            <AiFillDelete className="text-xl" />
            <h2 className="text-md">Delete</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

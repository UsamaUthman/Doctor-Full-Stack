import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(false);
  const { getAllUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      } else {
        setError(true);
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] p-4">
        <div className="flex flex-col justify-center items-center">
          <BiErrorCircle className="text-[#ff0000] text-[10rem]" />
          <h1 className="text-[#ff0000] text-center text-[2rem] font-semibold">
            Something went wrong you can't access this page
          </h1>
          <button
            className="bg-[#ff0000] text-white px-4 py-2 rounded-md mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  return <div>{/* create a tabe for users and doctors */}</div>;
};

export default AdminDashboard;

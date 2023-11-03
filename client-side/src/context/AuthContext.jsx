import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [doctors, setDoctors] = useState([]); // [] is the initial value
  const [email, setEmail] = useState(localStorage.getItem("email-otp") || null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/forget-password" ||
          window.location.pathname === "/otp-verify" ||
          window.location.pathname === "/reset-password" ||
          window.location.pathname === "/verified-email/:token/:otp/"
        )
          return;
        const response = await axios.get(`/api/auth/currentUser`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setCurrentUser(data);
          return data;
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  const register = async (inputs, imgUrl) => {
    try {
      const response = await axios.post(
        "/api/auth/register",
        { ...inputs, photo: imgUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (inputs) => {
    try {
      const response = await axios.post("/api/auth/login", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: false,
      });

      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await axios.get("/api/auth/logout");
    setCurrentUser(null);
  };

  const updateProfile = async (inputs, imgUrl) => {
    try {
      const response = await axios.post(
        `/api/v1/users/profile/update/${currentUser._id}`,
        { ...inputs, photo: imgUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsersAndDoctors = async () => {
    try {
      const response = await axios.get(`/api/v1/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: false,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllDoctors = async (query) => {
    const response = await axios.get(`/api/v1/doctors`, {
      // params : {
      //   query : "mosab"
      // },
      validateStatus: false,
    });
    return response;
  };


  const getSingelDoctor = async (id) => {
    const res = await axios.get(`/api/v1/doctors/doctor/${id}` ,{
      validateStatus: false,
    });
    return res;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        updateProfile,
        email,
        setEmail,
        getAllUsersAndDoctors,
        getAllDoctors,
        doctors,
        setDoctors,
        getSingelDoctor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

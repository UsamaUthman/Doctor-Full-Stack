import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register"
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
        console.log(response);
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
      });

      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
        return response;
      }
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
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

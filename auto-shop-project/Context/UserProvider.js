import React, { createContext, useState, useEffect } from "react";

// Create the Context
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [user, setUser] = useState(null);
  const [appts, setAppts] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "http://127.0.0.1:5555";
  useEffect(() => {
    const fetchUser = fetch(`${BACKEND_URL}/users/current`, {
      credentials: "include",
    }).then((response) => (response.ok ? response.json() : null));

    const fetchAppts = fetch(`${BACKEND_URL}/appointments`).then((response) =>
      response.ok ? response.json() : null
    );

    Promise.all([fetchUser, fetchAppts])
      .then(([userData, apptData]) => {
        setUser(userData);
        setAppts(apptData);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        user,
        setUser,
        appts,
        setAppts,
        loading,
        setLoading,
        BACKEND_URL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

'use client'
import React, {createContext, useState, useEffect} from 'react'
// Create the Context
export const UserContext = createContext();
// This export is what I have to use
export const UserProvider = ({children}) => {
    const[user,setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      const fetchData = async() => {
        try{
          const response = await fetch("http://127.0.0.1:5555/users/current", {
            credentials: "include"
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setLoading(true);
          } else {
            console.error("Request failed");
            setLoading(true);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          setLoading(true);
        }
      };
      fetchData();
    }, []);
  return (
    <UserContext.Provider value={{user, setUser, loading, setLoading}}>
      {children}
    </UserContext.Provider>
  )
}

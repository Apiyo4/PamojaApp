import React, { useState, useContext, useMemo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "../axios";

const AuthContext = React.createContext(null);

const base_url = "https://pamoja-backend.onrender.com/api";
// const base_url = "http://localhost:5000/api";

export function AuthProvider(props) {
  let [user, setUser] = React.useState(null);
  const isLoggedIn = props.value.setIsLoggedIn;
  const setIsLoggedIn = props.value.setIsLoggedIn;
  const setCurrentUser = (userDTO) => {
    if (!userDTO) {
      setUser(null);
      return;
    }

    setUser({
      ...userDTO,
      name: `${userDTO.name}`,
      credits: `${userDTO.credits}`,
      email: `${userDTO.email}`,
      id: `${userDTO.id}`,
    });
  };
  const value = React.useMemo(() => {
    const getUserProfile = async () => {
      await axios()
        .get(`${base_url}/users/info`)
        .then((res) => {
          setCurrentUser({
            ...res.data,
            name: res.data.name,
            email: res.data.email,
            id: res.data.id,
            credits: res.data.credits,
          });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };
    
    return {
      user,
      getUserProfile,
      setCurrentUser,
      isLoggedIn,
    };
  }, [user]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const navigation = useNavigation();
  const auth = useAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (sessionStorage.getItem("token")) {
        await auth.getUserProfile();
      }

      if (!auth.user && !sessionStorage.getItem("token")) {
        navigation.navigate("Login");
      }
    };

    checkAuthentication();
  }, [auth, navigation]);

  return auth.user || sessionStorage.getItem("token") ? children : null;
}

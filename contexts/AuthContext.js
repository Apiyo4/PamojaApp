import React, { useState, useContext, useMemo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

const base_url = "https://pamoja-backend.onrender.com/api";
// const base_url = "http://localhost:5000/api";

export function AuthProvider(props) {
  let { user, setUser } = props.value;
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
      try {
        const axiosInstance = await Axios(); // invoke withAuth() to get the axios instance
        const response = await axiosInstance.get(`${base_url}/users/info`);
        setCurrentUser({
          ...response.data,
          name: response.data.name,
          email: response.data.email,
          id: response.data.id,
          credits: response.data.credits,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error.response.data.message);
      }
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
      // if (sessionStorage.getItem("token")) {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await auth.getUserProfile();
      }

      if (!auth.user && !token) {
        navigation.navigate("Login");
      }
    };

    checkAuthentication();
  }, [auth, navigation]);
  // return auth.user || sessionStorage.getItem("token") ? children : null;

  return auth.user ? children : null;
}

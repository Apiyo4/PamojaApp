import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigation = useNavigation();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = 'http://localhost:5000/api'
  const { getUserProfile } = useAuth();
  React.useEffect(()=>{},[isLoading])
  const submit = async() => {
    await axios
      .post(`${base_url}/users/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        setIsLoading(true)
        if (res.data.token) {
          // sessionStorage.setItem("token", res.data.token);

          AsyncStorage.setItem("token", JSON.stringify(res.data.token));
        }
        getUserProfile();

        setTimeout(() => {
          navigation.navigate("Books");
        }, 2000);
        setIsLoading(false);
      })
      .catch((error) => {
        if(error.response.data.message){
          setIsError(error.response.data.message);
        }else{
          setIsError(error.message);
        }
        
      });
    setIsLoading(false);
  
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Montserrat",
          fontSize: 36,
          fontWeight: "600",
          lineHeight: 44,
          letterSpacing: 0,
          textAlign: "center",
          paddingBottom: 24,
        }}
      >
        Pamoja
      </Text>
      <Text style={{ fontSize: 18, color: "red" }}>{isError}</Text>
      <View>
        <TextInput
          placeholder="Enter email"
          style={{
            paddingRight: "4.5rem",
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: "2rem",
            marginVertical: "2rem",
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={emailRef}
          onChangeText={(e) => (emailRef.current.value = e)}
        />
        <View
          style={{
            height: 60,
            borderRadius: 20,
            backgroundColor: "#fff",
            borderColor: "#3AA5F3",
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Enter password"
            style={{
              paddingRight: "4.5rem",
              flex: 1,
              borderRadius: 20,
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: "#3AA5F3",
              paddingLeft: "2rem",
              fontSize: 18,
            }}
            placeholderTextColor="#000000"
            ref={passwordRef}
            onChangeText={(e) => (passwordRef.current.value = e)}
          />
        </View>
        <TouchableOpacity
          style={{
            marginBottom: "32px",
            borderRadius: 20,
            height: 60,
            color: "#fff",
            backgroundColor: "#3182CE",
            marginTop: "3rem",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          onPress={submit}
        >
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", paddingLeft: '18px' }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "blue" }}>Signup</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6a7b1",
    alignItems: "center",
    justifyContent: "center",
  },
});

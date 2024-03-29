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
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import * as ImagePicker from "react-native-image-picker";

export default function LessonForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const topicRef = useRef();
  const descriptionRef = useRef();
  const courseRef = useRef();
  const navigation = useNavigation();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = "http://localhost:5000/api";
  const { getUserProfile } = useAuth();
  // React.useEffect(() => {}, [isLoading]);

  const submit = async (event) => {
    event.preventDefault();
    
    await axios()
      .post(`${base_url}/lessons`, {
        topic: topicRef.current.value,
        course: courseRef.current.value,
        description: descriptionRef.current.value,
      })
      .then((res) => {
        topicRef.current.value = null;
        descriptionRef.current.value = null;
        courseRef.current.value = null;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "600",
          lineHeight: 44,
          letterSpacing: 0,
          textAlign: "center",
          paddingBottom: 24,
        }}
      >
        Book a lesson
      </Text>
      <Text style={{ fontSize: 18, color: "red" }}>{isError}</Text>
      <View>
        <TextInput
          placeholder="Enter topic"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={topicRef}
          onChangeText={(e) => (topicRef.current.value = e)}
        />
        <TextInput
          placeholder="Enter course"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={courseRef}
          onChangeText={(e) => (courseRef.current.value = e)}
        />
        <TextInput
          placeholder="Enter description"
          placeholderTextColor="#000000"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          ref={descriptionRef}
          onChangeText={(e) => (descriptionRef.current.value = e)}
        />
        <TouchableOpacity
          style={{
            marginBottom: 32,
            borderRadius: 20,
            height: 60,
            color: "#fff",
            backgroundColor: "#3182CE",
            marginTop: 48,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          onPress={submit}
        >
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
              paddingLeft: 18,
            }}
          >
            Book lesson
          </Text>
        </TouchableOpacity>
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

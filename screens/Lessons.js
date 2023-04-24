import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Lesson from "../components/Lesson";
import { useState, useEffect } from "react";
import { RequireAuth, useAuth } from "../contexts/AuthContext";
import LessonForm from "../components/LessonForm";
import axios from "../axios";

export default function Lessons() {
  const [isAddLesson, setIsAddLesson] = useState(false);
  const [lessons, setLessons] = useState([]);
  const { user, getUserProfile, isLoggedIn } = useAuth();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = "http://localhost:5000/api";

  useEffect(()=>{
  const getLessons = async ()=>{
    try {
      const axiosInstance = await axios();
      const response = await axiosInstance.get(`${base_url}/lessons`);
      setLessons(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  getLessons()
}, [lessons])
  return (
    // <RequireAuth>
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          color: "#fff",
          marginTop: "2rem",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "row",
        }}
        onPress={() => setIsAddLesson((isAddLesson) => !isAddLesson)}
      >
        <Text
          style={{
            color: "blue",
            fontSize: 18,
            fontWeight: "700",
            paddingLeft: "18px",
            textAlign: "left",
            textDecorationLine: 'underline',
          }}
        >
          {isAddLesson ? "Cancel" : "Book a Lesson"}
        </Text>
      </TouchableOpacity>
      {isAddLesson ? (
        <LessonForm />
      ) : (
        <Lesson
          lessons={lessons.filter((lesson) => !lesson.isTaught)}
          user={user}
        />
      )}
    </View>
    // </RequireAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6a7b1",
  },
});

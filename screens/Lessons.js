import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Lesson from "../components/Lesson";
import { useState } from "react";
import { RequireAuth, useAuth } from "../contexts/AuthContext";
import LessonForm from "../components/LessonForm";

export default function Lessons() {
  const [isAddLesson, setIsAddLesson] = useState(false);
  const [lessons, setLessons] = useState([
    {
      _id: "644098cf3595a1fa3aee56aa",
      user: "64404e0f7df10a95986e68b9",
      topic: "jvdhhdvhdhv",
      course: "hahhhhefh",
      description: "hvhvdhhdvzhdv",
      isTaught: false,
      teachId: "64405ff67df10a959871ebe5",
      comments: [
        {
          _id: "64408f7bac46193804bdf535",
          comment: "Interesting",
          username: "Aps",
          userAvatar: "https://avatars.test.readeo.com/default-profile-12.png",
        },
        {
          _id: "644090267f15c36413a4b3ac",
          comment: "That worked for me too!!!",
          username: "Aps",
          userAvatar: "https://avatars.test.readeo.com/default-profile-12.png",
        },
        {
          _id: "644091b86d123986440cfad3",
          comment: "Here for the free points",
          username: "Suni",
          userAvatar: "https://avatars.test.readeo.com/default-profile-1.png",
        },
      ],
    },
    {
      _id: "644098cf3595a1fa3aee56aa1",
      user: "64404e0f7df10a95986e68b9",
      topic: "jvdhhdvhdhv",
      course: "hahhhhefh",
      description: "hvhvdhhdvzhdv",
      isTaught: false,
      teachId: "64405ff67df10a959871ebe5",
      comments: []
    },
  ]);
  const { user, getUserProfile, isLoggedIn } = useAuth();

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
          }}
        >
          {isAddLesson ? "Cancel" : "Add a Lesson"}
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

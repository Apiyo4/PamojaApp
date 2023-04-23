
import { StyleSheet, Text, View } from 'react-native';
import Lesson from '../components/Lesson';
import { useState } from "react";
import { RequireAuth, useAuth } from "../contexts/AuthContext";

export default function Lessons() {
  const [lessons, setLessons] = useState([ {_id : "644098cf3595a1fa3aee56aa",
  user : "64404e0f7df10a95986e68b9",
  topic: "jvdhhdvhdhv",
  course: "hahhhh\efh",
  description: "hvhvdhhdvzhdv",
  isTaught: true,
  teachId :"64405ff67df10a959871ebe5"},{_id : "644098cf3595a1fa3aee56aa1",
  user : "64404e0f7df10a95986e68b9",
  topic: "jvdhhdvhdhv",
  course: "hahhhh\efh",
  description: "hvhvdhhdvzhdv",
  isTaught: false,
  teachId :"64405ff67df10a959871ebe5"}
  ]);
  const { user, getUserProfile, isLoggedIn } = useAuth();

  return (
    // <RequireAuth>
    <View style={styles.container}>
      <Lesson lessons={lessons.filter(lesson=> !lesson.isTaught)} user={user} />
    </View>
    // </RequireAuth>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
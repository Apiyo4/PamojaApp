import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Bug from "../components/Bug";
import BugForm from "../components/BugFom";
import { RequireAuth, useAuth } from "../contexts/AuthContext";

export default function Bugs() {
  const [isAddBug, setIsAddBug] = useState(false);
  const [bugs, setBugs] = useState([
    {
      _id: "64408c32ec10ee1a7ff2a65e",
      user: "64405ff67df10a959871ebe5",
      title: "Rails app not running",
      description: "You need to add files in /var/www/html and run bin",
      course: "Computer science",
    },
    {
      _id: "64408c32ec10ee1a7ff2a65e1",
      user: "64405ff67df10a959871ebe5",
      title: "Rails app not running",
      description: "You need to add files in /var/www/html and run bin",
      course: "Computer science",
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
        onPress={() => setIsAddBug(isAddBug => !isAddBug)}
      >
        <Text
          style={{
            color: "blue",
            fontSize: 18,
            fontWeight: "700",
            paddingLeft: "18px",
            textAlign: "left"
          }}
        >
          {isAddBug ? "Cancel" : "Add a bug"}
        </Text>
      </TouchableOpacity>

      {isAddBug ? <BugForm /> : <Bug bugs={bugs} user={user} />}
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

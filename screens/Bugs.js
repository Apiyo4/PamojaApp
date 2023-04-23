import axios from "../axios";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Bug from "../components/Bug";
import BugForm from "../components/BugFom";
import { RequireAuth, useAuth } from "../contexts/AuthContext";

export default function Bugs() {
  const [isAddBug, setIsAddBug] = useState(false);
  const [bugs, setBugs] = useState([]);
  const { user, getUserProfile, isLoggedIn } = useAuth();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = "http://localhost:5000/api";
  useEffect(() => {
    const getBugs = async() => {
      await axios()
        .get(`${base_url}/bugs`)
        .then((res) => {
          setBugs(res.data);
        })
        .catch((error) => alert(error.response.data));
    };
    getBugs()
  }, [bugs, setBugs]);
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
        onPress={() => setIsAddBug((isAddBug) => !isAddBug)}
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

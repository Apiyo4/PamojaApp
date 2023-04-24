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
    const getBugs = async () => {
      try {
        const axiosInstance = await axios();
        const response = await axiosInstance.get(`${base_url}/bugs`);
        setBugs(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getBugs();
  }, [bugs]);
  return (
    // <RequireAuth>
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          color: "#fff",
          marginTop: 32,
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
            paddingLeft: 18,
            textAlign: "left",
            textDecorationLine:'underline'
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

import axios from "../axios";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { RequireAuth } from "../contexts/AuthContext";
import Comments from "./Comments";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;

export default function Lesson({ lessons, user }) {
  const [isShowComments, setIsShowComments] = useState(false);
  const base_url = `https://pamoja-backend.onrender.com/api`;
  // const base_url = `http://localhost:5000/api`;
  const renderBook = ({ item }) => {
    const commentsUrl = `${base_url}/lessons/${item._id}/comments`;
    const startSession = async() => {
      if (item.user !== user._id) {
        await axios()
          .put(teachUrl, { ...item, teachId: user._id })
          .then((res) => {
            alert("Waiting for student to approve");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } else {
        await axios()
          .put(attendUrl, { ...item, isTaught: true })
          .then((res) => {})
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    };
   
    return (
      <View style={styles.listI} key={item._id}>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={[styles.title, styles.titlePadding]}>Topic:</Text>
          <Text style={styles.titlePadding}>{item.topic}</Text>
        </View>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={[styles.title, styles.titlePadding]}>Course:</Text>
          <Text style={styles.titlePadding}>{item.course}</Text>
        </View>

        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 30,
          }}
        >
          <Text style={[styles.title, styles.titlePadding]}>Description:</Text>
          <Text style={styles.titlePadding}>{item.description}</Text>
        </View>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setIsShowComments((isShowComments) => !isShowComments)
            }
          >
            <Text style={[styles.title, styles.titlePadding, styles.blueText]}>
              {isShowComments ? "Close" : "Chat"}
            </Text>
          </TouchableOpacity>

          {isShowComments && (
            <Comments
              comments={item.comments}
              comment={"comment"}
              url={commentsUrl}
            />
          )}
        </View>

        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 30,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: "8px",
              borderRadius: 10,
              height: 40,
              color: "#fff",
              backgroundColor: "#3182CE",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: 120,
            }}
            onPress={startSession}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {item.user === user._id ? "Attended?" : "Teach"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <RequireAuth>
      <View style={styles.container}>
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          extraData={lessons}
          renderItem={renderBook}
        />
      </View>
    </RequireAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6a7b1",
    padding: 16,
    color: "black",
  },
  listI: {
    flexDirection: "column",
    alignItems: "center",
    width: imageWidth,
    marginVertical: 10,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderRadius: 20,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
  },
  titlePadding: {
    fontSize: 18,
    paddingHorizontal: 5,
    paddingTop: 12,
  },
  titleMPadding: {
    fontSize: 18,
    paddingHorizontal: 5,
    paddingTop: 6,
  },
  blueText: {
    color: "blue",
    textDecorationLine:'underline'
  },
});

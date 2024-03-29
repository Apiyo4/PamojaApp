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

export default function Bug({ bugs, user }) {
  const [isShowComments, setIsShowComments] = useState(false);
  const base_url = `https://pamoja-backend.onrender.com/api`;
  // const base_url = `http://localhost:5000/api`;

  const renderBook = ({ item }) => {
    const commentsUrl = `${base_url}/bugs/${item._id}/comments`;
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
          <Text style={[styles.title, styles.titlePadding]}>Title:</Text>
          <Text style={styles.titlePadding}>{item.title}</Text>
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
              {isShowComments ? "Close" : "See all fixes"}
            </Text>
          </TouchableOpacity>

          {isShowComments && (
            <Comments
              comments={item.comments}
              comment={"fix"}
              url={commentsUrl}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <RequireAuth>
      <View style={styles.container}>
        <FlatList
          data={bugs}
          keyExtractor={(item) => item.id}
          extraData={bugs}
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

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
import { Button } from "react-native-elements";
import { RequireAuth, useAuth } from "../contexts/AuthContext";
import Comments from "./Comments";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;
const commonWords = [
  "the",
  "of",
  "and",
  "to",
  "a",
  "in",
  "that",
  "is",
  "for",
  "it",
  "with",
  "was",
  "as",
  "be",
  "on",
  "not",
  "he",
  "by",
  "are",
  "this",
  "but",
  "from",
  "or",
  "have",
  "an",
  "they",
  "which",
  "one",
  "you",
  "were",
  "her",
  "all",
  "she",
  "there",
  "would",
  "their",
  "we",
  "him",
  "been",
  "has",
  "when",
  "who",
  "will",
  "more",
  "no",
  "out",
  "do",
  "so",
  "can",
  "what",
  "and—their",
];
export default function Book({ books }) {
  const [isShowComments, setIsShowComments] = useState(false);
  const base_url = `https://pamoja-backend.onrender.com/api`;
  // const base_url = `http://localhost:5000/api`;
  
  const { user } = useAuth();
  const renderBook = ({ item }) => {
    const edition = `Edition: ${item.edition} `;
    const commentsUrl = `${base_url}/books/${item._id}/comments`;
    const exchangeBook = async () => {
      if (item.user === user._id) {
        await axios()
          .put(giveUrl, { ...item, isExchanged: true })
          .then((res) => {})
          .catch((error) => {
            alert(error.response.data.message);
          });
      } else {
        await axios()
          .put(getUrl, {...item, purchaseId: user._id })
          .then((res) => {
            alert("Waiting for seller");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    };
    
    return (
      <View style={styles.listI} key={item._id}>
        <View>
          <Image source={{ uri: item.photo }} style={styles.image} />
        </View>
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
          <Text style={[styles.title, styles.titlePadding]}>Edition:</Text>
          <Text style={styles.titlePadding}>{edition}</Text>
        </View>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={[styles.title, styles.titlePadding]}>Author:</Text>
          <Text style={styles.titlePadding}>{item.author}</Text>
        </View>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={[styles.title, styles.titlePadding]}>Location:</Text>
          <Text style={styles.titlePadding}>{item.location}</Text>
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
              {isShowComments ? "Close" : "Read comments"}
            </Text>
          </TouchableOpacity>

          {isShowComments && (
            <Comments
              comments={item.comments}
              comment={"fix"}
              url={commentsUrl}
            />
          )}
          <Text>
            
          </Text>
           
        </View>
        <View
          style={{
            width: imageWidth,
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 30,
            alignItems: 'flex-end'
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
              width: 90

            }}
            onPress={exchangeBook}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
             
              { item.user === user._id.toString() ? "Give" : "Get"} 
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
          data={books}
          keyExtractor={(item) => item._id}
          extraData={books}
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
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    color: "black",
  },
  listI: {
    flexDirection: "column",
    alignItems: "center",
    width: imageWidth,
    marginVertical: 10,
    paddingBottom: 30,
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

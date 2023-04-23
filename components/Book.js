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
import { RequireAuth } from "../contexts/AuthContext";

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
export default function Book({ books, user }) {
  const renderBook = ({ item }) => {
    const edition = `Edition: ${item.edition} `;
    const tags = [
      ...new Set(
        item.description
          .split(" ")
          .filter((word) => !commonWords.includes(word.toLowerCase()))
          .slice(0, 16)
      ),
    ];
    console.log(user, 'user');
    const removePunctuation = (word) => {
      const lastChar = word.slice(-1);
      if (
        lastChar === "." ||
        lastChar === "," ||
        lastChar === ":" ||
        lastChar === "!" ||
        lastChar === "?" ||
        lastChar === ";"
      ) {
        return word.slice(0, -1);
      } else {
        return word;
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
            paddingHorizontal: 12,
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
            paddingHorizontal: 12,
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
            paddingHorizontal: 12,
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
            paddingHorizontal: 12,
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
            paddingHorizontal: 12,
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
            paddingHorizontal: 12,
          }}
        >
          <TouchableOpacity
            style={{
              marginBottom: "32px",
              borderRadius: 20,
              height: 60,
              color: "#fff",
              backgroundColor: "#3182CE",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginTop: 8,

            }}
            onPress={() =>  console.log('get')}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "700",
                paddingLeft: "18px",
              }}
            >
              { user.id && item.user == user.id ? "Give" : "Get"} 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <RequireAuth>
      <View style={styles.container}>
        <Text>Books</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
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
    padding: 16,
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
});

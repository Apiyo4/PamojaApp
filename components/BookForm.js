import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import * as ImagePicker from "react-native-image-picker";

export default function BookForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const authorRef = useRef();
  const editionRef = useRef();
  const photoRef = useRef();
  const navigation = useNavigation();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = "http://localhost:5000/api";
  const { getUserProfile } = useAuth();
  // React.useEffect(() => {}, [isLoading]);
  const handleImageUpload = (event) => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        setIsError(response.error);
      } else {
        setImageData(response.assets[0].uri);
      }
    });
  };
  const submit = async (event) => {
    event.preventDefault();
    const newBook = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      photo: !imageData
        ? "https://static.vecteezy.com/system/resources/previews/000/541/091/large_2x/green-book-on-white-background-vector.jpg"
        : imageData,
      author: authorRef.current.value,
      edition: editionRef.value ? editionRef.current.value : "1st",
    };
    await axios()
      .post(`${base_url}/books`, newBook)
      .then((res) => {
        titleRef.current.value = null;
        descriptionRef.current.value = null;
        locationRef.current.value = null;
        setImageData(null);
        authorRef.current.value = null;
        editionRef.current.value = null;
      })
      .catch((error) => {
        if (error.response.data.message) {
          setIsError(error.response.data.message);
        } else {
          setIsError(error.message);
        }
      });
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "600",
          lineHeight: 44,
          letterSpacing: 0,
          textAlign: "center",
          paddingBottom: 24,
        }}
      >
        Add a book
      </Text>
      <Text style={{ fontSize: 18, color: "red" }}>{isError}</Text>
      <View>
        <TextInput
          placeholder="Enter title"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={titleRef}
          onChangeText={(e) => (titleRef.current.value = e)}
        />
        <TextInput
          placeholder="Enter author"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={authorRef}
          onChangeText={(e) => (authorRef.current.value = e)}
        />
        <TextInput
          placeholder="Enter book edition"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={editionRef}
          onChangeText={(e) => (editionRef.current.value = e)}
        />
        <TextInput
          placeholder="Enter location"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          placeholderTextColor="#000000"
          ref={locationRef}
          onChangeText={(e) => (locationRef.current.value = e)}
        />
         <TextInput
          placeholder="Enter book description"
          placeholderTextColor="#000000"
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            marginBottom: 32,
            fontSize: 18,
          }}
          ref={descriptionRef}
          onChangeText={(e) => (descriptionRef.current.value = e)}
        />
        <TouchableOpacity
          onPress={handleImageUpload}
          style={{
            paddingRight: 72,
            height: 60,
            backgroundColor: "#fff",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#3AA5F3",
            paddingLeft: 32,
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {imageData ? "Image Uploaded" : "Select Image"}
          </Text>
        </TouchableOpacity>
       

        <TouchableOpacity
          style={{
            marginBottom: 32,
            borderRadius: 20,
            height: 60,
            color: "#fff",
            backgroundColor: "#3182CE",
            marginTop: 48,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          onPress={submit}
        >
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
              paddingLeft: 18,
            }}
          >
            Add book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6a7b1",
    alignItems: "center",
    justifyContent: "center",
  },
});

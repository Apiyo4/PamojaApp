import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";
import React, { useState, useRef } from "react";
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/themed';

import axios from "../axios/index";
import { useAuth } from "../contexts/AuthContext";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.9;

const Comments = ({ comments, comment, url }) => {
    const { user } = useAuth();
    const commentRef = useRef();
  
    const submit = async(event) => {
      event.preventDefault();
      await axios()
        .put(`${url}`, {
          comment: commentRef.current.value,
          userId: user._id,
        })
        .then((res) => {
          commentRef.current.value = null;
        })
        .catch((error) => {
          alert(error.message);
        });
    };

  return (
    <View>
      <FlatList
        data={comments}
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            bottomDivider
            containerStyle={{ marginBottom: 18 }}
          > 
          <Avatar source={{ uri: item.userAvatar }} />
            <ListItem.Content>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                
                <ListItem.Title style={{ marginLeft: 2 }}>
                  {item.username}
                </ListItem.Title>
              </View>
              <ListItem.Subtitle style={{ marginTop: 8 }}>
                {item.comment}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput placeholder={`Add a ${comment}...`} ref={commentRef} 
          onChangeText={(e) => (commentRef.current.value = e)} />

      <TouchableOpacity
        style={{
          marginTop: 18,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          textDecoration: "underline"
        }}
        onPress={submit}
      >
        <Text style={{ color: "blue" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: imageWidth,
  },
  comment: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: "#000",
    color: "#fff",
    paddingVertical: 16,
    borderRadius: 16,
  },
});

export default Comments;

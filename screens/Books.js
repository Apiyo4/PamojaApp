import axios from "../axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Book from "../components/Book";
import BookForm from "../components/BookForm";
import { RequireAuth, useAuth } from "../contexts/AuthContext";

export default function Books({ navigation }) {
  const [isAddBook, setIsAddBook] = useState(false);
  const [books, setBooks] = useState([]);
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = 'http://localhost:5000/api';

  const { user, getUserProfile, isLoggedIn } = useAuth();
  useEffect(() => {
    const getBooks = async () => {
      try {
        const axiosInstance = await axios();
        const response = await axiosInstance.get(`${base_url}/books`);
        setBooks(response.data);
      } catch (error) {
        console.log(error.message);
        navigation.navigate("Login");
      }
    };
    getBooks();
  }, [books]);
  useEffect(() => {}, [isAddBook]);

  return (
    <RequireAuth>
      <View style={[styles.container]}>
        <TouchableOpacity
          style={{
            color: "#fff",
            marginTop: 32,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "row",
          }}
          onPress={() => setIsAddBook((isAddBook) => !isAddBook)}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 18,
              fontWeight: "700",
              paddingLeft: 18,
              textAlign: "left",
              textDecorationLine: "underline",
            }}
          >
            {isAddBook ? "Cancel" : "Add a book"}
          </Text>
        </TouchableOpacity>

        {isAddBook ? (
          <BookForm />
        ) : (
          <Book books={books.filter((book) => !book.isExchanged)} />
        )}
      </View>
    </RequireAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6a7b1",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { RequireAuth } from "../contexts/AuthContext";

export default function Books() {
  return (
    <RequireAuth>
      <View style={styles.container}>
        <Text>Books</Text>
      </View>
    </RequireAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

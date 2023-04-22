import { StyleSheet, Text, View } from "react-native";

export default function Books() {
  return (
      <View style={styles.container}>
        <Text>Books</Text>
      </View>
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

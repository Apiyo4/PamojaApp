
import { StyleSheet, Text, View } from 'react-native';

export default function Lessons() {
  return (
    <View style={styles.container}>
      <Text>Lessons</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

import { StyleSheet, Text, View } from 'react-native';

import { RequireAuth } from "../contexts/AuthContext";

export default function Lessons() {
  const [lessons, setLessons] = useState([ 
  ]);
  const { user, getUserProfile, isLoggedIn } = useAuth();

  return (
    // <RequireAuth>
    <View style={styles.container}>
      <Lesson lessons={lesson} user={user} />
    </View>
    // </RequireAuth>
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
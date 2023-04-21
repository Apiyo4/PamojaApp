import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Books from "./screens/Books";
import Bugs from "./screens/Bugs";
import Lessons from "./screens/Lessons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        
        <Drawer.Screen
          name="Books"
          component={Books}
          options={{
            title: "Books",
            drawerIcon: () => (
              <MaterialIcons name="library-books" size={24} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="Bugs"
          component={Bugs}
          options={{
            title: "Bugs",
            drawerIcon: () => (
              <Entypo name="bug" size={24} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="Lessons"
          component={Lessons}
          options={{
            title: "Lessons",
            drawerIcon: () => (
              <FontAwesome5 name="chalkboard-teacher" size={24} color="black" />
            ),
          }}
        />
        <Drawer.Screen name="Login" component={Login} options={{
            title: "Login",
            drawerIcon: () => (
              <MaterialCommunityIcons name="login" size={24} color="black" />
            ),
          }}/>
      </Drawer.Navigator>
    </NavigationContainer>
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

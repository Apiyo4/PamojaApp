import React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Books from "./screens/Books";
import Bugs from "./screens/Bugs";
import Lessons from "./screens/Lessons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Signup from "./screens/Signup";
import { useState } from "react";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
let initialState = sessionStorage.getItem("token") === null ? false : true;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState);
  React.useEffect(() => {}, [isLoggedIn, setIsLoggedIn]);

  const logout = () => {
    if (sessionStorage.hasOwnProperty("token")) {
      sessionStorage.clear();
      setIsLoggedIn(false)   
    }
  };
  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login1"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            unmountOnBlur: true,
          }}
        >
          {!isLoggedIn && (
            <Drawer.Screen
              name="Login"
              component={AppStack}
              options={{
                title: "Login",
                drawerIcon: () => (
                  <MaterialCommunityIcons
                    name="login"
                    size={24}
                    color="black"
                  />
                ),
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Books"
              component={Books}
              options={{
                title: "Books",
                drawerIcon: () => (
                  <MaterialIcons name="library-books" size={24} color="black" />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Bugs"
              component={Bugs}
              options={{
                title: "Bugs",
                drawerIcon: () => <Entypo name="bug" size={24} color="black" />,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Lessons"
              component={Lessons}
              options={{
                title: "Lessons",
                drawerIcon: () => (
                  <FontAwesome5
                    name="chalkboard-teacher"
                    size={24}
                    color="black"
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
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

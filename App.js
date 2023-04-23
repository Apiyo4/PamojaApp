import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const getStorageItem = async () => {
  return await AsyncStorage.getItem("token");
};
const removeStorageItem = async () => {
  await AsyncStorage.removeItem("token");
};
let initialState = getStorageItem() === null ? false : true;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState);
  const [user, setUser] = useState(null);
  // const {getUserProfile} = useAuth()
  const credits = user
    ? `${user.credits} credits available `
    : `Loading... `;
  React.useEffect(() => {}, [isLoggedIn, setIsLoggedIn, user]);

  const logout = async () => {
    if ((await getStorageItem()) != "null") {
      await removeStorageItem();
      setIsLoggedIn(false);
    }
  };
  // useEffect(() => {
  //   if (!user) {
  //     if (getStorageItem() != null) {
  //       getUserProfile();
  //     }
  //   }
  // }, [user, isLoggedIn]);
  const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          colorTint: "#d6a7b1",
        }}
      >
        <Stack.Screen
          name="Login"
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
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            unmountOnBlur: true,
            headerTitleAlign: "center",
            colorTint: "#d6a7b1",
            drawerStyle: {
              width: 240,
              paddingTop: 50,
              paddingHorizontal: 16,
            },
          }}
          drawerContentContainerStyle={{ paddingTop: 20 }}
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
                    color="#e98fb6"
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
                  <MaterialIcons name="library-books" size={24} color="#e98fb6" />
                ),
                headerTintColor: "#d6a7b1",
                headerTitle: credits,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="#e98fb6"
                    />
                  </TouchableOpacity>
                ),
                drawerLabelStyle: {
                  color: '#e98fb6',
                },
                style: {
                  marginTop: 60,
                },
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Bugs"
              component={Bugs}
              options={{
                title: "Bugs",
                drawerIcon: () => <Entypo name="bug" size={24} color="#e98fb6" />,
                headerTintColor: "#d6a7b1",
                headerTitle: credits,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="#e98fb6"
                    />
                  </TouchableOpacity>
                ),
                drawerLabelStyle: {
                  color: '#e98fb6',
                },
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
                    color="#e98fb6"
                  />
                ),
                headerTintColor: "#d6a7b1",
                headerTitle: credits,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 12 }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color="#e98fb6"
                    />
                  </TouchableOpacity>
                ),
                drawerLabelStyle: {
                  color: '#e98fb6',
                },
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
  drawer: {
    padding: 50,
  },
});

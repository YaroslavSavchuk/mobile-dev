import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Gallery from "../screens/Gallery";
import Profile from "../screens/Profile";
import News from "../screens/News";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const MyTabNavigation = () => {
  return (
    <View style={styles.main}>
      <Tab.Navigator
        initialRouteName="News"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "News") {
              iconName = "home";
            } else if (route.name === "Gallery") {
              iconName = "list";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return (
              <View style={{ alignItems: "center" }}>
                <Ionicons name={iconName} size={20} color={color} />
              </View>
            );
          },
          tabBarLabel: ({ focused }) => {
            let { name } = route;
            if (name == 'News') {
              name = "Новини"
            } else if (name == "Gallery") {
              name = "Галерея"
            } else if (name == "Profile") {
              name = "Профіль"
            }
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ color: focused ? "#0042b2" : "gray", fontSize: 12 }}
                >
                  {name}
                </Text>
              </View>
            );
          },

          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#0042b2",
          tabBarIndicatorStyle: {
            backgroundColor: "#0042b2", // Color of the indicator (the bottom line)
          },
          tabBarStyle: {
            backgroundColor: "#cfd0cf",
          },
        })}
      >
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Gallery" component={Gallery} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default MyTabNavigation;

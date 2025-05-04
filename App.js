import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MyTabNavigation from "./components/MyTabNavigation";
import News from "./screens/News";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <MyTabNavigation>
          <View style={styles.main}></View>
        </MyTabNavigation>
        <Footer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#c1c2c4",
    alignItems: "center",
    justifyContent: "center",
  },
});

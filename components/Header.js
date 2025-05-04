import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/university-colored.png")}
        style={{ width: 170, height: 50 }}
      />
      <Text style={{ fontSize: 25 }}>MyFirstApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 90,
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "flex-end",
    paddingBottom: 15,
  },
});

export default Header;

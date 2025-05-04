import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const NewsBlock = ({ title, date, shortText, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.shortText}>{shortText}</Text>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  shortText: {
    fontSize: 14,
    color: "#444",
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 4,
  },
});

export default NewsBlock;

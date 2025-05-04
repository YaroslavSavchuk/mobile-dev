import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemSize = screenWidth / numColumns - 16;

const GalleryItem = ({ src }) => {
  if (!src) {
    return <View style={styles.itemPlaceholder} />;
  }
  return <Image source={{ uri: src }} style={styles.item} />;
};

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?domains=thenextweb.com&pageSize=20&apiKey=558145e37bcf41799afad1ea6dbbc332"
        );
        const data = await response.json();

        if (data.status === "ok") {
          setGallery(data.articles);
        } else {
          setError("Error fetching gallery data");
          console.error("Error from API:", data);
        }
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError("Error fetching gallery data");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={gallery}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => <GalleryItem src={item.urlToImage} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  item: {
    width: itemSize,
    height: itemSize,
    borderRadius: 10,
    margin: 4,
    resizeMode: "cover",
  },
  itemPlaceholder: {
    width: itemSize,
    height: itemSize,
    backgroundColor: "#cfd0cf",
    margin: 4,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Gallery;

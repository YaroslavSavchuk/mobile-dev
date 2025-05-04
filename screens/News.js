import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NewsItem = ({ title, date, description, urlToImage }) => {
  return (
    <View style={styles.itemContainer}>
      {/* Show image if available; otherwise, fallback to an icon */}
      {urlToImage ? (
        <Image source={{ uri: urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons name="image-outline" size={80} color="#999" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?domains=thenextweb.com&pageSize=20&apiKey=558145e37bcf41799afad1ea6dbbc332");
        const data = await response.json();

        if (data.status === "ok") {
          // Set the articles array into state
          setNews(data.articles);
        } else {
          setError("Error fetching news data");
          console.log("Error from API:", data);
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Error fetching news data");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsItem
            title={item.title}
            date={new Date(item.publishedAt).toLocaleDateString()}
            description={item.description}
            urlToImage={item.urlToImage}
          />
        )}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

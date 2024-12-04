import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMusicStore } from "@/hooks/useMusicStore";

export default function MusicListScreen() {
  const colorScheme = useColorScheme();
  const { songs, fetchSongs } = useMusicStore();

  useEffect(() => {
    fetchSongs();
  }, []);

  if (songs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/player",
              params: { songId: item.id },
            }}
            asChild
          >
            <TouchableOpacity style={styles.songItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.thumbnail}
                defaultSource={require("../../assets/default-album.png")}
              />
              <View style={styles.songInfo}>
                <Text
                  style={[
                    styles.title,
                    { color: colorScheme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.artist,
                    { color: colorScheme === "dark" ? "#ccc" : "#666" },
                  ]}
                >
                  {item.artist}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  songItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songInfo: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
  },
  albumArt: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").width - 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  songArtist: {
    fontSize: 16,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});

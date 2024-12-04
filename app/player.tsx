import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMusicStore } from "@/hooks/useMusicStore";
import { styles } from "./(tabs)";

export default function PlayerScreen() {
  const colorScheme = useColorScheme();
  const { songId } = useLocalSearchParams();
  const { songs, currentSongId, isPlaying, setCurrentSongId, setIsPlaying } =
    useMusicStore();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const currentSong = songs.find((s) => s.id === songId);

  useEffect(() => {
    if (currentSong) {
      setCurrentSongId(currentSong.id);
      loadAudio(currentSong.source);
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [songId, currentSong]);

  const loadAudio = async (uri: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = async () => {
    if (currentSong && songs.length > 0) {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      router.replace({
        pathname: "/player",
        params: { songId: songs[nextIndex].id },
      });
    }
  };

  const playPrevious = async () => {
    if (currentSong && songs.length > 0) {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      router.replace({
        pathname: "/player",
        params: { songId: songs[prevIndex].id },
      });
    }
  };

  if (!currentSong) {
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
      <Image
        source={{ uri: currentSong.image }}
        style={styles.albumArt}
        defaultSource={require("../assets/default-album.png")}
      />

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.songTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {currentSong.title}
        </Text>
        <Text
          style={[
            styles.songArtist,
            { color: colorScheme === "dark" ? "#ccc" : "#666" },
          ]}
        >
          {currentSong.artist}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={playPrevious}>
          <FontAwesome name="step-backward" size={32} color="#6200ee" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause} style={styles.playButton}>
          <FontAwesome
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#6200ee"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <FontAwesome name="step-forward" size={32} color="#6200ee" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

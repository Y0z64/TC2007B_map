import { MusicResponse, Song } from "@/types/music";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  currentSongId: string | null;
  isPlaying: boolean;
  setCurrentSongId: (id: string | null) => void;
  setIsPlaying: (playing: boolean) => void;
  fetchSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  currentSongId: null,
  isPlaying: false,
  setCurrentSongId: (id) => set({ currentSongId: id }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  fetchSongs: async () => {
    try {
      const response = await fetch(
        "https://storage.googleapis.com/uamp/catalog.json"
      );
      const data: MusicResponse = await response.json();
      set({ songs: data.music });
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  },
}));

import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  currentStation: null,
  isPlaying: false,
  setStation: (station) => set({ currentStation: station, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

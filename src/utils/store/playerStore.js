import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  currentStation: null,
  isPlaying: false,
  playerKey: 0, // ⬅️ новый ключ

  setStation: (station) =>
    set({
      currentStation: station,
      isPlaying: true,
      playerKey: get().playerKey + 1, // ⬅️ при установке сразу с live
    }),

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  handleToggle: () => {
    const { isPlaying, playerKey } = get();
    if (!isPlaying) {
      // Если включаем снова — рестарт ключа
      set({ playerKey: playerKey + 1 });
    }
    set({ isPlaying: !isPlaying });
  },
}));

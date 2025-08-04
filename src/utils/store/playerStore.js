import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  /* состояние */
  currentStation: null,
  isPlaying: false,
  playerKey: 0,

  /* выбираем станцию → всегда «живой» старт */
  setStation: (station) =>
    set((state) => ({
      currentStation: station,
      isPlaying: true,
      playerKey: state.playerKey + 1, // ← перезапускаем
    })),

  /* единая кнопка Pause/Play — работает и в оверлее, и в большом плеере */
  handleToggle: () => {
    const { isPlaying, playerKey } = get();
    if (!isPlaying) {
      // было «пауза» → жмём «play» → даём новый key
      set({ playerKey: playerKey + 1 });
    }
    set({ isPlaying: !isPlaying });
  },
}));

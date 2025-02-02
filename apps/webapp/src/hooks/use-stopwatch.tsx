import { useEffect, useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StopwatchState {
  totalSeconds: number;
  isRunning: boolean;
  setTotalSeconds: (updater: (prev: number) => number) => void;
  setIsRunning: (isRunning: boolean) => void;
  reset: () => void;
  setSeconds: (seconds: number) => void;
  setMinutes: (minutes: number) => void;
  setHours: (hours: number) => void;
}

const useStopwatchStore = create<StopwatchState>()(
  persist(
    (set) => ({
      totalSeconds: 0,
      isRunning: false,
      setTotalSeconds: (updater) =>
        set((state) => ({ totalSeconds: updater(state.totalSeconds) })),
      setIsRunning: (isRunning) => set({ isRunning }),
      reset: () => set({ totalSeconds: 0, isRunning: false }),
      setSeconds: (seconds) =>
        set((state) => {
          const currentHours = Math.floor(state.totalSeconds / 3600);
          const currentMinutes = Math.floor((state.totalSeconds % 3600) / 60);
          return {
            totalSeconds: currentHours * 3600 + currentMinutes * 60 + seconds,
          };
        }),
      setMinutes: (minutes) =>
        set((state) => {
          const currentHours = Math.floor(state.totalSeconds / 3600);
          const currentSeconds = state.totalSeconds % 60;
          return {
            totalSeconds: currentHours * 3600 + minutes * 60 + currentSeconds,
          };
        }),
      setHours: (hours) =>
        set((state) => {
          const currentMinutes = Math.floor((state.totalSeconds % 3600) / 60);
          const currentSeconds = state.totalSeconds % 60;
          return {
            totalSeconds: hours * 3600 + currentMinutes * 60 + currentSeconds,
          };
        }),
    }),
    {
      name: "stopwatch-storage",
    }
  )
);

export const useStopwatch = () => {
  const store = useStopwatchStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => store.setIsRunning(true);
  const pause = () => store.setIsRunning(false);
  const reset = () => store.reset();

  useEffect(() => {
    if (store.isRunning) {
      intervalRef.current = setInterval(() => {
        store.setTotalSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [store, store.isRunning]);

  const hours = Math.floor(store.totalSeconds / 3600);
  const minutes = Math.floor((store.totalSeconds % 3600) / 60);
  const seconds = store.totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds: store.totalSeconds,
    isRunning: store.isRunning,
    start,
    pause,
    reset,
    setSeconds: store.setSeconds,
    setMinutes: store.setMinutes,
    setHours: store.setHours,
  };
};

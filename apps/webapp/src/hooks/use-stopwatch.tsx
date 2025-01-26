import { useEffect, useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StopwatchState {
  totalSeconds: number;
  isRunning: boolean;
  setTotalSeconds: (updater: (prev: number) => number) => void;
  setIsRunning: (isRunning: boolean) => void;
  reset: () => void;
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
  }, [store.isRunning]);

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
  };
};

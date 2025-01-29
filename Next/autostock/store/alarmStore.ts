import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AlarmResult } from "@/components/alarm";
import { getAlarmStock } from "@/api/api";

interface AlarmStoreState {
  alarmState: Record<string, AlarmResult>[]; 
  fetchAlarmState: () => Promise<void>;
}

export const useAlarmStore = create<AlarmStoreState>()(
  persist(
    (set, get) => ({
      alarmState: [],
      fetchAlarmState: async () => {
        try {
          const data = await getAlarmStock();
          const sound = new Audio("alarm.wav");

          sound.play().catch((err) => console.log("Sound play error:", err));

          set((state) => ({
            alarmState: [...state.alarmState, data],
          }));
        } catch (error) {
          console.error("Failed to fetch alarm state:", error);
        }
      },
    }),
    {
      name: "alarm-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // ✅ JSON Storage 사용!
    }
  )
);

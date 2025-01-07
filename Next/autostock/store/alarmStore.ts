import { create } from "zustand";
import { AlarmResult } from "@/components/alarm";
import { Stock } from "@/components/column";
import { getAlarmStock } from "@/api/api";

interface AlarmStoreState {
  alarmState: Record<string, AlarmResult>;
  fetchAlarmState: () => void;
}

export const useAlarmStore = create<AlarmStoreState>((set) => ({
  alarmState: {},
  fetchAlarmState: async () => {
    const data = await getAlarmStock();
    const sound = new Audio("alarm.wav");
    sound
      .play()
      .then(() => console.log("Sound played"))
      .catch((err) => console.log("Sound play error:", err));
    return set({ alarmState: data });
  },
}));

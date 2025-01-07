import React, { useEffect } from "react";
import { getAlarmStock } from "@/api/api";
import { useState } from "react";
import AlarmPartition from "./alarmPartition";
import { useAlarmStore } from "@/store/alarmStore";

export interface AlarmResult {
  curr_price: number;
  name: string;
  position: number;
  under_must_sell: boolean;
}

const Alarm: React.FC = () => {
  const alarmState = useAlarmStore((state) => state.alarmState);
  const fetchAlarmState = useAlarmStore((state) => state.fetchAlarmState);

  useEffect(() => {
    fetchAlarmState();

    const intervalId = setInterval(() => {
      fetchAlarmState();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(intervalId);
  }, []);

  const BuyTitleList = ["2차 매수가", "1차 매수가"];
  const SellTitleList = [
    "1차 매도가",
    "2차 매도가",
    "3차 매도가",
    "4차 매도가",
    "5차 매도가",
  ];
  return (
    <div className="AlarmContainer">
      <AlarmPartition
        title="손절가"
        alarmState={alarmState}
        target_key="under_must_sell"
        target_value={true}
      ></AlarmPartition>
      {BuyTitleList.map((item, idx) => {
        return (
          <AlarmPartition
            key={idx}
            alarmState={alarmState}
            title={item}
            target_key="position"
            target_value={idx + 1}
          ></AlarmPartition>
        );
      })}
      {SellTitleList.map((item, idx) => {
        return (
          <AlarmPartition
            key={idx}
            alarmState={alarmState}
            title={item}
            target_key="position"
            target_value={idx + 4}
          ></AlarmPartition>
        );
      })}
    </div>
  );
};

export default Alarm;

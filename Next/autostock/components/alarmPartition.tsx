import { AlarmResult } from "./alarm";
import StockText from "./stockText";

interface AlarmPartitionProps {
  title: string;
  alarmState: Record<string, AlarmResult>[]; // 배열 안에 객체 리스트
  target_key: keyof AlarmResult;
  target_value: number | boolean;
}

const AlarmPartition: React.FC<AlarmPartitionProps> = function (props) {
  const alarmStateList = props.alarmState;

  const goingUpOrDown = (name:string) => {
    if (alarmStateList.length <= 1) return "black";
    const curr = alarmStateList[alarmStateList.length-1][name].curr_price;
    const prev = alarmStateList[alarmStateList.length-2][name].curr_price;
    if (curr > prev) {
      return "red";
    }
    if (curr < prev) {
      return "blue";
    }
    return "black";

  }
  return (
    <div className="AlarmPartition">
      <span className="PartitionTitle">{props.title}</span>
      {alarmStateList.length > 0 &&
        Object.entries(alarmStateList[alarmStateList.length - 1]).map(
          ([key, value]) => {
            if (value[props.target_key] === props.target_value) {
              return (
                <StockText
                  key={key}
                  name={value.name}
                  curr_price={value.curr_price}
                  color={
                    goingUpOrDown(key)
                  }
                />
              );
            }
            return null; // JSX에서 map 사용 시 undefined를 반환하지 않도록 null 반환
          }
        )}
    </div>
  );
};

export default AlarmPartition;

import { AlarmResult } from "./alarm";
import StockText from "./stockText";
interface AlarmPartitionProps {
  title: string;
  alarmState: Record<string, AlarmResult>;
  target_key: keyof AlarmResult;
  target_value: number | boolean;
}

const AlarmPartition: React.FC<AlarmPartitionProps> = function (props) {
  return (
    <div className="AlarmPartition">
      <span className="PartitionTitle">{props.title}</span>
      {Object.entries(props.alarmState).map(([key, value]) => {
        if (value[props.target_key] === props.target_value) {
          return (
            <StockText
              key={key}
              name={value.name}
              curr_price={value.curr_price}
            ></StockText>
          );
        }
      })}
    </div>
  );
};

export default AlarmPartition;

import React from "react";
import { Stock } from "./column";

interface CellProps {
  text: string | number;
  type?: "Buy" | "Sell" | "MustSell" | null;
  onClick?: () => void;
}

export const formatNumber = (text: number | string) => {
  if (typeof text == "string") return text;
  return new Intl.NumberFormat("ko-KR").format(text);
};
const Cell: React.FC<CellProps> = (props) => {
  return (
    <div
      className="Cell"
      onClick={() => {
        if (props.onClick) {
          props.onClick(); // 함수 호출 추가
        }
      }}
      style={
        props.type == "Buy"
          ? { backgroundColor: "lightblue" }
          : props.type == "Sell"
          ? { backgroundColor: "lightsalmon" }
          : props.type == "MustSell"
          ? { backgroundColor: "lightgoldenrodyellow" }
          : { backgroundColor: "none" }
      }
    >
      {formatNumber(props.text)}
    </div>
  );
};

export default Cell;

import React from "react";
import { formatNumber } from "./cell";

interface StockTextProps {
  name: string;
  curr_price: number;
  color: "red" | "blue" | "black";
}

const StockText: React.FC<StockTextProps> = (props) => {
  return (
    <div className="StockTextContainer" style={{ color: props.color }}>
      <div>{props.name}</div>
      <div>{formatNumber(props.curr_price)}</div>
    </div>
  );
};

export default StockText;

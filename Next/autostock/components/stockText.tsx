import React from "react";
import { Stock } from "./column";
import { formatNumber } from "./cell";

interface StockTextProps {
  name: string;
  curr_price: number;
}

const StockText: React.FC<StockTextProps> = (props) => {
  return (
    <div className="StockTextContainer">
      <div>{props.name}</div>
      <div>{formatNumber(props.curr_price)}</div>
    </div>
  );
};

export default StockText;

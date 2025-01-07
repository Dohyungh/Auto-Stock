import React from "react";
import { Stock } from "./column";

interface CellProps {
  text: string | number;
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = (props) => {
  return (
    <div
      className="Cell"
      onClick={() => {
        if (props.onClick) {
          props.onClick(); // 함수 호출 추가
        }
      }}
    >
      {props.text}
    </div>
  );
};

export default Cell;

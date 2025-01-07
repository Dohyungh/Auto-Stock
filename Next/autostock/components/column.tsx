import { useStockStore } from "@/store/stockStore";
import Cell from "./cell";
import { useEffect, useState } from "react";
import { deleteStock } from "@/api/api";
import { useAlarmStore } from "@/store/alarmStore";

interface ColumnProps {
  stock: Stock;
}

export interface Stock {
  id: string;
  name: string;
  first_buy: number;
  second_buy: number;
  first_sell: number;
  second_sell: number;
  third_sell: number;
  fourth_sell: number;
  fifth_sell: number;
  must_sell: number;
}

const Column: React.FC<ColumnProps> = (props) => {
  const stock = props.stock;

  const setCurrStock = useStockStore((state) => state.setCurrStock);
  const isUpdateModalOpen = useStockStore((state) => state.isUpdateModalOpen);
  const fetchStockList = useStockStore((state) => state.fetchStockList);
  const currAlarmState = useAlarmStore((state) => state.alarmState)[stock.id];

  const [currPosition, setCurrPosition] = useState<number>(-1);
  const [isMustSell, setIsMustSell] = useState<boolean>(false);

  useEffect(() => {
    console.log(isUpdateModalOpen);
  }, [isUpdateModalOpen]);

  useEffect(() => {
    if (currAlarmState) {
      setCurrPosition(currAlarmState.position);
      setIsMustSell(currAlarmState.under_must_sell);
    }
  }, [currAlarmState]);

  const handleDeleteStock = async (stock_id: string) => {
    const confirmed = confirm("정말 종목을 삭제하시겠습니까?");
    if (confirmed) {
      const resp = await deleteStock(stock_id);
      console.log(resp);
      fetchStockList();
    }
  };

  return (
    <div className="ColumnContainer">
      <Cell text={stock.id}></Cell>
      <Cell text={stock.name}></Cell>
      <Cell
        text={stock.second_buy}
        type={currPosition == 1 ? "Buy" : null}
      ></Cell>
      <Cell
        text={stock.first_buy}
        type={currPosition == 2 ? "Buy" : null}
      ></Cell>
      <Cell
        text={stock.first_sell}
        type={currPosition == 4 ? "Sell" : null}
      ></Cell>
      <Cell
        text={stock.second_sell}
        type={currPosition == 5 ? "Sell" : null}
      ></Cell>
      <Cell
        text={stock.third_sell}
        type={currPosition == 6 ? "Sell" : null}
      ></Cell>
      <Cell
        text={stock.fourth_sell}
        type={currPosition == 7 ? "Sell" : null}
      ></Cell>
      <Cell
        text={stock.fifth_sell}
        type={currPosition == 8 ? "Sell" : null}
      ></Cell>
      <Cell text={stock.must_sell} type={isMustSell ? "MustSell" : null}></Cell>
      <button
        onClick={() => {
          setCurrStock(stock); // stock을 전달하여 실행
        }}
      >
        수정
      </button>

      <button
        onClick={() => {
          handleDeleteStock(stock.id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Column;

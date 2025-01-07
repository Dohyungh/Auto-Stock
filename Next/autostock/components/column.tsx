import { useStockStore } from "@/store/store";
import Cell from "./cell";
import { useEffect } from "react";
import { deleteStock } from "@/api/api";

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
  useEffect(() => {
    console.log(isUpdateModalOpen);
  }, [isUpdateModalOpen]);

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
      <Cell text={stock.first_buy}></Cell>
      <Cell text={stock.second_buy}></Cell>
      <Cell text={stock.first_sell}></Cell>
      <Cell text={stock.second_sell}></Cell>
      <Cell text={stock.third_sell}></Cell>
      <Cell text={stock.fourth_sell}></Cell>
      <Cell text={stock.fifth_sell}></Cell>
      <Cell text={stock.must_sell}></Cell>
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

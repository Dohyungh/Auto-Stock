import Column from "./column";
import Cell from "./cell";
import { Stock } from "./column";
import { useEffect } from "react";
import { useStockStore } from "@/store/stockStore";

export default function Table() {
  const stockList = useStockStore((state) => state.stockList); // 상태 관리
  const fetchStockList = useStockStore((state) => state.fetchStockList);

  useEffect(() => {
    fetchStockList();
  }, [fetchStockList]); // 컴포넌트가 처음 렌더링될 때만 호출

  return (
    <>
      <div className="TableContainer">
        <div className="TableHead">
          <Cell text="종목 코드"></Cell>
          <Cell text="종목 명"></Cell>
          <Cell text="2단계 매수가"></Cell>
          <Cell text="1단계 매수가"></Cell>
          <Cell text="1단계 매도가"></Cell>
          <Cell text="2단계 매도가"></Cell>
          <Cell text="3단계 매도가"></Cell>
          <Cell text="4단계 매도가"></Cell>
          <Cell text="5단계 매도가"></Cell>
          <Cell text="손절가"></Cell>
        </div>
        {stockList.length > 0 ? (
          stockList.map((stock: Stock, idx) => {
            return <Column key={idx} stock={stock}></Column>;
          })
        ) : (
          <div className="NoData">주식 데이터가 없습니다.</div>
        )}
      </div>
    </>
  );
}

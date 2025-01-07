"use client";
import UpdateModal from "@/components/modal/updateModal";
import Table from "@/components/table";
import { useStockStore } from "@/store/stockStore";
import CreateModal from "@/components/modal/createModal";
import Alarm from "@/components/alarm";
export default function Home() {
  const isUpdateModalOpen = useStockStore((state) => state.isUpdateModalOpen);
  const isCreateModalOpen = useStockStore((state) => state.isCreateModalOpen);
  const setCreateModalOpen = useStockStore((state) => state.setCreateModalOpen);
  return (
    <div className="PageContainer">
      <div className="Header">
        <span>Auto Stock</span>
        <div className="HeaderButtonContainer">
          <button
            className="AddButton"
            onClick={() => {
              setCreateModalOpen(true);
            }}
          >
            종목 추가
          </button>
          {/* <button
          className="RefreshButton"
          onClick={() => {
            fetchStockList();
            }}
            >
            새로 고침
            </button> */}
        </div>
      </div>
      <Table></Table>
      <Alarm></Alarm>
      {isUpdateModalOpen ? <UpdateModal></UpdateModal> : []}
      {isCreateModalOpen ? <CreateModal></CreateModal> : []}
    </div>
  );
}

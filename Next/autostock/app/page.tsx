"use client";
import UpdateModal from "@/components/modal/updateModal";
import Table from "@/components/table";
import { useStockStore } from "@/store/store";
import CreateModal from "@/components/modal/createModal";

export default function Home() {
  const isUpdateModalOpen = useStockStore((state) => state.isUpdateModalOpen);
  const isCreateModalOpen = useStockStore((state) => state.isCreateModalOpen);
  return (
    <div className="PageContainer">
      <h1>Auto Stock</h1>
      <Table></Table>
      {isUpdateModalOpen ? <UpdateModal></UpdateModal> : []}
      {isCreateModalOpen ? <CreateModal></CreateModal> : []}
    </div>
  );
}

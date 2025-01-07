import { useStockStore } from "@/store/store";
import { Stock } from "../column";
import { useState, useEffect } from "react";
import { updateStock } from "@/api/api";

const stockKeyMapper: Record<keyof Stock, string> = {
  id: "종목 코드",
  name: "종목 명",
  first_buy: "1차 매수가",
  second_buy: "2차 매수가",
  first_sell: "1차 매도가",
  second_sell: "2차 매도가",
  third_sell: "3차 매도가",
  fourth_sell: "4차 매도가",
  fifth_sell: "5차 매도가",
  must_sell: "손절가",
};

const UpdateModal = () => {
  const currStock: Stock | null = useStockStore((state) => state.currStock);
  const setUpdateModalOpen = useStockStore((state) => state.setUpdateModalOpen);
  // `formData`를 초기화
  const [formData, setFormData] = useState<Stock | null>(currStock);
  const fetchStockList = useStockStore((state) => state.fetchStockList);
  // `currStock` 변경 시 `formData` 업데이트
  useEffect(() => {
    setFormData(currStock);
  }, [currStock]);

  const handleChange = (field: keyof Stock, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async () => {
    if (formData) {
      console.log("Updated Stock Data:", formData);
      const resp = await updateStock(formData.id, formData);
      console.log(resp);
      fetchStockList();
      setUpdateModalOpen(false);
    }
  };

  return (
    <div className="ModalContainer">
      <div className="ModalTitleContainer">
        <span>수정</span>
        <button
          className="CloseButton"
          onClick={() => setUpdateModalOpen(false)}
        >
          X
        </button>
      </div>
      <div className="ModalContent">
        {formData && (
          <>
            <div className="ModalField">
              <label htmlFor="id">{stockKeyMapper.id}</label>
              <input
                id="id"
                type="text"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                disabled
              />
            </div>
            <div className="ModalField">
              <label htmlFor="name">{stockKeyMapper.name}</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="first_buy">{stockKeyMapper.first_buy}</label>
              <input
                id="first_buy"
                type="number"
                value={formData.first_buy}
                onChange={(e) =>
                  handleChange("first_buy", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="second_buy">{stockKeyMapper.second_buy}</label>
              <input
                id="second_buy"
                type="number"
                value={formData.second_buy}
                onChange={(e) =>
                  handleChange("second_buy", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="first_sell">{stockKeyMapper.first_sell}</label>
              <input
                id="first_sell"
                type="number"
                value={formData.first_sell}
                onChange={(e) =>
                  handleChange("first_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="second_sell">{stockKeyMapper.second_sell}</label>
              <input
                id="second_sell"
                type="number"
                value={formData.second_sell}
                onChange={(e) =>
                  handleChange("second_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="third_sell">{stockKeyMapper.third_sell}</label>
              <input
                id="third_sell"
                type="number"
                value={formData.third_sell}
                onChange={(e) =>
                  handleChange("third_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="fourth_sell">{stockKeyMapper.fourth_sell}</label>
              <input
                id="fourth_sell"
                type="number"
                value={formData.fourth_sell}
                onChange={(e) =>
                  handleChange("fourth_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="fifth_sell">{stockKeyMapper.fifth_sell}</label>
              <input
                id="fifth_sell"
                type="number"
                value={formData.fifth_sell}
                onChange={(e) =>
                  handleChange("fifth_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
            <div className="ModalField">
              <label htmlFor="must_sell">{stockKeyMapper.must_sell}</label>
              <input
                id="must_sell"
                type="number"
                value={formData.must_sell}
                onChange={(e) =>
                  handleChange("must_sell", parseFloat(e.target.value))
                }
                required
              />
            </div>
          </>
        )}
      </div>
      <button className="SubmitButton" onClick={handleSubmit}>
        저장
      </button>
    </div>
  );
};

export default UpdateModal;

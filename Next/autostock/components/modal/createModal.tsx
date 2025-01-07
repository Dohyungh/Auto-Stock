import { useStockStore } from "@/store/store";
import { Stock } from "../column";
import { useState } from "react";
import { createStock } from "@/api/api";
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

const CreateModal = () => {
  const setCreateModalOpen = useStockStore((state) => state.setCreateModalOpen);
  const fetchStockList = useStockStore((state) => state.fetchStockList);
  // `formData` 초기화 (빈 값으로 설정)
  const [formData, setFormData] = useState<Stock>({
    id: "",
    name: "",
    first_buy: 0,
    second_buy: 0,
    first_sell: 0,
    second_sell: 0,
    third_sell: 0,
    fourth_sell: 0,
    fifth_sell: 0,
    must_sell: 0,
  });

  const handleChange = (field: keyof Stock, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    console.log("Created Stock Data:", formData);
    const resp = await createStock(formData);
    console.log(resp);
    fetchStockList();
    setCreateModalOpen(false);
  };

  return (
    <div className="ModalContainer">
      <div className="ModalTitleContainer">
        <span>추가</span>
        <button
          className="CloseButton"
          onClick={() => setCreateModalOpen(false)}
        >
          X
        </button>
      </div>
      <div className="ModalContent">
        <div className="ModalField">
          <label htmlFor="id">{stockKeyMapper.id}</label>
          <input
            id="id"
            type="text"
            value={formData.id}
            onChange={(e) => handleChange("id", e.target.value)}
            required
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
      </div>
      <button className="SubmitButton" onClick={handleSubmit}>
        종목 추가
      </button>
    </div>
  );
};

export default CreateModal;

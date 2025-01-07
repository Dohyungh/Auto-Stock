import axios from "axios";
import { Stock } from "@/components/column";

// API 기본 URL 설정
const apiUrl = "http://localhost:5000/autostock"; // Flask 서버 URL

// 종목 데이터 가져오기 (전체)
export const getStockList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/stocks`);
    return response.data;
  } catch (error) {
    console.error("주식 리스트 가져오기 실패:", error);
    throw error;
  }
};

// 특정 종목 데이터 가져오기 (id로 조회)
export const getStock = async (stockId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/stocks/${stockId}`);
    return response.data;
  } catch (error) {
    console.error("주식 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 새 종목 데이터 생성
export const createStock = async (newStockData: Stock) => {
  try {
    const response = await axios.post(`${apiUrl}/stock`, newStockData);
    return response.data;
  } catch (error) {
    console.error("주식 추가 실패:", error);
    throw error;
  }
};

// 종목 데이터 수정
export const updateStock = async (stockId: string, updatedStockData: Stock) => {
  try {
    const response = await axios.put(
      `${apiUrl}/stocks/${stockId}`,
      updatedStockData
    );
    return response.data;
  } catch (error) {
    console.error("주식 수정 실패:", error);
    throw error;
  }
};

// 종목 데이터 삭제
export const deleteStock = async (stockId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/stocks/${stockId}`);
    return response.data;
  } catch (error) {
    console.error("주식 삭제 실패:", error);
    throw error;
  }
};

// 알리미 업데이트 신청
export const getAlarmStock = async () => {
  try {
    const response = await axios.get(`${apiUrl}/stocks/alarm`);
    return response.data;
  } catch (error) {
    console.error("알리미 기능 실패:", error);
    throw error;
  }
};

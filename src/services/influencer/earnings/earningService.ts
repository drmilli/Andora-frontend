import type { EarningsResponse } from "@/types/influencer/earnings";
import type { TransactionResponse } from "@/types/transactions";
import api from "../../../lib/axios";


export const fetchEarnings = async (): Promise<EarningsResponse> => {
  const res = await api.get("/influencer/me/earnings");
  return res.data; 
};

export const fetchTransactions = async (
  page: number = 1,
  limit: number = 10
): Promise<TransactionResponse[]> => {
  const res = await api.get("/transactions/me", {
    params: { page, limit },
  });
  console.log("API transactions response:", res);
  return res.data; 
};

export interface WithdrawPayload {
  amount: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface WithdrawResponse {
  message?: string;
  withdrawalRequest?: unknown;
}

export const withdraw = async (
  payload: WithdrawPayload
): Promise<WithdrawResponse> => {
  const res = await api.post("/wallet/withdraw", payload);
  return res.data;
};

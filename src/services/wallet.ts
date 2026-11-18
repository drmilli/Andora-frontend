import api from "../lib/axios";

export interface Wallet {
  id: string;
  balance: number;
  userId: string;
}

export const getWallet = async (): Promise<Wallet> => {
  const res = await api.get("/wallet");
  return res.data;
};

/**
 * Start a Paystack deposit. Send the user to `authorization_url`; Paystack
 * brings them back to /dashboard/wallet?reference=..., where verifyDeposit runs.
 */
export const startDeposit = async (
  amount: number
): Promise<{ authorization_url: string; reference: string }> => {
  const res = await api.post("/wallet/fund", { amount });
  return res.data;
};

/** Confirms a deposit with Paystack and credits the wallet (safe to call twice). */
export const verifyDeposit = async (
  reference: string
): Promise<{ message: string; wallet: Wallet }> => {
  const res = await api.get("/wallet/verify", { params: { reference } });
  return res.data;
};

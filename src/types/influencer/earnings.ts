export interface EarningsResponse {
    walletId: string;
    available: number;
    pending: number;
    totalMade: number;
    withdrawals: {
        [key: string]: {
            count: number;
            amount: number;
        };
    };
}
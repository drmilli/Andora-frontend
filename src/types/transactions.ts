
export interface TransactionResponse {
    id: string;
    type: string;
    amount: number;
    reference: string;
    status: string;
    approved: boolean;
    userId: string;
    createdAt: string;

}


export interface GetAllTransactionsResponse {

    id: string;
    type: string;
    amount: number;
    reference: string;
    status: string;
    approved: boolean;
    userId: string;
    createdAt: string;
    user: {
        username: string;
        email: string;
    }

}
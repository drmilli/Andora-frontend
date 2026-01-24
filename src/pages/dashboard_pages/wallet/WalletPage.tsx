import React, { useState } from "react";
import { Search, X, Download, SquarePen, ChevronDown } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: "Pending" | "Successful" | "Failed";
}

const WalletPage: React.FC = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "Fund",
      date: "June 3, 3:40am",
      amount: "- ₦ 3,000.00",
      status: "Pending",
    },
    {
      id: "2",
      type: "Buy Coins",
      date: "June 3, 3:40am",
      amount: "- ₦ 3,000.00",
      status: "Successful",
    },
    {
      id: "3",
      type: "Withdrawal",
      date: "June 3, 3:40am",
      amount: "- ₦ 3,000.00",
      status: "Failed",
    },
    {
      id: "4",
      type: "Withdrawal",
      date: "June 3, 3:40am",
      amount: "- ₦ 3,000.00",
      status: "Failed",
    },
    {
      id: "5",
      type: "Withdrawal",
      date: "June 3, 3:40am",
      amount: "- ₦ 3,000.00",
      status: "Successful",
    },
  ];

  const handleViewDetails = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setShowSummaryModal(true);
  };

  return (
    <div className="w-full text-white bg-black min-h-screen px-4 sm:px-8 pb-16">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pt-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">HISTORY</h1>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A67102]" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full bg-[#111111] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#A67102] transition-colors placeholder-gray-500"
          />
        </div>
      </div>

      {/* Balance Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-12">
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          ₦104,000.00
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-[#E3EFFF] text-black px-10 sm:px-12 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap w-full sm:w-auto"
        >
          Withdraw
        </button>
      </div>

      {/* Transaction Groups */}
      <div className="space-y-12">
        <section>
          <h3 className="text-lg font-bold mb-6">This Week</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onView={() => handleViewDetails(tx)}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-6">2 weeks Ago</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <TransactionRow
                key={`old-${tx.id}`}
                transaction={tx}
                onView={() => handleViewDetails(tx)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#000000] border border-gray-800 w-full max-w-3xl rounded-2xl relative p-6 sm:p-10">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 sm:mb-10">
              Withdrawal
            </h2>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">
                  Select Bank
                </label>
                <div className="relative">
                  <select className="w-full bg-black border border-gray-800 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#A67102] appearance-none cursor-pointer">
                    <option>select</option>
                    <option>Zenith Bank</option>
                    <option>Kuda Bank</option>
                    <option>GTBank</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="acc no"
                  className="w-full bg-black border border-gray-800 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#A67102] placeholder-gray-600"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="enter name"
                  className="w-full bg-black border border-gray-800 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#A67102] placeholder-gray-600"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="enter amount"
                  className="w-full bg-black border border-gray-800 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#A67102] placeholder-gray-600"
                />
              </div>

              <div className="md:col-span-2">
                <button className="w-full bg-[#A67102] text-white py-4 rounded-xl font-bold text-sm tracking-wider hover:brightness-110 transition-all mt-2">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 text-white">
          <div className="bg-[#000000] border border-gray-800 w-full max-w-4xl rounded-2xl relative p-6 sm:p-10">
            <button
              onClick={() => setShowSummaryModal(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold">Summary</h2>
              <span className="text-sm font-bold text-white">
                Date: 03/06/24
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <SummaryRow label="Customer's Name" value="Abbey Thompson" />
              <SummaryRow label="Product Name" value="Coin Purchase" />
              <SummaryRow label="Product ID" value="13A57B80" />
              <SummaryRow label="Quantity" value="2,000.00C" />
              <SummaryRow label="Amount" value="50,000.00" />
              <SummaryRow label="Payment Types" value="Wallet" />
              <SummaryRow label="Time" value="3:40PM" />
              <SummaryRow label="Status" value="Successful" />
            </div>

            <div className="mb-10">
              <p className="text-sm font-bold text-white">
                For further enquires or to report an issue, Please contact
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <h3 className="text-xl font-bold">Thank You.</h3>
              <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Download size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionRow: React.FC<{
  transaction: Transaction;
  onView: () => void;
}> = ({ transaction, onView }) => {
  const statusColor = {
    Pending: "text-[#D9A102]",
    Successful: "text-[#4CAF50]",
    Failed: "text-[#FF5252]",
  }[transaction.status];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[1.1fr_1fr_1fr_1fr_auto] items-center gap-3 border border-gray-900 rounded-xl p-4 sm:p-5 hover:bg-white/[0.02] transition-all">
      <div className="space-y-1">
        <p className="text-[11px] text-gray-500 md:hidden">Type</p>
        <span className="text-sm font-medium">{transaction.type}</span>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] text-gray-500 md:hidden">Date</p>
        <span className="text-sm text-gray-500">{transaction.date}</span>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] text-gray-500 md:hidden">Amount</p>
        <span className="text-sm font-medium">{transaction.amount}</span>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] text-gray-500 md:hidden">Status</p>
        <span className={`text-sm font-medium ${statusColor}`}>
          {transaction.status}
        </span>
      </div>

      <div className="col-span-2 sm:col-span-4 md:col-span-1 flex md:justify-end">
        <button
          onClick={onView}
          className="flex items-center gap-2 border border-white rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all w-full md:w-auto justify-center"
        >
          <SquarePen size={12} />
          View
        </button>
      </div>
    </div>
  );
};

const SummaryRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 font-bold text-sm">{label}</span>
    <span className="font-bold text-sm">{value}</span>
  </div>
);

export default WalletPage;

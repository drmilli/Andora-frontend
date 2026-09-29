import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";

import { Download, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import type { EarningsResponse } from "@/types/influencer/earnings";
import { fetchEarnings, fetchTransactions, withdraw } from "@/services/influencer/earnings/earningService";
import { apiErrorMessage, formatNaira } from "@/lib/influencer";
import type { TransactionResponse } from "@/types/transactions";
function InfluencerWallet() {
  const summaries = [
    {
      id: 1,
      date: "03/06/24",
      customerName: "Abbey Thompson",
      bankName: "Coin Purchase",
      amount: "50,000.00",
      alert: "Debit",
      time: "3:40 PM",
      status: "Successful",
      type: "Buy Coins",
    },
    {
      id: 2,
      date: "12/07/24",
      customerName: "Michael Daniels",
      bankName: "Zenith Bank",
      amount: "15,200.00",
      alert: "Credit",
      time: "11:22 AM",
      status: "Successful",
      type: "Fund",
    },
    {
      id: 3,
      date: "25/08/24",
      customerName: "Sarah Williams",
      bankName: "GTBank",
      amount: "120,000.00",
      alert: "Debit",
      time: "9:15 AM",
      status: "Pending",
      type: "Withdrawal",
    },
    {
      id: 4,
      date: "01/09/24",
      customerName: "David Johnson",
      bankName: "Kuda Bank",
      amount: "8,500.00",
      alert: "Credit",
      time: "7:48 PM",
      status: "Successful",
      type: "Fund",
    },
    {
      id: 5,
      date: "18/10/24",
      customerName: "Emily Roberts",
      bankName: "Opay Transfer",
      amount: "32,900.00",
      alert: "Debit",
      time: "2:03 PM",
      status: "Failed",
      type: "Withdrawal",
    },
    {
      id: 6,
      date: "29/11/24",
      customerName: "Jason Carter",
      bankName: "First Bank",
      amount: "250,000.00",
      alert: "Debit",
      time: "10:56 AM",
      status: "Successful",
      type: "Withdrawal",
    },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Successful":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };
  const [earnings, setEarnings] = useState<EarningsResponse>();
  const [withdrawForm, setWithdrawForm] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    amount: "",
  });
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);

  const handleWithdraw = async () => {
    const amount = Number(withdrawForm.amount);
    setWithdrawError(null);
    setWithdrawSuccess(null);

    if (!withdrawForm.bankName) return setWithdrawError("Please select your bank.");
    if (!withdrawForm.accountNumber.trim()) return setWithdrawError("Enter your account number.");
    if (!withdrawForm.accountName.trim()) return setWithdrawError("Enter your account name.");
    if (!amount || amount <= 0) return setWithdrawError("Enter a valid amount.");
    if (earnings && amount > earnings.available) {
      return setWithdrawError("Amount is more than your available balance.");
    }

    try {
      setWithdrawing(true);
      await withdraw({
        amount,
        accountName: withdrawForm.accountName.trim(),
        accountNumber: withdrawForm.accountNumber.trim(),
        bankName: withdrawForm.bankName,
      });
      setWithdrawSuccess("Withdrawal requested. It is now pending approval.");
      setWithdrawForm({ bankName: "", accountNumber: "", accountName: "", amount: "" });
      // Balance and transaction list both change after a withdrawal
      const refreshed = await fetchEarnings();
      setEarnings(refreshed);
    } catch (err) {
      setWithdrawError(apiErrorMessage(err, "Withdrawal failed"));
    } finally {
      setWithdrawing(false);
    }
  };
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
console.log(setCurrentPage)
console.log(transactions)
console.log(loading)


  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchEarnings();

        setEarnings(response);

      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };
    //fetch transactions

    const loadTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetchTransactions(currentPage, 10);
        console.log("API transactions response:", response);

        setTransactions(response);
        // setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();


    loadRequests();
  }, [currentPage]);


  // Simple helpers for Previous / Next
  // const goToPreviousPage = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const goToNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  return (
    <div className='  px-10 '>
      <div className="">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className="h-[164px] border-0 bg-[#497718]">
                <CardContent className="text-white">
                  <div className="flex justify-between">
                    <p>Available Balance</p>
                    <span>{earnings?.withdrawals.approved.count}</span>
                  </div>
                  <p className="mt-10 text-3xl">₦{earnings?.withdrawals.approved.amount}</p>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className="h-[164px] border-0 bg-[#A67102]">
                <CardContent className="text-white">
                  <div className="flex justify-between">
                    <p>Pending Balance</p>
                    <span>{earnings?.withdrawals.pending.count}</span>
                  </div>
                  <p className="mt-10 text-3xl">₦{earnings?.withdrawals.pending.amount}</p>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Card className="h-[164px] border-0 bg-transparent">
                <CardContent className="text-white">
                  <div className="block">
                    <div className="float-right">
                      <p className="text-right text-sm mb-3">Total Made</p>
                      <span>₦{earnings?.totalMade}</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="float-right mt-10 p-3 w-[205px] h-[40.8px] bg-[#E8F1FF] text-black">
                          Withdraw
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="relative bottom-60 sm:relative sm:bottom-80 max-w-[600px] sm:max-w-[425px] border-0 bg-[#000000] overflow-y-auto w-full shadow-lg shadow-white">
                        <DialogHeader className="pt-5 text-white">
                          <h1>Withdrawal</h1>
                        </DialogHeader>

                        <DialogDescription asChild>
                          <div className="space-y-4 mt-4 text-white text-sm md:text-base">
                            <div className="flex flex-col space-y-4">
                              <div className="flex flex-col">
                                <label htmlFor="bank">Select Bank</label>
                                <select
                                  id="bank"
                                  value={withdrawForm.bankName}
                                  onChange={(e) =>
                                    setWithdrawForm((f) => ({ ...f, bankName: e.target.value }))
                                  }
                                  className="mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                                >
                                  <option value="">Select your bank</option>
                                  <option value="Zenith Bank">Zenith Bank</option>
                                  <option value="GTBank">GTBank</option>
                                  <option value="Access Bank">Access Bank</option>
                                  <option value="First Bank">First Bank</option>
                                  <option value="Kuda Bank">Kuda Bank</option>
                                  <option value="Opay">Opay</option>
                                </select>
                              </div>

                              <div className="flex flex-col">
                                <label htmlFor="accountNumber">Account Number</label>
                                <input
                                  type="text"
                                  id="accountNumber"
                                  inputMode="numeric"
                                  value={withdrawForm.accountNumber}
                                  onChange={(e) =>
                                    setWithdrawForm((f) => ({ ...f, accountNumber: e.target.value }))
                                  }
                                  className="mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                                  placeholder="Enter account number"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="accountName">Account Name</label>
                                <input
                                  type="text"
                                  id="accountName"
                                  value={withdrawForm.accountName}
                                  onChange={(e) =>
                                    setWithdrawForm((f) => ({ ...f, accountName: e.target.value }))
                                  }
                                  className="mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                                  placeholder="Enter account name"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="amount">Amount</label>
                                <input
                                  type="number"
                                  id="amount"
                                  min={1}
                                  max={earnings?.available ?? undefined}
                                  value={withdrawForm.amount}
                                  onChange={(e) =>
                                    setWithdrawForm((f) => ({ ...f, amount: e.target.value }))
                                  }
                                  className="mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                                  placeholder="Enter amount"
                                />
                                <span className="text-xs text-gray-400 mt-1">
                                  Available: {formatNaira(earnings?.available)}
                                </span>
                              </div>
                              {withdrawError && (
                                <p className="text-red-400 text-sm" role="alert">{withdrawError}</p>
                              )}
                              {withdrawSuccess && (
                                <p className="text-green-500 text-sm">{withdrawSuccess}</p>
                              )}
                            </div>
                          </div>
                        </DialogDescription>

                        <DialogFooter className="text-white">
                          <Button
                            type="button"
                            disabled={withdrawing}
                            onClick={handleWithdraw}
                            className="w-full bg-[#A67102] p-3 mt-6 disabled:opacity-50"
                          >
                            {withdrawing ? "Processing..." : "Proceed"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>


        </Carousel>
      </div>


      <div className="mt-10">
        <div className="mb-6">
          <h2 className="text-xl font-normal">This Week</h2>
        </div>
        <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-x-auto ">
          <div className="min-w-[600px] md:min-w-full max-w-6xl mx-auto">
            <table className="w-full">
              <tbody>
                {summaries.map((summary, index) => (
                  <tr
                    key={summary.id}
                    className={`border-b border-zinc-800 ${index === summaries.length - 1 ? "border-b-0" : ""
                      }`}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                      {summary.type}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-400">
                      {summary.date}{" "}
                      <span className="text-gray-500">{summary.time}</span>
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                      {summary.amount}
                    </td>

                    <td
                      className={`px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-right ${getStatusColor(
                        summary.status
                      )}`}
                    >
                      {summary.status}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-right  ">
                      <Dialog >
                        <DialogTrigger asChild>
                          <button className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 text-[10px] md:text-xs text-gray-300 border border-zinc-700 rounded-md hover:bg-zinc-900 transition-colors">
                            <NotebookPen className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            View
                          </button>
                        </DialogTrigger>

                        <DialogContent className="relative bottom-55 sm:relative sm:bottom-80 max-w-[600px] sm:max-w-[425px] border-0 bg-[#000000] overflow-y-auto w-full shadow-lg shadow-white"
                        >
                          <DialogHeader className="pt-5 text-white">
                            <div className="flex justify-between text-sm md:text-base">
                              <span>Summary</span>
                              <p>Date: {summary.date}</p>
                            </div>
                          </DialogHeader>

                          <DialogDescription className="space-y-4 mt-4 text-white text-sm md:text-base">
                            <div className="flex justify-between">
                              <span>Customer</span>
                              <p>{summary.customerName}</p>
                            </div>

                            <div className="flex justify-between">
                              <span>Bank Name</span>
                              <p>{summary.bankName}</p>
                            </div>

                            <div className="flex justify-between">
                              <span>Amount</span>
                              <p>₦{summary.amount}</p>
                            </div>

                            <div className="flex justify-between">
                              <span>Alert</span>
                              <p>{summary.alert}</p>
                            </div>

                            <div className="flex justify-between">
                              <span>Time</span>
                              <p>{summary.time}</p>
                            </div>

                            <div className="flex justify-between">
                              <span>Status</span>
                              <p className={getStatusColor(summary.status)}>
                                {summary.status}
                              </p>
                            </div>
                          </DialogDescription>

                          <DialogFooter className="text-white">
                            <div className="w-full space-y-4 text-xs md:text-sm">
                              <div className="mt-5">
                                For further enquiries or to report an issue, Please contact
                              </div>

                              <div className="flex justify-between mt-10">
                                <p>Thank You.</p>
                                <span className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] bg-zinc-900 rounded-full flex justify-center">
                                  <Download className="m-auto" />
                                </span>
                              </div>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default InfluencerWallet;

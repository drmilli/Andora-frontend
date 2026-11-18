import { MoreVertical, Plus, X } from 'lucide-react';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { fetchSentPromotionRequests } from '@/services/artist/promotions';
import { getWallet, startDeposit, verifyDeposit } from '@/services/wallet';
import { apiErrorMessage, formatNaira } from '@/lib/influencer';

const MIN_DEPOSIT = 100;
const QUICK_AMOUNTS = [5000, 20000, 50000, 100000];


    type Billing = {
  id: string;
  description: string;
  status: string;
  date: string;
  amount: string;
};

const statusStyles: Record<Billing["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102]",
  Completed: "bg-gray-700/40 text-gray-300",
  "Not Active": "bg-gray-800 text-gray-500",
};

function BillingPage() {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [billings, setBillings] = React.useState<Billing[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // --- Wallet ---
  const [searchParams, setSearchParams] = useSearchParams();
  const [balance, setBalance] = React.useState<number | null>(null);
  const [walletNotice, setWalletNotice] = React.useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [showTopUp, setShowTopUp] = React.useState(false);
  const [topUpAmount, setTopUpAmount] = React.useState('');
  const [topUpError, setTopUpError] = React.useState<string | null>(null);
  const [redirecting, setRedirecting] = React.useState(false);

  React.useEffect(() => {
    const reference = searchParams.get('reference') || searchParams.get('trxref');
    const run = async () => {
      // Coming back from Paystack: confirm the payment first, then load the balance
      if (reference) {
        try {
          const res = await verifyDeposit(reference);
          setBalance(res.wallet?.balance ?? 0);
          setWalletNotice({ kind: 'ok', text: 'Payment received. Your wallet has been topped up.' });
        } catch (err) {
          setWalletNotice({ kind: 'error', text: apiErrorMessage(err, 'We could not confirm that payment yet. If you were charged, refresh in a minute.') });
        } finally {
          searchParams.delete('reference');
          searchParams.delete('trxref');
          setSearchParams(searchParams, { replace: true });
        }
      }
      try {
        const w = await getWallet();
        setBalance(w.balance);
      } catch {
        setBalance((b) => b ?? null);
      }
    };
    run();
    // Only on first load: the params are cleared above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitTopUp = async () => {
    const amount = Number(topUpAmount);
    if (!Number.isFinite(amount) || amount < MIN_DEPOSIT) {
      setTopUpError(`Enter at least ${formatNaira(MIN_DEPOSIT)}.`);
      return;
    }
    try {
      setRedirecting(true);
      setTopUpError(null);
      const { authorization_url } = await startDeposit(amount);
      window.location.assign(authorization_url);
    } catch (err) {
      setTopUpError(apiErrorMessage(err, 'Could not start the payment. Try again.'));
      setRedirecting(false);
    }
  };

  // Billing lines are the promotions this artist has paid for
  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchSentPromotionRequests(1, 50);
        setBillings(
          res.data.map((r) => ({
            id: r.id,
            description: `${r.platform} promotion — ${r.influencer.username}`,
            status:
              r.status === 'COMPLETED'
                ? 'Completed'
                : r.status === 'ACCEPTED'
                ? 'Active'
                : 'Not Active',
            date: new Date(r.createdAt).toISOString().slice(0, 10),
            amount: formatNaira(r.amount).replace('₦', ''),
          }))
        );
      } catch (err) {
        setError(apiErrorMessage(err, 'Could not load your billing history'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  return (
    <div>
      {/* Wallet */}
      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wide">Wallet balance</p>
          <p className="text-3xl font-semibold text-white mt-1">
            {balance === null ? '—' : formatNaira(balance)}
          </p>
          <p className="text-gray-500 text-xs mt-1">Promotions and campaigns are paid from this balance.</p>
        </div>
        <button
          onClick={() => { setShowTopUp(true); setTopUpError(null); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Top up
        </button>
      </div>
      {walletNotice && (
        <p role="status" className={`mb-4 text-sm ${walletNotice.kind === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
          {walletNotice.text}
        </p>
      )}

      {showTopUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4" role="dialog" aria-modal="true" aria-labelledby="topup-title">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full relative">
            <button onClick={() => setShowTopUp(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close">
              <X size={20} />
            </button>
            <h2 id="topup-title" className="text-xl font-semibold mb-4">Top up wallet</h2>
            <label htmlFor="topup-amount" className="text-sm text-gray-300 block mb-2">Amount (₦)</label>
            <input
              id="topup-amount"
              type="number"
              inputMode="numeric"
              min={MIN_DEPOSIT}
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white"
              placeholder="e.g. 20000"
            />
            <div className="flex gap-2 flex-wrap mt-3">
              {QUICK_AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setTopUpAmount(String(a))}
                  className="px-3 py-1.5 rounded-full text-xs bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                >
                  {formatNaira(a)}
                </button>
              ))}
            </div>
            {topUpError && <p className="text-red-400 text-sm mt-3" role="alert">{topUpError}</p>}
            <button
              onClick={submitTopUp}
              disabled={redirecting}
              className="w-full mt-5 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] font-medium disabled:opacity-50"
            >
              {redirecting ? 'Opening Paystack...' : 'Continue to payment'}
            </button>
            <p className="text-gray-500 text-xs mt-3 text-center">You'll be taken to Paystack to pay securely, then brought back here.</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className='bg-[#0D0B07]'>
              <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium ">Status</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="px-6 py-6 text-gray-400">Loading...</td></tr>
              )}
              {error && (
                <tr><td colSpan={5} className="px-6 py-6 text-red-400">{error}</td></tr>
              )}
              {!loading && !error && billings.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-6 text-gray-400">No billing history yet.</td></tr>
              )}
              {billings.map((billing) => (
                <tr
                  key={billing.id}
                  className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3">
                  {billing.date}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[billing.status]}`}
                    >
                      {billing.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-300">{billing.description}</td>
                  <td className="px-6 py-3 text-gray-300">{billing.amount}</td>
                  <td className="px-6 py-3 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === billing.id ? null : billing.id)
                      }
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === billing.id && (
                      <div className="absolute right-6 top-10 z-10 bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-lg overflow-hidden w-36">
                        <button className="w-full text-left text-xs text-gray-300 hover:bg-white/5 px-4 py-2.5">
                          View
                        </button>
                        {billing.status === "Not Active" && (
                          <button className="w-full text-left text-xs text-[#A67102] hover:bg-white/5 px-4 py-2.5">
                            Start Campaign
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></div>
  )
}

export default BillingPage
import React from "react";
import { fetchDisputes, resolveDispute, type AdminDispute } from "@/services/admin/adminService";
import { apiErrorMessage, formatNaira, formatRelativeTime } from "@/lib/influencer";

type Pending = { dispute: AdminDispute; outcome: "pay_influencer" | "refund_artist" } | null;

function AdminDisputes() {
  const [tab, setTab] = React.useState<"open" | "resolved">("open");
  const [disputes, setDisputes] = React.useState<AdminDispute[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState<Pending>(null);
  const [note, setNote] = React.useState("");
  const [acting, setActing] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDisputes(await fetchDisputes(tab));
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load disputes"));
    } finally {
      setLoading(false);
    }
  }, [tab]);

  React.useEffect(() => {
    load();
  }, [load]);

  const confirm = async () => {
    if (!pending) return;
    try {
      setActing(true);
      setError(null);
      const res = await resolveDispute(pending.dispute.id, pending.outcome, note.trim() || undefined);
      setNotice(res.message);
      setPending(null);
      setNote("");
      await load();
    } catch (err) {
      setPending(null);
      setError(apiErrorMessage(err, "Could not resolve this dispute"));
    } finally {
      setActing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">DISPUTES</h1>
        <p className="text-gray-400 text-sm mb-6">
          Payment on a disputed promotion is held until you decide who gets it.
        </p>

        <div className="flex gap-3 mb-6">
          {(["open", "resolved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setNotice(null); }}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize ${
                tab === t ? "bg-[#A67102] text-white" : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
        {notice && !error && <p className="text-green-400 text-sm mb-4" role="status">{notice}</p>}
        {!loading && !error && disputes.length === 0 && (
          <p className="text-gray-400">{tab === "open" ? "No open disputes." : "No resolved disputes yet."}</p>
        )}

        <div className="space-y-4">
          {disputes.map((d) => (
            <div key={d.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
              <div className="flex justify-between gap-4 flex-wrap">
                <div className="min-w-[240px]">
                  <p className="text-white font-medium">
                    {d.artist.username} <span className="text-gray-500">hired</span> {d.influencer.username}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">
                    {d.platform} &bull; {formatNaira(d.amount)} &bull; {d.progress}% reported
                    {d.campaign ? ` • ${d.campaign.tier} campaign` : ""}
                  </p>
                  {d.media && (
                    <a href={d.media.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#A67102] text-xs underline mt-1 inline-block">
                      {d.media.title ?? "Track"}
                    </a>
                  )}
                </div>
                <div className="text-right text-xs text-gray-500">
                  {d.disputedAt && <p>Disputed {formatRelativeTime(d.disputedAt)}</p>}
                  {tab === "resolved" && (
                    <p className="text-gray-300 mt-1">
                      {d.status === "COMPLETED" ? "Paid to influencer" : "Refunded to artist"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Brief</p>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{d.message}</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#A67102]/40">
                  <p className="text-gray-500 text-xs mb-1">Dispute reason</p>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{d.disputeReason}</p>
                </div>
              </div>

              {tab === "open" && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => setPending({ dispute: d, outcome: "pay_influencer" })}
                    className="px-4 py-2 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-lg text-sm font-medium"
                  >
                    Pay influencer
                  </button>
                  <button
                    onClick={() => setPending({ dispute: d, outcome: "refund_artist" })}
                    className="px-4 py-2 border border-gray-600 hover:bg-[#2a2a2a] text-white rounded-lg text-sm font-medium"
                  >
                    Refund artist
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {pending && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4" role="dialog" aria-modal="true" aria-labelledby="resolve-title">
            <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full">
              <h2 id="resolve-title" className="text-xl font-semibold mb-3">
                {pending.outcome === "pay_influencer" ? "Pay influencer?" : "Refund artist?"}
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                {formatNaira(pending.dispute.amount)} will go to{" "}
                <strong>
                  {pending.outcome === "pay_influencer" ? pending.dispute.influencer.username : pending.dispute.artist.username}
                </strong>
                . Both sides are notified. This can't be undone.
              </p>
              <label htmlFor="resolve-note" className="text-sm text-gray-400 block mb-2">
                Note to both parties (optional)
              </label>
              <textarea
                id="resolve-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white text-sm"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={confirm}
                  disabled={acting}
                  className="flex-1 px-4 py-2.5 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {acting ? "Saving..." : "Confirm"}
                </button>
                <button
                  onClick={() => { setPending(null); setNote(""); }}
                  className="flex-1 px-4 py-2.5 border border-gray-600 hover:bg-[#2a2a2a] text-white rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDisputes;

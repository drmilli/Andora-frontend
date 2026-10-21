import { Frown } from "lucide-react";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Campaign as CampaignType, CampaignPackage } from "@/types/artist/campaign";
import {
  cancelCampaign,
  createCampaign,
  fetchCampaignPackages,
  fetchCampaigns,
} from "@/services/artist/campaigns";
import { getUserMedia } from "@/services/media";
import type { Media } from "@/types/media";
import { apiErrorMessage, formatNaira, platformIcon } from "@/lib/influencer";

const statusStyles: Record<CampaignType["status"], string> = {
  ACTIVE: "bg-[#A67102]/20 text-[#A67102]",
  COMPLETED: "bg-gray-700/40 text-gray-300",
  CANCELLED: "bg-gray-800 text-gray-500",
};

export const Campaign: React.FC = () => {
  const [packages, setPackages] = React.useState<CampaignPackage[]>([]);
  const [campaigns, setCampaigns] = React.useState<CampaignType[]>([]);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  // Start Campaign dialog
  const [open, setOpen] = React.useState(false);
  const [tier, setTier] = React.useState<CampaignPackage["tier"] | "">("");
  const [mediaId, setMediaId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [cancelling, setCancelling] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [pkgs, list] = await Promise.all([
        fetchCampaignPackages(),
        fetchCampaigns(1, 50),
      ]);
      setPackages(pkgs);
      setCampaigns(list.data);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load your campaigns"));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    getUserMedia()
      .then(setMedia)
      .catch(() => setMedia([]));
  }, []);

  const openDialog = (preselect?: CampaignPackage["tier"]) => {
    setTier(preselect ?? "");
    setMediaId("");
    setMessage("");
    setError(null);
    setNotice(null);
    setOpen(true);
  };

  const submit = async () => {
    if (!tier) {
      setError("Pick a package first.");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const created = await createCampaign({
        tier,
        mediaId: mediaId || null,
        message: message.trim() || undefined,
      });
      setOpen(false);
      setNotice(
        `Campaign started — ${created.assigned} influencer${created.assigned === 1 ? "" : "s"} assigned, ${formatNaira(created.budget)} held until the work completes.`
      );
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not start the campaign"));
    } finally {
      setSubmitting(false);
    }
  };

  const onCancel = async (campaign: CampaignType) => {
    if (
      !window.confirm(
        "Cancel this campaign? Requests no influencer has accepted yet are refunded; accepted work keeps running."
      )
    )
      return;
    try {
      setCancelling(campaign.id);
      setError(null);
      const res = await cancelCampaign(campaign.id);
      setNotice(res.message);
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not cancel the campaign"));
    } finally {
      setCancelling(null);
    }
  };

  const selected = packages.find((p) => p.tier === tier);

  return (
    <div className="w-full pb-28 md:pb-0">
      {/* Start a new campaign */}
      <div className="rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
          <div>
            <h3 className="text-white text-lg font-semibold mb-1">Start a new campaign</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wide">
              Audora auto-assigns influencers based on your package.
            </p>
          </div>
          <Button
            onClick={() => openDialog()}
            disabled={packages.length === 0}
            className="bg-[#A67102] disabled:opacity-50"
          >
            Start Campaign
          </Button>
        </div>

        {notice && <p className="text-green-500 text-sm mb-3">{notice}</p>}
        {error && !open && (
          <p className="text-red-400 text-sm mb-3" role="alert">
            {error}
          </p>
        )}

        {/* Packages come from the API so the price shown is the price charged */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <button
              type="button"
              key={pkg.tier}
              onClick={() => openDialog(pkg.tier)}
              className="bg-[#0D0B07] border border-gray-800 hover:border-[#A67102] rounded-xl p-4 flex justify-between items-start text-left transition-colors"
            >
              <div>
                <p className="text-white text-sm font-medium">{pkg.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Influencer ({pkg.influencerCount}) &bull; {pkg.durationDays} days
                </p>
              </div>
              <p className="text-white text-sm font-semibold whitespace-nowrap">
                {formatNaira(pkg.budget)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 overflow-hidden">
        {loading ? (
          <p className="text-gray-400 text-sm px-6 py-10">Loading your campaigns...</p>
        ) : campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center mb-5">
              <Frown size={28} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm mb-5">
              Oops!! Nothing to see here, Click the "Start Campaign" button to start
            </p>
            <button
              onClick={() => openDialog()}
              className="border border-[#A67102] text-[#A67102] hover:bg-[#A67102]/10 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Start Campaign
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                  <th className="px-6 py-4 font-medium">Track</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Influencers</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium">Budget</th>
                  <th className="px-6 py-4 font-medium">Started</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">
                          {c.media?.title ?? "No track attached"}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {c.tier} &bull; {c.durationDays} days
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1">
                        {c.requests.slice(0, 4).map((r) => (
                          <img
                            key={r.id}
                            src={platformIcon(r.platform)}
                            alt={r.platform}
                            title={`${r.influencer.username} — ${r.status}`}
                            className="w-4 h-4 object-contain"
                          />
                        ))}
                        <span className="text-gray-300 ml-1">{c.assigned}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#A67102]"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs">{c.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-300">{formatNaira(c.budget)}</td>
                    <td className="px-6 py-3 text-gray-300">
                      {new Date(c.startedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {c.status === "ACTIVE" ? (
                        <button
                          onClick={() => onCancel(c)}
                          disabled={cancelling === c.id}
                          className="text-xs text-gray-300 border border-zinc-700 rounded-md px-3 py-1.5 hover:bg-zinc-900 disabled:opacity-40"
                        >
                          {cancelling === c.id ? "Cancelling..." : "Cancel"}
                        </button>
                      ) : (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Start Campaign dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[500px] border-0 bg-black text-white shadow-lg shadow-white/20">
          <DialogHeader className="pt-4">
            <h2 className="text-xl">Start a campaign</h2>
            <p className="text-sm text-gray-400">
              Audora picks the influencers for you.
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="flex flex-col">
              <label htmlFor="campaign-tier" className="text-sm mb-1">
                Package
              </label>
              <select
                id="campaign-tier"
                value={tier}
                onChange={(e) => setTier(e.target.value as CampaignPackage["tier"])}
                className="p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
              >
                <option value="">Select a package</option>
                {packages.map((p) => (
                  <option key={p.tier} value={p.tier}>
                    {p.name} — {formatNaira(p.budget)} ({p.influencerCount} influencers,{" "}
                    {p.durationDays} days)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="campaign-media" className="text-sm mb-1">
                Track (optional)
              </label>
              <select
                id="campaign-media"
                value={mediaId}
                onChange={(e) => setMediaId(e.target.value)}
                className="p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
              >
                <option value="">No track attached</option>
                {media.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title || "Untitled"} ({m.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="campaign-message" className="text-sm mb-1">
                Brief (optional)
              </label>
              <textarea
                id="campaign-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white resize-none"
                placeholder="Tell the influencers what you want..."
              />
            </div>

            {selected && (
              <p className="text-xs text-gray-400">
                {formatNaira(selected.budget)} comes out of your wallet now and is held
                until each influencer finishes. Anyone who declines is refunded
                automatically. If fewer than {selected.influencerCount} influencers are
                available you are only charged for those assigned.
              </p>
            )}

            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              disabled={submitting || !tier}
              onClick={submit}
              className="w-full bg-[#A67102] h-[48px] disabled:opacity-50"
            >
              {submitting ? "Starting..." : "Start campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaign;

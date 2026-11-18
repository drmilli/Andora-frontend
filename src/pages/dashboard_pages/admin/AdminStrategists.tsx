import React from "react";
import { Search } from "lucide-react";
import { fetchUsers, setUserRole } from "@/services/admin/adminService";
import type { AdminUser } from "@/types/admin/admin";
import { apiErrorMessage } from "@/lib/influencer";
import { UserAvatar } from "@/components/community/UserAvatar";
import { displayName } from "@/components/community/displayName";

/** Grant and remove Campaign Strategist access. Strategists review every campaign before it goes live. */
function AdminStrategists() {
  const [strategists, setStrategists] = React.useState<AdminUser[] | null>(null);
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState<AdminUser[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    fetchUsers({ role: "campaign_strategist", limit: 100 })
      .then((r) => setStrategists(r.data))
      .catch((err) => setError(apiErrorMessage(err, "Could not load strategists")));
  }, []);
  React.useEffect(load, [load]);

  // Debounced search for people to promote
  React.useEffect(() => {
    const q = input.trim();
    const t = setTimeout(() => {
      if (!q) return setResults([]);
      fetchUsers({ search: q, banned: false, limit: 10 })
        .then((r) => setResults(r.data.filter((u) => !["campaign_strategist", "admin", "superadmin"].includes(u.role))))
        .catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(t);
  }, [input]);

  const change = async (user: AdminUser, role: string) => {
    const promoting = role === "campaign_strategist";
    const ok = window.confirm(
      promoting
        ? `Make ${displayName(user)} a Campaign Strategist? They'll be able to approve and decline every campaign submission.`
        : `Remove strategist access from ${displayName(user)}? Their account becomes a regular artist account.`
    );
    if (!ok) return;
    try {
      setBusy(user.id);
      setError(null);
      const res = await setUserRole(user.id, role);
      setNotice(res.message);
      if (promoting) {
        setInput("");
        setResults([]);
      }
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not change the role"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">STRATEGISTS</h1>
        <p className="text-gray-400 text-sm mb-6">
          Campaign strategists review every campaign before it goes live. They can approve it (influencers are assigned)
          or decline it with a reason (the artist is refunded).
        </p>

        {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
        {notice && !error && <p className="text-green-400 text-sm mb-4" role="status">{notice}</p>}

        <section className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 mb-6">
          <h2 className="font-semibold mb-3">Add a strategist</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            <label htmlFor="promote-search" className="sr-only">Search users by name, username or email</label>
            <input
              id="promote-search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search users by name, username or email"
              className="w-full p-3 pl-9 bg-zinc-900 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-[#A67102]"
            />
          </div>
          {input.trim() && results.length === 0 && <p className="text-gray-500 text-sm mt-3">No matching users.</p>}
          <ul className="mt-3 space-y-2">
            {results.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 bg-[#1a1a1a] rounded-lg p-3">
                <span className="flex items-center gap-3 min-w-0">
                  <UserAvatar user={u} size="sm" />
                  <span className="min-w-0">
                    <span className="block text-sm truncate">{displayName(u)}</span>
                    <span className="block text-xs text-gray-500 truncate">@{u.username} &bull; {u.email} &bull; <span className="capitalize">{u.role}</span></span>
                  </span>
                </span>
                <button
                  disabled={busy === u.id}
                  onClick={() => change(u, "campaign_strategist")}
                  className="px-4 py-2 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-lg text-xs font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  Make strategist
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Current strategists ({strategists?.length ?? 0})</h2>
          {strategists === null && !error && <p className="text-gray-400 text-sm">Loading...</p>}
          {strategists?.length === 0 && (
            <p className="text-gray-400 text-sm">No strategists yet. Until you add one, submitted campaigns wait in review.</p>
          )}
          <ul className="space-y-2">
            {strategists?.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 bg-[#0D0B07] border border-gray-900 rounded-xl p-4">
                <span className="flex items-center gap-3 min-w-0">
                  <UserAvatar user={u} size="sm" />
                  <span className="min-w-0">
                    <span className="block text-sm truncate">{displayName(u)}</span>
                    <span className="block text-xs text-gray-500 truncate">@{u.username} &bull; {u.email}</span>
                  </span>
                </span>
                <button
                  disabled={busy === u.id}
                  onClick={() => change(u, "artist")}
                  className="px-4 py-2 border border-gray-600 hover:bg-[#2a2a2a] text-white rounded-lg text-xs font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  Remove access
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminStrategists;

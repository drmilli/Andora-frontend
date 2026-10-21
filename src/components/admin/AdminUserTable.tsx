import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NotebookPen, Ban, Search } from "lucide-react";
import type { AdminUser } from "@/types/admin/admin";
import { fetchUsers, toggleBanUser } from "@/services/admin/adminService";
import { apiErrorMessage } from "@/lib/influencer";

interface Props {
  /** Backend role filter — "influencer", "artist", "producer", ... */
  role: string;
  /** Which count to show in the last data column */
  countField?: "promotionsReceived" | "promotionsSent" | "uploadedMedia";
  countLabel?: string;
  /** Route prefix for the View link, relative to the current admin route */
  detailBase?: string;
}

export function AdminUserTable({
  role,
  countField = "promotionsReceived",
  countLabel = "Total Jobs",
  detailBase = "",
}: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchUsers({
        role,
        search: search.trim() || undefined,
        page,
        limit: 20,
      });
      setUsers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load users"));
    } finally {
      setLoading(false);
    }
  }, [role, search, page]);

  // Debounce so typing doesn't fire a request per keystroke
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const onToggleBan = async (user: AdminUser) => {
    const verb = user.isBanned ? "unban" : "ban";
    if (!window.confirm(`Are you sure you want to ${verb} ${user.username}?`)) return;
    try {
      setBusyId(user.id);
      setError(null);
      await toggleBanUser(user.id);
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, `Could not ${verb} this user`));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mt-10">
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A67102]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, username or email"
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#A67102]"
          />
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3">
          <span className="text-gray-300 text-sm">{total} listed</span>
          <div className="flex justify-center items-center text-gray-300 text-sm">
            <p className="mr-1">Page</p>
            <div className="border-[#A67102] border px-3 py-0.5 rounded-lg mx-2">
              {page}
            </div>
            / <div className="mx-2">{totalPages || 1}</div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="bg-[#A67102] rounded-full disabled:opacity-40"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className="border-[#A67102] border rounded-full disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[600px] md:min-w-full max-w-6xl mx-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#A67102] rounded-lg">
                <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 rounded-l-lg">
                  Username
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                  Phone Number
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                  Email
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                  {countLabel}
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 rounded-r-lg">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-zinc-950 border border-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-400 text-sm">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-400 text-sm">
                    No {role}s found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-zinc-800 w-full ${
                      index === users.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 rounded-l-lg">
                      {user.firstname} {user.surname}
                      <span className="block text-gray-500">@{user.username}</span>
                      {user.isBanned && (
                        <span className="text-red-400 text-[10px]">BANNED</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-400">
                      {user.phone ?? "—"}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                      {user.email}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 text-center">
                      {(user as AdminUser & {
                        _count?: Record<string, number>;
                      })._count?.[countField] ?? 0}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 rounded-r-lg">
                      <div className="flex gap-2 justify-end">
                        <Link to={`${detailBase}${user.id}`}>
                          <button className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 text-[10px] md:text-xs text-gray-300 border border-zinc-700 rounded-md hover:bg-zinc-900 transition-colors">
                            <NotebookPen className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => onToggleBan(user)}
                          disabled={busyId === user.id}
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 text-[10px] md:text-xs text-gray-300 border border-zinc-700 rounded-md hover:bg-zinc-900 transition-colors disabled:opacity-40"
                        >
                          <Ban className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUserTable;

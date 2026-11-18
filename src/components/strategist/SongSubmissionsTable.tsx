import React from "react";
import type { StrategistSubmission } from "@/types/strategist";
import { formatNaira } from "@/lib/influencer";
import { UserAvatar } from "@/components/community/UserAvatar";
import { displayName } from "@/components/community/displayName";
import { defaultStatusStyles } from "./statusStyles";

type Props = {
  rows: StrategistSubmission[];
  onReview?: (id: string) => void;
  emptyText?: string;
};

export const SongSubmissionsTable: React.FC<Props> = ({
  rows,
  onReview,
  emptyText = "No song submissions match these filters.",
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-xs text-gray-400">
            <th className="px-4 py-2 font-medium">Track</th>
            <th className="px-4 py-2 font-medium">Artist</th>
            <th className="px-4 py-2 font-medium">Genre</th>
            <th className="px-4 py-2 font-medium">Goal</th>
            <th className="px-4 py-2 font-medium">Budget</th>
            <th className="px-4 py-2 font-medium">Submitted</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={8} className="rounded-xl bg-[#15120C] px-4 py-8 text-center text-sm text-gray-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="text-sm text-gray-200">
                <td className="rounded-l-xl bg-[#15120C] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={row.artist} size="sm" />
                    <span className="font-medium text-white">{row.track?.title || "Untitled"}</span>
                  </div>
                </td>
                <td className="bg-[#15120C] px-4 py-3">{displayName(row.artist)}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.genre || "—"}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.goal || "—"}</td>
                <td className="bg-[#15120C] px-4 py-3">
                  {formatNaira(row.budget)}
                  <span className="block text-[11px] text-gray-500">{row.packageName}</span>
                </td>
                <td className="bg-[#15120C] px-4 py-3">{new Date(row.submittedAt).toLocaleDateString("en-GB")}</td>
                <td className="bg-[#15120C] px-4 py-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${defaultStatusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="rounded-r-xl bg-[#15120C] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onReview?.(row.id)}
                    className="rounded-md border border-gray-700 bg-[#1A1A1A] px-3 py-1 text-xs text-white hover:border-[#A67102]"
                  >
                    {row.status === "Pending" ? "Review" : "View"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

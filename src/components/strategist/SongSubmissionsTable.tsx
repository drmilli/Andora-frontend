import React from "react";
import type { SongSubmission } from "@/pages/dashboard_pages/strategist/mockData";

export const defaultStatusStyles: Record<SongSubmission["status"], string> = {
  Pending: "bg-[#A67102]/20 text-[#A67102]",
  Approved: "bg-green-500/20 text-green-500",
  Declined: "bg-red-500/20 text-red-500",
};

type Props = {
  rows: SongSubmission[];
  statusStyles?: Record<SongSubmission["status"], string>;
  onReview?: (id: string) => void;
};

export const SongSubmissionsTable: React.FC<Props> = ({
  rows,
  statusStyles = defaultStatusStyles,
  onReview,
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
            <th className="px-4 py-2 font-medium">Uploaded</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={8} className="rounded-xl bg-[#15120C] px-4 py-8 text-center text-sm text-gray-500">
                No song submissions match these filters.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="text-sm text-gray-200">
                <td className="rounded-l-xl bg-[#15120C] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.artwork}
                      alt={row.track}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="font-medium text-white">{row.track}</span>
                  </div>
                </td>
                <td className="bg-[#15120C] px-4 py-3">{row.artist}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.genre}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.goal}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.budget}</td>
                <td className="bg-[#15120C] px-4 py-3">{row.uploaded}</td>
                <td className="bg-[#15120C] px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="rounded-r-xl bg-[#15120C] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onReview?.(row.id)}
                    className="rounded-md border border-gray-700 bg-[#1A1A1A] px-3 py-1 text-xs text-white hover:border-[#A67102]"
                  >
                    Review
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

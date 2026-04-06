/**
 * Data structure sent to the backend for scheduling a media release.
 *
 * - `date`        — ISO date string "YYYY-MM-DD"
 * - `time`        — 24-hour time "HH:MM" (derived from displayTime + period)
 * - `period`      — "AM" | "PM" (as chosen by the user)
 * - `scheduledAt` — Full ISO 8601 datetime "YYYY-MM-DDTHH:MM:00" (ready for the API)
 */
export interface ScheduleData {
  date: string;
  time: string;
  period: "AM" | "PM";
  scheduledAt: string;
}

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import type { ScheduleData } from "@/types/schedule";

// =====================================================
// SCHEDULE STEP COMPONENT
// =====================================================
//
// This component lets the user pick a DATE and TIME
// for when their music should be released.
//
// HOW IT WORKS (step by step):
//   1. User scrolls through the amber time buttons and taps one (e.g. "9:30")
//   2. User taps the up/down arrows to pick AM or PM
//   3. User taps a day in the calendar to pick a release date
//   4. Both must be chosen before the "Continue" button unlocks
//   5. When "Continue" is clicked we package the data and send it to the parent (MediaPage)
//
// =====================================================


// ---- LIST OF MONTH NAMES ----
// Index 0 = January, index 1 = February, … index 11 = December
const ALL_MONTHS = [
  "January", "February", "March",    "April",
  "May",     "June",     "July",      "August",
  "September","October", "November",  "December",
];

// ---- DAYS OF THE WEEK ----
// These are shown as column headers in the calendar grid.
// The calendar starts on Monday (Mon = first column, Sun = last column).
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ---- BUILD THE TIME SLOT LIST ----
// We want every half-hour from 12:00 to 11:30 in 12-hour format.
// Example output: ["12:00", "12:30", "1:00", "1:30", ... "11:00", "11:30"]
function buildTimeSlots(): string[] {
  const slots: string[] = [];

  for (let hour = 0; hour < 12; hour++) {
    // In 12-hour format, hour 0 is displayed as 12 (midnight / noon)
    const displayHour = hour === 0 ? 12 : hour;

    slots.push(`${displayHour}:00`); // e.g. "1:00"
    slots.push(`${displayHour}:30`); // e.g. "1:30"
  }

  return slots;
}

// Build the list once and store it — we never need to rebuild it
const TIME_SLOTS = buildTimeSlots();

// How many months to show side-by-side in the calendar
const MONTHS_TO_SHOW = 4;


// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Returns the total number of days in a given month.
// Example: getDaysInMonth(2024, 1) → 29 (February 2024 is a leap year)
function getDaysInMonth(year: number, month: number): number {
  // Trick: "day 0" of the NEXT month = the last day of the CURRENT month
  return new Date(year, month + 1, 0).getDate();
}

// Returns which column (0=Mon … 6=Sun) the 1st day of the month falls on.
// We need this to know how many empty cells to put before day 1 in the grid.
function getFirstDayColumn(year: number, month: number): number {
  // JavaScript's getDay() returns 0=Sunday, 1=Monday … 6=Saturday
  const rawDay = new Date(year, month, 1).getDay();

  // Rearrange so Monday = 0, Tuesday = 1 … Sunday = 6
  return (rawDay + 6) % 7;
}

// Converts 12-hour time + period to 24-hour format (what the backend expects).
// Examples:
//   "10:30" + "AM" → "10:30"
//   "10:30" + "PM" → "22:30"
//   "12:00" + "AM" → "00:00"  (midnight)
//   "12:00" + "PM" → "12:00"  (noon — stays the same)
function convertTo24Hour(time12: string, period: "AM" | "PM"): string {
  const [hourStr, minuteStr] = time12.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === "AM") {
    // Special case: 12:xx AM is actually 0:xx (midnight)
    if (hour === 12) hour = 0;
  } else {
    // PM: add 12 to everything except 12 itself (12 PM stays 12)
    if (hour !== 12) hour = hour + 12;
  }

  // Make sure hour and minute are always 2 digits: 9 → "09"
  const paddedHour   = String(hour).padStart(2, "0");
  const paddedMinute = String(minute).padStart(2, "0");

  return `${paddedHour}:${paddedMinute}`;
}

// Converts a JavaScript Date object to the "YYYY-MM-DD" string the backend uses.
// Example: new Date(2022, 0, 6) → "2022-01-06"
function toISODateString(date: Date): string {
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day   = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Returns a human-readable date string for display in the UI.
// Example: new Date(2022, 0, 6) → "6. January 2022"
function formatFriendlyDate(date: Date): string {
  const day       = date.getDate();
  const monthName = ALL_MONTHS[date.getMonth()];
  const year      = date.getFullYear();

  return `${day}. ${monthName} ${year}`;
}


// =====================================================
// MONTH GRID — draws one month's calendar (7-column grid)
// =====================================================

interface MonthGridProps {
  year: number;
  month: number;          // 0 = January … 11 = December
  selectedDate: Date | null;
  onDateSelect: (pickedDate: Date) => void;
}

function MonthGrid({ year, month, selectedDate, onDateSelect }: MonthGridProps) {
  // Total days in this month (28 / 29 / 30 / 31)
  const totalDays = getDaysInMonth(year, month);

  // How many blank cells to show before day 1 (so day 1 lands in the right column)
  const leadingBlanks = getFirstDayColumn(year, month);

  // Build the full list of cells to render in the grid:
  //   [ null, null, 1, 2, 3, … totalDays ]   ← nulls are the blank spacers
  const cells: (number | null)[] = [];

  // 1. Add the blank spacer cells at the start
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push(null);
  }

  // 2. Add the real day numbers (1 to totalDays)
  for (let day = 1; day <= totalDays; day++) {
    cells.push(day);
  }

  // 3. Pad the end so the grid always fills complete rows of 7
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  // Helper: is this particular day the one the user selected?
  function isDaySelected(day: number): boolean {
    if (selectedDate === null) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth()    === month &&
      selectedDate.getDate()     === day
    );
  }

  return (
    <div className="min-w-[148px] flex-shrink-0">

      {/* Row of day-name headers: Mon Tue Wed Thu Fri Sat Sun */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((dayName) => (
          <div
            key={dayName}
            className="text-center text-[9px] text-gray-500 font-medium py-1"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* The actual day-number cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, index) => {

          // If this cell is a blank spacer, render an empty square
          if (day === null) {
            return <div key={index} className="aspect-square" />;
          }

          const isSelected = isDaySelected(day);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(new Date(year, month, day))}
              aria-label={`${day} ${ALL_MONTHS[month]} ${year}`}
              className={`
                aspect-square flex items-center justify-center
                text-[10px] font-medium rounded-sm transition-colors
                ${isSelected
                  ? "bg-[#A67102] text-white"           // selected day → amber fill
                  : "text-gray-300 hover:bg-[#2a2a2a]"  // normal day → grey text, dark hover
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

    </div>
  );
}


// =====================================================
// SCHEDULE STEP — main exported component
// =====================================================

interface ScheduleStepProps {
  onBack: () => void;                        // called when user clicks "Back"
  onContinue: (data: ScheduleData) => void;  // called with the chosen date+time when "Continue" is clicked
}

export function ScheduleStep({ onBack, onContinue }: ScheduleStepProps) {

  // The time the user picked from the amber pill buttons (e.g. "10:30"), or null if nothing yet
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Whether the selected time is in the morning (AM) or afternoon/evening (PM)
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  // The date the user tapped on the calendar, or null if nothing yet
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // The calendar shows MONTHS_TO_SHOW months at once.
  // These two pieces of state track which month is shown first (leftmost column).
  const today = new Date();
  const [calendarYear,  setCalendarYear]  = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth()); // 0 = January

  // A reference to the scrollable time-slots strip so we can scroll it programmatically
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  // ---- FUNCTIONS ---------------------------------------------------

  // Scroll the time-slot strip left when the left arrow is clicked
  function scrollSlotsLeft() {
    timeSlotsRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  }

  // Scroll the time-slot strip right when the right arrow is clicked
  function scrollSlotsRight() {
    timeSlotsRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }

  // Switch between AM and PM (either arrow button calls this same function)
  function togglePeriod() {
    setPeriod((current) => (current === "AM" ? "PM" : "AM"));
  }

  // Move the calendar view back one month
  function goToPreviousMonth() {
    if (calendarMonth === 0) {
      // We're in January — wrap back to December of the previous year
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  }

  // Move the calendar view forward one month
  function goToNextMonth() {
    if (calendarMonth === 11) {
      // We're in December — wrap forward to January of the next year
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  }

  // Jump the calendar back one year
  function goToPreviousYear() {
    setCalendarYear((y) => y - 1);
  }

  // Jump the calendar forward one year
  function goToNextYear() {
    setCalendarYear((y) => y + 1);
  }

  // ---- DERIVED VALUES (calculated from state, not stored) ----------

  // Build the list of months currently visible in the calendar.
  // Starting from calendarMonth, we show MONTHS_TO_SHOW consecutive months.
  const visibleMonths: { year: number; month: number }[] = [];

  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    const totalMonthIndex = calendarMonth + i; // may be > 11 if we go past December

    // If totalMonthIndex is e.g. 13, that means January of the next year
    const year  = calendarYear + Math.floor(totalMonthIndex / 12);
    const month = totalMonthIndex % 12;

    visibleMonths.push({ year, month });
  }

  // The "Continue" button should only work when BOTH a time AND a date are chosen
  const isReadyToContinue = selectedTime !== null && selectedDate !== null;

  // ---- HANDLER FOR "CONTINUE" BUTTON ------------------------------

  function handleContinue() {
    // Safety guard — do nothing if somehow the button fires without a full selection
    if (!selectedTime || !selectedDate) return;

    // Convert the user's 12-hour selection to 24-hour format for the backend
    const time24Hour = convertTo24Hour(selectedTime, period);

    // Convert the Date object to a "YYYY-MM-DD" string
    const isoDate = toISODateString(selectedDate);

    // Pass all the schedule info up to the parent (MediaPage will store it)
    onContinue({
      date:        isoDate,                      // e.g. "2022-01-06"
      time:        time24Hour,                   // e.g. "10:30" in 24-hour format
      period:      period,                       // "AM" or "PM" (for display purposes)
      scheduledAt: `${isoDate}T${time24Hour}:00`, // full ISO datetime e.g. "2022-01-06T10:30:00"
    });
  }

  // ---- RENDER ------------------------------------------------------

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Date and Time</h2>

      <div className="mb-5">

        {/* Labels row: "Time" on the left, "Day/Night" on the right */}
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-400">Time</label>
          <label className="text-sm text-gray-400">Day/Night</label>
        </div>

        {/* Display box: shows the chosen time + the AM/PM spinner */}
        <div className="flex items-center bg-[#0D0B07] border border-gray-700 rounded-lg px-4 py-3 mb-4">

          {/* Left part: the time display ("--:--" until something is picked) */}
          <div className="flex-1 flex items-center gap-2">
            <span
              className={`text-base font-mono font-semibold ${
                selectedTime ? "text-white" : "text-gray-600"
              }`}
            >
              {selectedTime ?? "--:--"}
            </span>
            <span className="text-xs text-gray-500">(GMT +1)</span>
          </div>

          {/* Thin vertical divider line between the time and the AM/PM control */}
          <div className="w-px h-6 bg-gray-700 mx-3" />

          {/* Right part: AM / PM toggle with up and down arrows */}
          <div className="flex flex-col items-center">

            {/* Up arrow — clicking this toggles AM ↔ PM */}
            <button
              onClick={togglePeriod}
              className="text-gray-400 hover:text-white transition-colors p-0.5"
              aria-label="Toggle AM / PM"
            >
              <ChevronUp className="w-3 h-3" />
            </button>

            {/* Shows "AM" or "PM" (shows "--" when no time is picked yet) */}
            <span className="text-sm font-medium text-white leading-none py-0.5 w-8 text-center select-none">
              {selectedTime ? period : "--"}
            </span>

            {/* Down arrow — same toggle as the up arrow */}
            <button
              onClick={togglePeriod}
              className="text-gray-400 hover:text-white transition-colors p-0.5"
              aria-label="Toggle AM / PM"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

  
        <div className="flex items-center gap-2">

        
          <button
            onClick={scrollSlotsLeft}
            className="flex-shrink-0 text-white hover:text-[#A67102] transition-colors"
            aria-label="Scroll time slots left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={timeSlotsRef}
            className="flex gap-2 overflow-x-auto flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {TIME_SLOTS.map((slot) => {
              const isThisSlotSelected = slot === selectedTime;

              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`
                    flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border
                    ${isThisSlotSelected
                      ? "bg-[#A67102] border-[#A67102] text-white"                        // selected → solid amber fill
                      : "bg-transparent border-[#A67102] text-[#A67102] hover:bg-[#A67102]/20" // not selected → amber outline
                    }
                  `}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          {/* Right arrow — scrolls the strip of time buttons to the right */}
          <button
            onClick={scrollSlotsRight}
            className="flex-shrink-0 text-white hover:text-[#A67102] transition-colors"
            aria-label="Scroll time slots right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ======================================================
          DATE / CALENDAR SECTION
          Shows the selected date as text + a multi-month
          calendar the user can click to pick a day.
          ====================================================== */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Date</label>

        {/* Once a date is picked, show it in a friendly format above the calendar */}
        {selectedDate && (
          <p className="text-white text-lg font-semibold mb-3">
            {formatFriendlyDate(selectedDate)}
          </p>
        )}

        {/* The calendar widget */}
        <div className="border border-gray-700 rounded-lg p-4 bg-[#0D0B07]">

          {/* Navigation header: month arrows on the LEFT, year arrows on the RIGHT */}
          <div className="flex items-center justify-between mb-3">

            {/* Month navigation  ← January → */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToPreviousMonth}
                className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-white text-sm font-medium w-[88px] text-center">
                {ALL_MONTHS[calendarMonth]}
              </span>

              <button
                onClick={goToNextMonth}
                className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Year navigation  ← 2025 → */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToPreviousYear}
                className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                aria-label="Previous year"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-white text-sm font-medium w-12 text-center">
                {calendarYear}
              </span>

              <button
                onClick={goToNextYear}
                className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                aria-label="Next year"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Multi-month calendar: MONTHS_TO_SHOW months side by side, horizontally scrollable */}
          <div
            className="overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {visibleMonths.map(({ year, month }) => (
                <MonthGrid
                  key={`${year}-${month}`}
                  year={year}
                  month={month}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    
      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!isReadyToContinue}
          title={!isReadyToContinue ? "Please select a time and a date to continue" : undefined}
          className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

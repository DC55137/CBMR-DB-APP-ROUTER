"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  href: string;
}

interface Day {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  events: Event[];
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  const generateDays = (): Day[] => {
    const now = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Create dates using the local timezone
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startingDayOfWeek = firstDay.getDay();
    if (startingDayOfWeek === 0) startingDayOfWeek = 7; // If it was Sunday, make it 7

    const days: Day[] = [];

    // Function to format date as YYYY-MM-DD in local timezone
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
    };

    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push({
        date: formatDate(date),
        isCurrentMonth: false,
        events: [],
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date: formatDate(date),
        isCurrentMonth: true,
        isToday: formatDate(date) === formatDate(now),
        events: [],
      });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date: formatDate(date),
        isCurrentMonth: false,
        events: [],
      });
    }

    return days;
  };
  const days = generateDays();

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col bg-main-1 text-slate-12">
      <header className="flex items-center justify-between border-b border-main-3 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-slate-12">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="flex items-center">
          <button
            onClick={goToPreviousMonth}
            className="flex h-9 w-9 items-center justify-center rounded-l-md border border-main-3 text-slate-8 hover:text-slate-11 focus:relative"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={goToNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-r-md border border-main-3 text-slate-8 hover:text-slate-11 focus:relative"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="shadow ring-1 ring-main-3 ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-main-3 bg-main-2 text-center text-xs font-semibold leading-6 text-slate-11 lg:flex-none">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="bg-main-1 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="flex bg-main-2 text-xs leading-6 text-slate-11 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                className={cn(
                  day.isCurrentMonth ? "bg-main-1" : "bg-main-2 text-slate-7",
                  "relative px-3 py-2 hover:bg-main-3 transition-colors"
                )}
                onClick={() => setSelectedDay(day)}
              >
                <time
                  dateTime={day.date}
                  className={cn(
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-main-9 font-semibold text-white"
                      : undefined
                  )}
                >
                  {day.date ? day.date.split("-").pop()?.replace(/^0/, "") : ""}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-slate-12 group-hover:text-main-11">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-slate-8 group-hover:text-main-11 xl:block"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-slate-8">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDay && selectedDay.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-main-3 overflow-hidden rounded-lg bg-main-1 text-sm shadow ring-1 ring-main-3 ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-main-2 hover:bg-main-2 transition-colors"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-slate-12">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-slate-11"
                  >
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-main-3 px-3 py-2 font-semibold text-slate-12 opacity-0 shadow-sm ring-1 ring-inset ring-main-5 hover:ring-main-6 focus:opacity-100 group-hover:opacity-100 transition-opacity"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Calendar;

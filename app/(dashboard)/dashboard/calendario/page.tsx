"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

type Slot = { status: "livre" | "ocupado" | "aguardando"; label: string };

const mockEvents: Record<string, Slot[]> = {
  "2026-06-21": [
    { status: "ocupado", label: "Maria Silva - Sofá" },
    { status: "ocupado", label: "Carlos Pereira - Colchão" },
    { status: "aguardando", label: "Ana Souza - Combo" },
  ],
  "2026-06-22": [
    { status: "livre", label: "Disponível" },
    { status: "ocupado", label: "Pedro Lima - Sofá" },
  ],
  "2026-06-23": [
    { status: "ocupado", label: "Fernanda Costa - Colchão" },
  ],
  "2026-06-24": [
    { status: "aguardando", label: "Ricardo Alves - Sofá" },
    { status: "aguardando", label: "Juliana Lima - Combo" },
  ],
};

const statusColors: Record<string, string> = {
  livre: "bg-green-100 text-green-700 border-green-200",
  ocupado: "bg-red-100 text-red-700 border-red-200",
  aguardando: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function CalendarioPage() {
  const today = new Date(2026, 5, 21);
  const [current, setCurrent] = useState(today);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const dateKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Calendário</h1>
          <p className="text-neutral-500 mt-1">Gerencie a agenda de atendimentos</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { status: "livre", label: "Livre" },
          { status: "ocupado", label: "Ocupado" },
          { status: "aguardando", label: "Aguardando" },
        ].map((l) => (
          <span key={l.status} className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColors[l.status]}`}>
            <span className={`w-2 h-2 rounded-full ${l.status === "livre" ? "bg-green-500" : l.status === "ocupado" ? "bg-red-500" : "bg-yellow-500"}`} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Calendar card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <h2 className="font-bold text-neutral-900 text-lg">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 border-b border-neutral-100">
          {DAYS.map((d) => (
            <div key={d} className="py-3 text-center text-xs font-bold text-neutral-400 uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells for first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-neutral-100 bg-neutral-50/50" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = dateKey(day);
            const events = mockEvents[key] || [];
            const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

            return (
              <div
                key={day}
                className={`min-h-[100px] border-b border-r border-neutral-100 p-2 hover:bg-neutral-50 cursor-pointer transition-colors ${
                  isToday ? "bg-primary-50" : ""
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold mb-1 ${
                    isToday
                      ? "bg-primary-600 text-white"
                      : "text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {day}
                </span>
                <div className="flex flex-col gap-0.5">
                  {events.slice(0, 2).map((ev, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-1.5 py-0.5 rounded-md border truncate ${statusColors[ev.status]}`}
                    >
                      {ev.label}
                    </span>
                  ))}
                  {events.length > 2 && (
                    <span className="text-xs text-neutral-400 pl-1">+{events.length - 2} mais</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Loader, Plus } from "lucide-react";

type Status = "pendente" | "andamento" | "concluido" | "cancelado";

type Appointment = {
  id: string;
  client: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  technician: string;
  payment: string;
  value: string;
  status: Status;
};

const appointments: Appointment[] = [
  { id: "OS-001", client: "Maria Silva", phone: "(11) 98765-4321", service: "Sofá 3 Lugares", date: "21/06/2026", time: "08:00", address: "Av. Paulista, 100 - Bela Vista", technician: "João Carlos", payment: "Pix", value: "R$ 149", status: "concluido" },
  { id: "OS-002", client: "Carlos Pereira", phone: "(11) 99876-5432", service: "Colchão Casal", date: "21/06/2026", time: "10:00", address: "R. Augusta, 500 - Consolação", technician: "João Carlos", payment: "Cartão", value: "R$ 179", status: "andamento" },
  { id: "OS-003", client: "Ana Souza", phone: "(11) 97654-3210", service: "Combo Casa Completa", date: "21/06/2026", time: "13:00", address: "R. Oscar Freire, 200 - Jardins", technician: "João Carlos", payment: "Dinheiro", value: "R$ 399", status: "pendente" },
  { id: "OS-004", client: "Rodrigo Lima", phone: "(11) 96543-2109", service: "Sofá Retrátil", date: "22/06/2026", time: "09:00", address: "Al. Santos, 750 - Cerqueira César", technician: "João Carlos", payment: "Pix", value: "R$ 199", status: "pendente" },
  { id: "OS-005", client: "Juliana Costa", phone: "(11) 95432-1098", service: "Colchão Solteiro", date: "22/06/2026", time: "14:00", address: "R. Haddock Lobo, 80 - Jardins", technician: "João Carlos", payment: "Pix", value: "R$ 129", status: "pendente" },
  { id: "OS-006", client: "Fernando Alves", phone: "(11) 94321-0987", service: "Sofá 3 Lugares", date: "20/06/2026", time: "10:00", address: "R. Pamplona, 30 - Jardim Paulista", technician: "João Carlos", payment: "Cartão", value: "R$ 149", status: "cancelado" },
  { id: "OS-007", client: "Patricia Melo", phone: "(11) 93210-9876", service: "Combo Casa Completa", date: "19/06/2026", time: "08:00", address: "Av. Brasil, 200 - Pinheiros", technician: "João Carlos", payment: "Pix", value: "R$ 399", status: "concluido" },
];

const statusConfig: Record<Status, { label: string; class: string; icon: React.ElementType }> = {
  pendente: { label: "Pendente", class: "bg-yellow-100 text-yellow-700", icon: Clock },
  andamento: { label: "Em Andamento", class: "bg-blue-100 text-blue-700", icon: Loader },
  concluido: { label: "Concluído", class: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelado: { label: "Cancelado", class: "bg-red-100 text-red-700", icon: XCircle },
};

const filters: { label: string; value: Status | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Pendente", value: "pendente" },
  { label: "Em Andamento", value: "andamento" },
  { label: "Concluído", value: "concluido" },
  { label: "Cancelado", value: "cancelado" },
];

export default function AgendamentosPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "todos">("todos");
  const [selected, setSelected] = useState<Appointment | null>(null);

  const filtered = appointments.filter((a) => {
    const matchFilter = filter === "todos" || a.status === filter;
    const matchSearch =
      a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Agendamentos</h1>
          <p className="text-neutral-500 mt-1">Gestão de ordens de serviço</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </button>
      </div>

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, OS ou serviço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f.value
                  ? "gradient-primary text-white shadow-md"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-6 ${selected ? "lg:grid-cols-3" : "grid-cols-1"}`}>
        {/* Table */}
        <div className={selected ? "lg:col-span-2" : ""}>
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 border-b border-neutral-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">OS</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Cliente</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden md:table-cell">Serviço</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden lg:table-cell">Data</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Valor</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filtered.map((a) => {
                    const s = statusConfig[a.status];
                    const Icon = s.icon;
                    return (
                      <tr
                        key={a.id}
                        className={`hover:bg-neutral-50 transition-colors cursor-pointer ${selected?.id === a.id ? "bg-primary-50" : ""}`}
                        onClick={() => setSelected(selected?.id === a.id ? null : a)}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-neutral-500">{a.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-neutral-800">{a.client}</p>
                          <p className="text-xs text-neutral-400">{a.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">{a.service}</td>
                        <td className="px-4 py-3 text-neutral-500 hidden lg:table-cell">{a.date} {a.time}</td>
                        <td className="px-4 py-3 font-bold text-neutral-800">{a.value}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.class}`}>
                            <Icon className="w-3 h-3" />
                            {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-primary-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>Nenhum agendamento encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col gap-5 h-fit">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-neutral-900">Detalhes {selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {[
                ["Cliente", selected.client],
                ["Telefone", selected.phone],
                ["Serviço", selected.service],
                ["Data / Hora", `${selected.date} às ${selected.time}`],
                ["Endereço", selected.address],
                ["Técnico", selected.technician],
                ["Pagamento", selected.payment],
                ["Valor", selected.value],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-neutral-400 uppercase">{label}</span>
                  <span className="text-neutral-800 font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Marcar como Concluído
              </button>
              <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" />
                Cancelar Serviço
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

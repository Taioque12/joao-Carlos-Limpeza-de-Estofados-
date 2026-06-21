"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Loader, Plus } from "lucide-react";
import { supabase, type Ordem } from "@/lib/supabase";

type Status = "pendente" | "andamento" | "concluido" | "cancelado";

const statusConfig: Record<Status, { label: string; class: string; icon: React.ElementType }> = {
  pendente:  { label: "Pendente",     class: "bg-yellow-100 text-yellow-700", icon: Clock },
  andamento: { label: "Em Andamento", class: "bg-blue-100 text-blue-700",    icon: Loader },
  concluido: { label: "Concluído",    class: "bg-green-100 text-green-700",  icon: CheckCircle },
  cancelado: { label: "Cancelado",    class: "bg-red-100 text-red-700",      icon: XCircle },
};

const filters: { label: string; value: Status | "todos" }[] = [
  { label: "Todos",        value: "todos" },
  { label: "Pendente",     value: "pendente" },
  { label: "Em Andamento", value: "andamento" },
  { label: "Concluído",    value: "concluido" },
  { label: "Cancelado",    value: "cancelado" },
];

export default function AgendamentosPage() {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "todos">("todos");
  const [selected, setSelected] = useState<Ordem | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchOrdens(); }, []);

  async function fetchOrdens() {
    setLoading(true);
    const { data } = await supabase
      .from("jc_ordens")
      .select("*")
      .order("data", { ascending: false });
    setOrdens(data ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Status) {
    setSaving(true);
    await supabase.from("jc_ordens").update({ status }).eq("id", id);
    await fetchOrdens();
    setSelected((prev) => prev ? { ...prev, status } : null);
    setSaving(false);
  }

  const filtered = ordens.filter((a) => {
    const matchFilter = filter === "todos" || a.status === filter;
    const matchSearch =
      a.cliente.toLowerCase().includes(search.toLowerCase()) ||
      a.codigo.toLowerCase().includes(search.toLowerCase()) ||
      a.servico.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
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
        <div className={selected ? "lg:col-span-2" : ""}>
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-neutral-400">
                <Loader className="w-6 h-6 animate-spin mr-2" /> Carregando...
              </div>
            ) : (
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
                          <td className="px-4 py-3 font-mono text-xs text-neutral-500">{a.codigo}</td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-neutral-800">{a.cliente}</p>
                            <p className="text-xs text-neutral-400">{a.telefone}</p>
                          </td>
                          <td className="px-4 py-3 text-neutral-600 hidden md:table-cell">{a.servico}</td>
                          <td className="px-4 py-3 text-neutral-500 hidden lg:table-cell">
                            {new Date(a.data + "T00:00:00").toLocaleDateString("pt-BR")} {a.horario}
                          </td>
                          <td className="px-4 py-3 font-bold text-neutral-800">
                            R$ {a.valor.toFixed(2).replace(".", ",")}
                          </td>
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
            )}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-12 text-neutral-400">
                <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>Nenhum agendamento encontrado</p>
              </div>
            )}
          </div>
        </div>

        {selected && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col gap-5 h-fit">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-neutral-900">Detalhes {selected.codigo}</h3>
              <button onClick={() => setSelected(null)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              {([
                ["Cliente",    selected.cliente],
                ["Telefone",   selected.telefone],
                ["Serviço",    selected.servico],
                ["Data / Hora",`${new Date(selected.data + "T00:00:00").toLocaleDateString("pt-BR")} às ${selected.horario}`],
                ["Endereço",   selected.endereco],
                ["Técnico",    selected.tecnico],
                ["Pagamento",  selected.pagamento],
                ["Valor",      `R$ ${selected.valor.toFixed(2).replace(".", ",")}`],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-neutral-400 uppercase">{label}</span>
                  <span className="text-neutral-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => updateStatus(selected.id, "concluido")}
                disabled={saving || selected.status === "concluido"}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                {saving ? "Salvando..." : "Marcar como Concluído"}
              </button>
              <button
                onClick={() => updateStatus(selected.id, "cancelado")}
                disabled={saving || selected.status === "cancelado"}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
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

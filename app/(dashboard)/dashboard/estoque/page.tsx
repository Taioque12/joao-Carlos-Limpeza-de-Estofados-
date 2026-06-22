"use client";

import { useState, useEffect } from "react";
import { Package, AlertTriangle, Plus, Search, TrendingDown, Loader } from "lucide-react";
import { supabase, type ItemEstoque } from "@/lib/supabase";

export default function EstoquePage() {
  const [items, setItems] = useState<ItemEstoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchEstoque(); }, []);

  async function fetchEstoque() {
    setLoading(true);
    const { data } = await supabase
      .from("jc_estoque")
      .select("*")
      .order("nome");
    setItems(data ?? []);
    setLoading(false);
  }

  const filtered = items.filter(
    (i) =>
      i.nome.toLowerCase().includes(search.toLowerCase()) ||
      i.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = items.filter((i) => i.quantidade_atual < i.quantidade_min);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Estoque</h1>
          <p className="text-neutral-500 mt-1">Controle de insumos e materiais</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Adicionar Item
        </button>
      </div>

      {lowStock.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-700 text-sm">
              {lowStock.length} {lowStock.length === 1 ? "item precisa" : "itens precisam"} de reposição
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((item) => (
              <span key={item.id} className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1.5 rounded-full border border-red-200 flex items-center gap-1.5">
                <TrendingDown className="w-3 h-3" />
                {item.nome} ({item.quantidade_atual}/{item.quantidade_min} {item.unidade.toLowerCase()}s)
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total de Itens",    value: items.length,                                                  icon: Package,       color: "bg-primary-100 text-primary-600" },
          { label: "Abaixo do Mínimo",  value: lowStock.length,                                               icon: AlertTriangle, color: "bg-red-100 text-red-600" },
          { label: "Categorias",        value: new Set(items.map((i) => i.categoria)).size,                   icon: Package,       color: "bg-purple-100 text-purple-600" },
          { label: "Itens em OK",       value: items.filter((i) => i.quantidade_atual >= i.quantidade_min).length, icon: Package, color: "bg-green-100 text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-neutral-900">{s.value}</p>
              <p className="text-xs text-neutral-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Buscar por produto ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm text-neutral-800 placeholder:text-neutral-400 bg-white"
        />
      </div>

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
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Produto</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden sm:table-cell">Categoria</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Qtd. Atual</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Mín.</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden lg:table-cell">Custo</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((item) => {
                  const pct = Math.min((item.quantidade_atual / item.quantidade_min) * 100, 100);
                  const ok  = item.quantidade_atual >= item.quantidade_min;
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-neutral-800">{item.nome}</p>
                        {item.ultimo_uso && (
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Último uso: {new Date(item.ultimo_uso + "T00:00:00").toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-xs font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className={`font-bold text-base ${ok ? "text-neutral-800" : "text-red-600"}`}>
                            {item.quantidade_atual}
                          </span>
                          <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${ok ? "bg-green-400" : "bg-red-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-neutral-500 font-medium">{item.quantidade_min}</td>
                      <td className="px-4 py-4 text-neutral-600 hidden lg:table-cell">{item.custo ?? "—"}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {ok ? "OK" : "Repor"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

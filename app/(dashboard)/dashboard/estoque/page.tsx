"use client";

import { useState } from "react";
import { Package, AlertTriangle, Plus, Search, TrendingDown } from "lucide-react";

type StockItem = {
  id: string;
  name: string;
  category: string;
  unit: string;
  current: number;
  minimum: number;
  cost: string;
  lastUse: string;
};

const stockItems: StockItem[] = [
  { id: "1", name: "Extrator Químico Multi-uso 5L", category: "Produto Químico", unit: "Litro", current: 3, minimum: 10, cost: "R$ 85,00 / 5L", lastUse: "21/06/2026" },
  { id: "2", name: "Neutralizador de Odores 2L", category: "Produto Químico", unit: "Litro", current: 8, minimum: 6, cost: "R$ 45,00 / 2L", lastUse: "20/06/2026" },
  { id: "3", name: "Impermeabilizante Tecido 5L", category: "Produto Químico", unit: "Litro", current: 2, minimum: 5, cost: "R$ 120,00 / 5L", lastUse: "19/06/2026" },
  { id: "4", name: "Escova de Cerdas Médias", category: "Equipamento", unit: "Unidade", current: 6, minimum: 3, cost: "R$ 35,00 / un", lastUse: "21/06/2026" },
  { id: "5", name: "Luva Nitrílica (Par)", category: "EPI", unit: "Par", current: 25, minimum: 10, cost: "R$ 8,00 / par", lastUse: "21/06/2026" },
  { id: "6", name: "Máscara PFF2", category: "EPI", unit: "Unidade", current: 15, minimum: 10, cost: "R$ 5,00 / un", lastUse: "21/06/2026" },
  { id: "7", name: "Pano de Microfibra 40x40", category: "Material", unit: "Unidade", current: 30, minimum: 20, cost: "R$ 12,00 / un", lastUse: "20/06/2026" },
  { id: "8", name: "Detergente Enzimático 1L", category: "Produto Químico", unit: "Litro", current: 4, minimum: 8, cost: "R$ 55,00 / 1L", lastUse: "18/06/2026" },
];

export default function EstoquePage() {
  const [search, setSearch] = useState("");

  const filtered = stockItems.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = stockItems.filter((i) => i.current < i.minimum);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
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

      {/* Low stock alerts */}
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
                {item.name} ({item.current}/{item.minimum} {item.unit.toLowerCase()}s)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total de Itens", value: stockItems.length, icon: Package, color: "bg-primary-100 text-primary-600" },
          { label: "Abaixo do Mínimo", value: lowStock.length, icon: AlertTriangle, color: "bg-red-100 text-red-600" },
          { label: "Categorias", value: new Set(stockItems.map((i) => i.category)).size, icon: Package, color: "bg-purple-100 text-purple-600" },
          { label: "Itens em OK", value: stockItems.filter((i) => i.current >= i.minimum).length, icon: Package, color: "bg-green-100 text-green-600" },
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

      {/* Search */}
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

      {/* Stock table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
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
                const pct = Math.min((item.current / item.minimum) * 100, 100);
                const ok = item.current >= item.minimum;
                return (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-neutral-800">{item.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">Último uso: {item.lastUse}</p>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`font-bold text-base ${ok ? "text-neutral-800" : "text-red-600"}`}>
                          {item.current}
                        </span>
                        <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${ok ? "bg-green-400" : "bg-red-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-neutral-500 font-medium">{item.minimum}</td>
                    <td className="px-4 py-4 text-neutral-600 hidden lg:table-cell">{item.cost}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {ok ? "OK" : "Repor"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

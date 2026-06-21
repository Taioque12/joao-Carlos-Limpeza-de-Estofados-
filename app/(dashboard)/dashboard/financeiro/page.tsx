"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Plus, Upload } from "lucide-react";

type TransactionType = "entrada" | "saida";

type Transaction = {
  id: string;
  description: string;
  type: TransactionType;
  value: string;
  date: string;
  category: string;
  status: "pago" | "pendente";
};

const transactions: Transaction[] = [
  { id: "1", description: "Serviço - Maria Silva (OS-001)", type: "entrada", value: "R$ 149,00", date: "21/06/2026", category: "Serviço", status: "pago" },
  { id: "2", description: "Serviço - Carlos Pereira (OS-002)", type: "entrada", value: "R$ 179,00", date: "21/06/2026", category: "Serviço", status: "pendente" },
  { id: "3", description: "Serviço - Patricia Melo (OS-007)", type: "entrada", value: "R$ 399,00", date: "19/06/2026", category: "Serviço", status: "pago" },
  { id: "4", description: "Produto - Extrator Químico 5L", type: "saida", value: "R$ 85,00", date: "18/06/2026", category: "Produto", status: "pago" },
  { id: "5", description: "Combustível - Semana 24", type: "saida", value: "R$ 120,00", date: "17/06/2026", category: "Combustível", status: "pago" },
  { id: "6", description: "Serviço - Fernando Alves (OS-006)", type: "entrada", value: "R$ 149,00", date: "20/06/2026", category: "Serviço", status: "pendente" },
  { id: "7", description: "Marketing - Google Ads", type: "saida", value: "R$ 200,00", date: "15/06/2026", category: "Marketing", status: "pago" },
];

const summary = [
  { label: "Entradas do Mês", value: "R$ 8.450", icon: ArrowUpRight, color: "text-green-600", bg: "bg-green-100" },
  { label: "Saídas do Mês", value: "R$ 1.240", icon: ArrowDownRight, color: "text-red-500", bg: "bg-red-100" },
  { label: "Caixa Atual", value: "R$ 7.210", icon: DollarSign, color: "text-primary-600", bg: "bg-primary-100" },
  { label: "Projeção Mensal", value: "R$ 9.800", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
];

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState<"fluxo" | "notas">("fluxo");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Financeiro</h1>
          <p className="text-neutral-500 mt-1">Fluxo de caixa e notas fiscais</p>
        </div>
        <button className="flex items-center gap-2 gradient-primary text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-neutral-900">{s.value}</p>
              <p className="text-xs text-neutral-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "fluxo", label: "Fluxo de Caixa" },
          { key: "notas", label: "Notas Fiscais" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "fluxo" | "notas")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "gradient-primary text-white shadow-md"
                : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "fluxo" ? (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Descrição</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden sm:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase hidden md:table-cell">Data</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Valor</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.type === "entrada" ? "bg-green-400" : "bg-red-400"}`} />
                        <span className="text-neutral-800 font-medium truncate max-w-[200px]">{t.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{t.category}</td>
                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">{t.date}</td>
                    <td className={`px-4 py-3 font-bold ${t.type === "entrada" ? "text-green-600" : "text-red-500"}`}>
                      {t.type === "entrada" ? "+" : "-"}{t.value}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        t.status === "pago" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {t.status === "pago" ? "Pago" : "Pendente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="font-bold text-neutral-900 text-lg mb-2">Upload de Notas Fiscais</h3>
          <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
            Faça upload de notas fiscais de insumos para controle de custos.
          </p>
          <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 hover:border-primary-300 transition-colors cursor-pointer">
            <p className="text-neutral-400 text-sm">Arraste e solte arquivos aqui ou <span className="text-primary-600 font-semibold">clique para selecionar</span></p>
            <p className="text-neutral-300 text-xs mt-1">PDF, PNG, JPG até 10MB</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-left text-sm text-neutral-600">
            {[
              { label: "Fornecedor", placeholder: "Ex: Casa Química" },
              { label: "Valor", placeholder: "R$ 0,00" },
              { label: "Vencimento", placeholder: "DD/MM/AAAA" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-500 uppercase">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="px-3 py-2 rounded-xl border border-neutral-200 focus:border-primary-400 outline-none text-sm"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 gradient-primary text-white font-semibold px-6 py-2.5 rounded-xl shadow-md text-sm">
            Lançar Nota
          </button>
        </div>
      )}
    </div>
  );
}

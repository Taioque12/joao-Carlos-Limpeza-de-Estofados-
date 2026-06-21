"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Plus, Upload, Loader } from "lucide-react";
import { supabase, type Transacao } from "@/lib/supabase";

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"fluxo" | "notas">("fluxo");

  useEffect(() => { fetchTransacoes(); }, []);

  async function fetchTransacoes() {
    setLoading(true);
    const { data } = await supabase
      .from("jc_transacoes")
      .select("*")
      .order("data", { ascending: false });
    setTransacoes(data ?? []);
    setLoading(false);
  }

  const entradas = transacoes.filter((t) => t.tipo === "entrada").reduce((s, t) => s + t.valor, 0);
  const saidas   = transacoes.filter((t) => t.tipo === "saida").reduce((s, t) => s + t.valor, 0);
  const caixa    = entradas - saidas;

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const summary = [
    { label: "Entradas do Mês", value: fmt(entradas), icon: ArrowUpRight,  color: "text-green-600",   bg: "bg-green-100" },
    { label: "Saídas do Mês",   value: fmt(saidas),   icon: ArrowDownRight, color: "text-red-500",    bg: "bg-red-100" },
    { label: "Caixa Atual",     value: fmt(caixa),    icon: DollarSign,     color: "text-primary-600", bg: "bg-primary-100" },
    { label: "Projeção Mensal", value: fmt(entradas * 1.16), icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
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

      <div className="flex gap-2 mb-6">
        {[{ key: "fluxo", label: "Fluxo de Caixa" }, { key: "notas", label: "Notas Fiscais" }].map((tab) => (
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
          {loading ? (
            <div className="flex items-center justify-center py-16 text-neutral-400">
              <Loader className="w-6 h-6 animate-spin mr-2" /> Carregando...
            </div>
          ) : (
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
                  {transacoes.map((t) => (
                    <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.tipo === "entrada" ? "bg-green-400" : "bg-red-400"}`} />
                          <span className="text-neutral-800 font-medium truncate max-w-[200px]">{t.descricao}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{t.categoria ?? "—"}</td>
                      <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">
                        {new Date(t.data + "T00:00:00").toLocaleDateString("pt-BR")}
                      </td>
                      <td className={`px-4 py-3 font-bold ${t.tipo === "entrada" ? "text-green-600" : "text-red-500"}`}>
                        {t.tipo === "entrada" ? "+" : "-"}{fmt(t.valor)}
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
          )}
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
                <input type="text" placeholder={f.placeholder} className="px-3 py-2 rounded-xl border border-neutral-200 focus:border-primary-400 outline-none text-sm" />
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

import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type Ordem = {
  id: string;
  codigo: string;
  cliente: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  endereco: string;
  tecnico: string;
  pagamento: string;
  valor: number;
  status: "pendente" | "andamento" | "concluido" | "cancelado";
  criado_em: string;
};

export type ItemEstoque = {
  id: string;
  nome: string;
  categoria: string;
  unidade: string;
  quantidade_atual: number;
  quantidade_min: number;
  custo: string | null;
  ultimo_uso: string | null;
  criado_em: string;
};

export type Transacao = {
  id: string;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  data: string;
  categoria: string | null;
  status: "pago" | "pendente";
  criado_em: string;
};

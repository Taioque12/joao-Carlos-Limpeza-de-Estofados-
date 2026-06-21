import {
  DollarSign,
  CheckCircle,
  CalendarDays,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

const metricCards = [
  {
    title: "Faturamento do Mês",
    value: "R$ 8.450",
    change: "+12%",
    up: true,
    icon: DollarSign,
    color: "bg-primary-100 text-primary-600",
  },
  {
    title: "Serviços Concluídos",
    value: "47",
    change: "+8%",
    up: true,
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Agendamentos Hoje",
    value: "5",
    change: "3 pendentes",
    up: null,
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Alertas de Estoque",
    value: "2",
    change: "produtos abaixo do mínimo",
    up: false,
    icon: Package,
    color: "bg-red-100 text-red-600",
  },
];

const todaySchedule = [
  { time: "08:00", client: "Maria Silva", service: "Sofá 3 lugares", status: "concluido", address: "Av. Paulista, 100" },
  { time: "10:00", client: "Carlos Pereira", service: "Colchão Casal", status: "andamento", address: "R. Augusta, 500" },
  { time: "13:00", client: "Ana Souza", service: "Combo Casa Completa", status: "pendente", address: "R. Oscar Freire, 200" },
  { time: "15:00", client: "Rodrigo Lima", service: "Sofá Retrátil", status: "pendente", address: "Al. Santos, 750" },
  { time: "17:00", client: "Juliana Costa", service: "Colchão Solteiro", status: "pendente", address: "R. Haddock Lobo, 80" },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  concluido: { label: "Concluído", class: "bg-green-100 text-green-700" },
  andamento: { label: "Em Andamento", class: "bg-blue-100 text-blue-700" },
  pendente: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
};

const recentActivity = [
  { text: "Serviço de Maria Silva marcado como concluído", time: "há 30min", icon: CheckCircle, color: "text-green-500" },
  { text: "Novo agendamento de Pedro Alves para amanhã", time: "há 1h", icon: CalendarDays, color: "text-primary-500" },
  { text: "Produto 'Extrator Químico 5L' com estoque baixo", time: "há 2h", icon: Package, color: "text-red-500" },
  { text: "Pagamento de R$ 299 recebido (Carlos Pereira)", time: "há 3h", icon: DollarSign, color: "text-primary-500" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
          Bom dia, João Carlos 👋
        </h1>
        <p className="text-neutral-500 mt-1">
          Sábado, 21 de junho de 2026 • 5 agendamentos hoje
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {metricCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
              {card.up !== null && (
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    card.up ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {card.up ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {card.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold text-neutral-900 mb-1">{card.value}</p>
            <p className="text-sm text-neutral-500">{card.title}</p>
            {card.up === null && (
              <p className="text-xs text-neutral-400 mt-1">{card.change}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <h2 className="font-bold text-neutral-900">Agenda de Hoje</h2>
            </div>
            <a href="/dashboard/calendario" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Ver calendário →
            </a>
          </div>
          <div className="divide-y divide-neutral-100">
            {todaySchedule.map((item) => {
              const s = statusConfig[item.status];
              return (
                <div key={item.client} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                  <div className="text-sm font-bold text-neutral-500 w-12 flex-shrink-0">{item.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-800 text-sm truncate">{item.client}</p>
                    <p className="text-neutral-500 text-xs truncate">{item.service} • {item.address}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${s.class}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 p-6 border-b border-neutral-100">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            <h2 className="font-bold text-neutral-900">Atividade Recente</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentActivity.map((item) => (
              <div key={item.text} className="flex items-start gap-3 p-4">
                <item.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.color}`} />
                <div>
                  <p className="text-sm text-neutral-700 leading-snug">{item.text}</p>
                  <p className="text-xs text-neutral-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

# João Carlos — Limpeza de Estofados

Landing page com sistema de agendamento + painel administrativo para o negócio de limpeza de estofados do João Carlos.

Construído com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **Lucide React**.

---

## 📋 O que tem no projeto

### Landing Page (`/`)
Página pública com 7 seções:
1. **Navbar** — navegação fixa com âncoras
2. **Hero** — chamada principal com CTA para WhatsApp
3. **Features** — serviços oferecidos (sofá, colchão, cadeira, etc.)
4. **Social Proof** — depoimentos e provas sociais
5. **Pricing** — 3 planos de preço (Sofá, Colchão Casal, Combo)
6. **FAQ** — perguntas frequentes (accordion)
7. **Scheduling** — formulário de agendamento em 2 etapas que abre o WhatsApp
8. **Footer** — contato e redes sociais

### Painel Admin (`/dashboard`)
Área de gestão com 5 telas:
- **Dashboard** (`/dashboard`) — visão geral com métricas e agenda do dia
- **Calendário** (`/dashboard/calendario`) — calendário mensal de agendamentos
- **Agendamentos** (`/dashboard/agendamentos`) — lista de ordens de serviço com detalhes
- **Financeiro** (`/dashboard/financeiro`) — fluxo de caixa e notas fiscais
- **Estoque** (`/dashboard/estoque`) — controle de insumos com alertas de reposição

---

## 🚀 Como rodar localmente

```bash
npm install      # instala as dependências
npm run dev      # inicia o servidor de desenvolvimento
```

Acesse **http://localhost:3000**

Para gerar a versão de produção:

```bash
npm run build    # compila o projeto
npm run start    # roda a versão de produção
```

---

## ☁️ Deploy (Vercel)

O projeto está hospedado na **Vercel**, conectado à branch `main` do GitHub.
Todo push para `main` dispara um novo deploy automaticamente.

### ⚠️ Se o build falhar com erro de commit/cache antigo

Se aparecer um erro como
`ENOENT: no such file or directory, lstat '.../page_client-reference-manifest.js'`,
verifique no log a linha `Cloning ... (Commit: XXXXXXX)`.

- O botão **"Redeploy" sempre reusa o MESMO commit** da implantação original.
  Se esse commit for antigo, o erro volta.
- **Solução:** faça um push novo na `main` (qualquer commit) para gerar uma
  implantação a partir do código mais recente, ou selecione o commit mais
  recente na aba **Deployments**.
- Ao redeployar, **DESMARQUE** a caixa **"Use existing Build Cache"** para
  forçar um build do zero.

---

## ✅ Pendências antes de ir ao ar

- [ ] **Substituir o número de WhatsApp** `5511999999999` pelo número real do João Carlos.
      Aparece em 3 arquivos:
  - `components/marketing/FAQ.tsx`
  - `components/marketing/Scheduling.tsx`
  - `components/marketing/Footer.tsx`
- [ ] Revisar textos, preços e depoimentos com dados reais
- [ ] Configurar domínio próprio na Vercel (opcional)

---

## 🛠️ Stack técnica

| Ferramenta | Uso |
|---|---|
| Next.js 14 (App Router) | Framework / roteamento |
| TypeScript | Tipagem |
| Tailwind CSS | Estilização (tokens customizados: azul-piscina + cinza) |
| Framer Motion | Animações |
| Lucide React | Ícones |
| Inter (Google Fonts) | Fonte |

---

## 📁 Estrutura de pastas

```
app/
├── page.tsx                  # landing page (rota /)
├── layout.tsx                # layout raiz
├── globals.css               # estilos globais + tokens
└── (dashboard)/
    ├── layout.tsx            # layout do painel (sidebar)
    └── dashboard/
        ├── page.tsx          # visão geral
        ├── calendario/
        ├── agendamentos/
        ├── financeiro/
        └── estoque/
components/
├── marketing/                # componentes da landing
└── dashboard/                # componentes do painel
lib/
└── utils.ts                  # variantes de animação (Framer Motion)
```

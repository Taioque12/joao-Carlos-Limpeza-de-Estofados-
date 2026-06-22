# CLAUDE.md — Memória do Projeto

> Sempre que fizer backup para o git, atualize e suba este arquivo também.
> **Responder ao usuário sempre em português.**

## Cliente
**João Carlos — Limpeza de Estofados.** Negócio de higienização de sofás, colchões e cadeiras a domicílio. Cliente diferente da Cia-Pet (projetos e bancos separados).

## O que é o projeto
Landing page pública + painel administrativo (`/dashboard`) com área restrita por login.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (tokens `primary` sky-blue, `neutral` slate)
- **Framer Motion** (animações) + **Lucide React** (ícones)
- **Supabase** (`@supabase/supabase-js`) — banco real
- **Vercel** — deploy automático a cada push na branch `main`

## URLs
- **Produção:** https://joao-carlos-limpeza-de-estofados.vercel.app/
- **Repositório:** github.com/taioque12/joao-carlos-limpeza-de-estofados-
- **Branch de desenvolvimento:** `claude/project-kickoff-lvz9wq`

## Estrutura
- `app/page.tsx` — landing page (Navbar, Hero, Features, SocialProof, Pricing, FAQ, Scheduling, Footer)
- `app/login/page.tsx` + `components/auth/LoginForm.tsx` — área restrita
- `app/(dashboard)/dashboard/*` — Dashboard, Calendário, Agendamentos, Financeiro, Estoque
- `app/api/login` e `app/api/logout` — autenticação (cookie httpOnly)
- `middleware.ts` — protege rotas `/dashboard`
- `lib/auth.ts` — senha única + SHA-256 (senha vem **só** de `ADMIN_PASSWORD`, sem default no código)
- `lib/supabase.ts` — cliente + tipos `Ordem`, `ItemEstoque`, `Transacao`

## Supabase
- Projeto separado: **joao-carlos-estofados** (`mhhjohnicjbensqodqks`, região `sa-east-1` / Brasil)
- Tabelas (prefixo `jc_`): `jc_ordens` (7), `jc_estoque` (8), `jc_transacoes` (7)
- RLS com política `anon` de acesso total (painel protegido pelo cookie de sessão)

## Variáveis de ambiente (configuradas na Vercel — NUNCA no git)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD` (senha do painel)
- Ficam localmente em `.env.local` (no `.gitignore`)

## Pendências
- Substituir o WhatsApp `5511999999999` pelo número real em `FAQ.tsx`, `Scheduling.tsx`, `Footer.tsx`
- João Carlos deve trocar a `ADMIN_PASSWORD` na Vercel pela senha definitiva
- Funcionalidade de "Novo Agendamento / Lançamento / Item" (botões existem, falta o formulário de criação)

## Histórico (resumo)
1. Landing page completa + painel admin (Fases 1–3)
2. Deploy na Vercel (resolvidos: loop de redirect, conflito de rota `(marketing)`, cache de build)
3. Área restrita com login (senha única, cookie httpOnly, middleware)
4. Integração Supabase com dados reais nas 3 telas do dashboard

## Notas operacionais
- Este ambiente remoto **bloqueia** conexões de saída para Supabase e GitHub via git CLI → push é feito via **GitHub MCP** (`mcp__github__push_files`)
- `.env.local` e segredos nunca entram em commit

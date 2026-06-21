// Autenticação simples por senha única para o painel administrativo.
//
// A senha é definida na variável de ambiente ADMIN_PASSWORD (configure na Vercel).
// Caso não esteja definida, usa um valor padrão APENAS para facilitar o primeiro
// acesso — TROQUE em produção criando a variável ADMIN_PASSWORD nas configurações.

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "joaocarlos2026";

// Nome do cookie de sessão.
export const SESSION_COOKIE = "jc_admin_session";

// Gera um hash SHA-256 (funciona tanto no Node quanto no Edge Runtime do Next.js).
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Token guardado no cookie: hash derivado da senha (a senha em si nunca vai no cookie).
export async function sessionToken(): Promise<string> {
  return sha256(`jc-session:${ADMIN_PASSWORD}`);
}

// Confere se a senha digitada está correta.
export function checkPassword(input: string): boolean {
  return input === ADMIN_PASSWORD;
}

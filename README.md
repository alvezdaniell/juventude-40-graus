# Juventude 40 Graus — Agente de IA (produção)

Plataforma onde jovens conversam com o agente "Sol" e enviam ideias de políticas
públicas de juventude. O mural é público (sem nomes); a coordenação faz login e
acessa o dossiê completo para entregar aos candidatos.

- **IA:** Google Gemini (plano grátis) — a chave fica protegida no servidor.
- **Banco + login:** Supabase (plano grátis).
- **Site:** Vercel (plano grátis).
- Custo total: **R$ 0**.

---

## Os 3 valores que você vai precisar

1. **VITE_SUPABASE_URL** — a URL do seu projeto Supabase (`https://xxxx.supabase.co`).
2. **VITE_SUPABASE_ANON_KEY** — a chave *anon public* (Supabase > Project Settings > API).
3. **GEMINI_API_KEY** — sua chave do Google AI Studio (começa com `AIza...`).

> As duas primeiras são públicas por natureza. A do Gemini é secreta — ela só entra
> nas variáveis da Vercel, **nunca** no código.

---

## Passo 1 — Subir o código no GitHub (pelo navegador)

1. Crie uma conta em **github.com** (se ainda não tiver).
2. Clique em **New repository** → nome `juventude-40-graus` → **Create repository**.
3. Na página do repositório: **Add file > Upload files**.
4. Arraste **todos os arquivos e pastas desta pasta** (menos `node_modules` e `dist`,
   que nem vêm no zip) e clique em **Commit changes**.

## Passo 2 — Publicar na Vercel

1. Entre em **vercel.com** e faça login com o **GitHub**.
2. **Add New > Project** → selecione o repositório `juventude-40-graus` → **Import**.
3. Antes de clicar em Deploy, abra **Environment Variables** e adicione as 3:
   - `VITE_SUPABASE_URL` = sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = sua anon key
   - `GEMINI_API_KEY` = sua chave do Gemini
4. Clique em **Deploy**. Em ~1 minuto o site fica no ar em algo como
   `https://juventude-40-graus.vercel.app`.

## Passo 3 — Testar

- **Conversar:** fale com o Sol e toque em *Enviar minha proposta*.
- **Mural:** sua ideia aparece (sem o nome — proteção de quem envia).
- **Entregar:** faça login com o **e-mail e senha que você criou no Supabase**.
  Se o login não funcionar, veja a observação abaixo.

---

## Observações importantes

- **Login não entra?** No Supabase > Authentication > Users, o usuário precisa estar
  **confirmado**. Ao criar (*Add user*), marque **Auto Confirm User**. Para adicionar
  mais gente da coordenação, é só criar novos usuários ali.
- **Trocar o jeito do Sol falar:** edite o texto `SYSTEM_CHAT` no topo de `src/App.jsx`.
- **Trocar de modelo/custo:** o modelo está em `api/chat.js` (`gemini-2.5-flash`).
  O plano grátis do Gemini roda ~15 pedidos/minuto e ~1.500/dia — ótimo para um
  lançamento gradual. Se um dia estourar, é só ativar o faturamento no Google (aí
  vira pago, mas barato) e o limite sobe.
- **Domínio próprio (opcional):** na Vercel, em Settings > Domains, você pode ligar
  um `juventude40graus.com.br` depois.

## Rodar no seu computador (opcional, para quem mexe com código)

```bash
npm install
# crie um arquivo .env com as 3 variáveis (veja .env.example)
npm run dev
```


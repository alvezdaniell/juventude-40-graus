// Ponte segura com o Gemini. A chave (GEMINI_API_KEY) fica SÓ aqui no servidor.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "método não permitido" });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY não configurada na Vercel" });
  try {
    const parsed = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { system, messages } = parsed;
    const contents = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));
    const body = { contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } };
    if (system) body.system_instruction = { parts: [{ text: system }] };
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    const data = await r.json();
    if (!r.ok) return res.status(500).json({ error: (data.error && data.error.message) || "erro no Gemini" });
    const text = ((data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [])
      .map((p) => p.text || "").join("").trim();
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "falha ao chamar a IA" });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "metodo nao permitido" });
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "GEMINI_API_KEY ausente" });
  }
  try {
    const parsed = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const system = parsed.system;
    const messages = parsed.messages || [];
    const contents = messages.map(function (m) {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content || "") }]
      };
    });
    const payload = { contents: contents };
    if (system) {
      payload.system_instruction = { parts: [{ text: system }] };
    }
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    if (!r.ok) {
      const msg = data && data.error && data.error.message ? data.error.message : "erro no Gemini";
      return res.status(500).json({ error: msg });
    }
    let text = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      text = data.candidates[0].content.parts.map(function (p) { return p.text || ""; }).join("");
    }
    return res.status(200).json({ text: text.trim() });
  } catch (e) {
    return res.status(500).json({ error: "falha: " + String(e && e.message ? e.message : e) });
  }
}

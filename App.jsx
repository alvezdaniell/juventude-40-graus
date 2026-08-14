import React, { useState, useEffect, useRef } from "react";

// ============= DESIGN TOKENS =============
const T = {
  paper: "#FCF4E6",
  paper2: "#F8EFE3",
  ink: "#2A1A10",
  inkSoft: "#6B5547",
  inkMute: "#A89D96",
  orange: "#EF5B25",
  orangeDeep: "#C42D1B",
  gold: "#F5A623",
  line: "#E8DFD5",
  gradCta: "linear-gradient(135deg, #EF5B25 0%, #F5A623 100%)",
  gradHero: "linear-gradient(135deg, #2A1A10 0%, #6B5547 100%)",
  shadow: "0 10px 40px rgba(42,26,16,0.15)",
  shadowSoft: "0 4px 16px rgba(42,26,16,0.08)",
};

// ============= DADOS MUNICIPAIS =============
const MUNICIPIOS = [
  "Abaiara", "Abaré", "Acaraú", "Acarape", "Acopiara", "Aiuaba", "Alcântaras", "Aldeia do Tomás", "Alegrete", "Alemanha", "Alfredo Chaves", "Algodões", "Alhandra", "Aliança", "Almeida", "Almino Afonso", "Alvinópolis", "Amoreira", "Amparo", "Anatalândia", "Anapurus", "Araraquara", "Araripe", "Arataba", "Araçoaba", "Araçu", "Aracati", "Araci", "Arafat", "Araraquara", "Arari", "Araripe", "Araça", "Arataca", "Arauama", "Aratú", "Aratuípe", "Araçatuba", "Araçu", "Araçuai", "Aracaju", "Aracati", "Aracatuba", "Araçatuba", "Araçatuba", "Araçu", "Araçuaí", "Araçu", "Araguacema", "Araguaína", "Araguari", "Araguatins", "Araí", "Araiaçu", "Araçaí", "Araçatuba", "Araçu", "Araçuai", "Araçaí", "Araçatuba", "Araçu", "Araçuái", "Araçu", "Araguacema", "Araguaína", "Araí", "Aracajazeiro", "Araçaí", "Araçatuba", "Aracati", "Araçu", "Araçuaí", "Araçaí", "Araçatuba", "Araçu", "Araçuaí",
  "Barbalha", "Barra do Choça", "Barra do Corda", "Barra do Rio Grande", "Barra Velha", "Barreira", "Barrerinhas", "Barretos", "Barreto", "Barrigas", "Barrolândia", "Barro Alto", "Barroquinha", "Barroso", "Barruelo", "Barruelo", "Bartira", "Barueri", "Barumbu", "Baruvaba", "Baruseri", "Basílio", "Batatais", "Batatão", "Batatuyaba", "Batatais", "Batagassi", "Bataguassu", "Batagassi", "Bataias", "Bataiaporã", "Bataias", "Bataias", "Bataguassu", "Bataias", "Bataias", "Bataias", "Bataias",
  "Caucaia", "Cariré", "Cariri", "Cariri", "Caridade", "Caririaçu", "Carinana", "Carinópolis", "Carinópolis", "Carinos", "Cariosva", "Cariota", "Carionópolis", "Caripé", "Cariri", "Cariré", "Cariri", "Cariri",
  "Crato", "Crateús", "Crato", "Crateús", "Crateús",
  "Fortaleza",
  "Horizonte", "Horizontal", "Horizontina", "Horizontalmente",
  "Iguatu", "Iguaçu", "Iguaçu", "Iguaçu", "Iguabela", "Iguacema", "Iguacema", "Iguacema", "Iguacema", "Iguacema",
  "Jaguaruana", "Jaguarema", "Jaguaretama", "Jaguariaíva", "Jaguaritama", "Jaguaribe", "Jaguaribe", "Jaguaribe", "Jaguaribe", "Jaguarama", "Jaguarão", "Jaguarete", "Jaguariaíva", "Jaguarão", "Jaguarete", "Jaguariaíva", "Jaguarão", "Jaguarete", "Jaguariaíva", "Jaguarão",
  "Juazeiro do Norte", "Juazeiro", "Juazeirinho", "Juazeirópolis", "Juazeiro do Norte", "Juazeiro", "Juazeirinho",
  "Maracanaú", "Maracaju", "Maracás", "Maracaba", "Maracajú", "Maracajuba", "Maracajucu", "Maracajuara", "Maracajuba", "Maracajuara",
  "Quixadá", "Quixeré", "Quixeramobim", "Quixelô", "Quixeramobim", "Quixeré", "Quixadá", "Quixeramobim", "Quixelô",
  "Sobral", "Sobraladó", "Sobradinho", "Sobradinhos", "Sobral", "Sobraladó", "Sobradinho",
  "São Gonçalo do Amarante", "São Gonçalo", "São Gonçalves", "São Gonçalense", "São Gonçalo do Amarante", "São Gonçalo",
];

const TEMAS = ["Mobilidade", "Educação", "Saúde", "Emprego", "Segurança", "Cultura", "Sustentabilidade"];

// ============= COMPONENTES BÁSICOS =============
function SunMark({ size = 24, color = "#2A1A10" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="12" fill={color} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 24 + 16 * Math.cos(rad);
        const y1 = 24 + 16 * Math.sin(rad);
        const x2 = 24 + 20 * Math.cos(rad);
        const y2 = 24 + 20 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />;
      })}
    </svg>
  );
}

// ============= VALIDAÇÃO =============
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0, remainder;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf.substring(10, 11));
}

// ============= APLICAÇÃO PRINCIPAL =============
export default function App() {
  const [consentiu, setConsentiu] = useState(() => localStorage.getItem("consentiu40") === "true");
  const [view, setView] = useState("conversar");
  const [aba, setAba] = useState("Ideias");

  if (!consentiu) {
    return <ConsentGate onAceitar={() => { setConsentiu(true); localStorage.setItem("consentiu40", "true"); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: T.paper, fontFamily: "'Archivo', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Archivo:wght@400;500;600;700&display=swap');`}</style>

      {view === "conversar" && <ConverarView setView={setView} />}
      {view === "filiacao" && <FiliacaoView setView={setView} />}
      {view === "coordenacao" && <CoordenacaoView aba={aba} setAba={setAba} />}
      {view === "mural" && <MuralView setView={setView} />}

      <NavBar view={view} setView={setView} />
    </div>
  );
}

// ============= CONVERSAR VIEW =============
function ConverarView({ setView }) {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tema, setTema] = useState("");
  const [cidade, setCidade] = useState("");
  const [problema, setProblema] = useState("");
  const [proposta, setPropsota] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const enviarMensagem = async () => {
    if (!inp.trim()) return;
    setMsgs([...msgs, { tipo: "user", texto: inp }]);
    setInp("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: inp, historico: msgs }),
      });
      const data = await res.json();
      setMsgs((prev) => [...prev, { tipo: "sol", texto: data.resposta }]);
    } catch (e) {
      console.error(e);
    }
  };

  const salvarIdeia = async () => {
    if (!titulo || !tema || !cidade || !problema || !proposta) {
      setErro("Preencha todos os campos!");
      return;
    }

    setEnviando(true);
    try {
      const ideiaId = crypto.randomUUID();
      const res = await fetch("https://iecbgxuxldcasbtpxrqb.supabase.co/rest/v1/ideias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        },
        body: JSON.stringify({
          id: ideiaId,
          titulo,
          tema,
          problema,
          proposta,
          beneficiarios: "Juventude cearense",
          nome: "Anônimo",
          cidade,
          idade: "18-24",
          curtidas: 0,
          aprovada: false,
          status: "pendente",
        }),
      });

      if (res.ok) {
        setEnviado(true);
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setErro("Erro ao enviar. Tente novamente.");
      }
    } catch (e) {
      setErro("Erro de conexão. Verifique e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ padding: "20px", paddingBottom: 100 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <SunMark size={48} />
        <h1 style={{ fontSize: 28, color: T.ink, margin: "10px 0 5px" }}>Juventude <span style={{ color: T.orange }}>40°</span></h1>
        <p style={{ color: T.inkMute, fontSize: 14 }}>Converse com Sol e transforme sua ideia em proposta</p>
      </div>

      <div style={{ background: T.paper2, borderRadius: 16, padding: 16, marginBottom: 16, maxHeight: 400, overflowY: "auto" }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ marginBottom: 12, textAlign: msg.tipo === "user" ? "right" : "left" }}>
            <div style={{
              display: "inline-block",
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: 12,
              background: msg.tipo === "user" ? T.orange : T.paper,
              color: msg.tipo === "user" ? T.paper : T.ink,
              fontSize: 14,
              border: msg.tipo === "sol" ? `1px solid ${T.line}` : "none",
            }}>
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && enviarMensagem()}
          placeholder="Conte seu problema..."
          style={{ flex: 1, padding: "12px 14px", border: `1px solid ${T.line}`, borderRadius: 12, fontSize: 14, fontFamily: "inherit" }}
        />
        <button onClick={enviarMensagem} style={{ padding: "12px 16px", background: T.orange, border: "none", borderRadius: 12, color: T.paper, fontWeight: 600, cursor: "pointer" }}>Enviar</button>
      </div>

      <button
        onClick={() => setShowForm(true)}
        style={{ width: "100%", padding: 14, background: T.gradCta, border: "none", borderRadius: 12, color: T.paper, fontWeight: 700, fontSize: 16, cursor: "pointer" }}
      >
        ✨ Estruturar minha ideia
      </button>

      {showForm && (
        <Overlay>
          {enviado ? (
            <div style={{ textAlign: "center" }}>
              <SunMark size={48} color={T.orange} />
              <h2 style={{ color: T.orange, fontSize: 24, marginTop: 12 }}>Ideia enviada! 🔥</h2>
              <p style={{ color: T.inkSoft, fontSize: 14, marginTop: 8 }}>Assim que a coordenação aprovar, ela entra no mural!</p>
            </div>
          ) : (
            <>
              <h2 style={{ color: T.ink, fontSize: 18, marginBottom: 16 }}>Estruture sua proposta</h2>
              {erro && <p style={{ color: "red", fontSize: 14, marginBottom: 10 }}>{erro}</p>}

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Título</label>
                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Ciclovias para Fortaleza" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Tema</label>
                <select value={tema} onChange={(e) => setTema(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}>
                  <option value="">Selecione...</option>
                  {TEMAS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Cidade</label>
                <select value={cidade} onChange={(e) => setCidade(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}>
                  <option value="">Selecione...</option>
                  {MUNICIPIOS.sort().map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Qual é o problema?</label>
                <textarea value={problema} onChange={(e) => setProblema(e.target.value)} placeholder="Descreva o problema..." style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, minHeight: 80, boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Qual é sua proposta?</label>
                <textarea value={proposta} onChange={(e) => setPropsota(e.target.value)} placeholder="Como isso poderia ser resolvido?" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, minHeight: 80, boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>

              <button onClick={salvarIdeia} disabled={enviando} style={{ width: "100%", padding: 14, background: enviando ? T.line : T.gradCta, border: "none", borderRadius: 8, color: T.paper, fontWeight: 700, cursor: enviando ? "not-allowed" : "pointer" }}>
                {enviando ? "Enviando..." : "Enviar proposta"}
              </button>
            </>
          )}
          <button onClick={() => setShowForm(false)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", fontSize: 24, cursor: "pointer" }}>×</button>
        </Overlay>
      )}
    </div>
  );
}

// ============= FILIAÇÃO VIEW =============
function FiliacaoView({ setView }) {
  const [f, setF] = useState({ nome: "", cpf: "", whatsapp: "", email: "", cidade: "", bairro: "", zona_eleitoral: "", secao_eleitoral: "", faixa: "", aceita_whatsapp: true });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const set = (k, v) => setF({ ...f, [k]: v });

  const enviar = async () => {
    if (!f.nome.trim()) { setErro("Preencha seu nome."); return; }
    if (!f.cpf.trim()) { setErro("Preencha seu CPF."); return; }
    if (!validarCPF(f.cpf)) { setErro("CPF inválido. Verifique os dígitos."); return; }
    if (!f.whatsapp.trim()) { setErro("Preencha seu WhatsApp."); return; }
    if (!f.email.trim()) { setErro("Preencha seu e-mail."); return; }
    if (!f.cidade.trim()) { setErro("Selecione sua cidade."); return; }
    if (!f.bairro.trim()) { setErro("Preencha seu bairro."); return; }
    if (!f.zona_eleitoral.trim()) { setErro("Preencha sua zona eleitoral."); return; }
    if (!f.secao_eleitoral.trim()) { setErro("Preencha sua seção eleitoral."); return; }
    if (!f.faixa) { setErro("Selecione sua faixa etária."); return; }

    setEnviando(true);
    setErro("");

    try {
      const filiacaoId = crypto.randomUUID();
      const res = await fetch("https://iecbgxuxldcasbtpxrqb.supabase.co/rest/v1/filiacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        },
        body: JSON.stringify({
          id: filiacaoId,
          nome: f.nome,
          cpf: f.cpf,
          whatsapp: f.whatsapp,
          email: f.email,
          cidade: f.cidade,
          bairro: f.bairro,
          zona_eleitoral: f.zona_eleitoral,
          secao_eleitoral: f.secao_eleitoral,
          faixa: f.faixa,
          aceita_whatsapp: f.aceita_whatsapp,
          status: "novo",
        }),
      });

      if (res.ok) {
        setEnviado(true);
        setTimeout(() => setView("conversar"), 2000);
      } else {
        setErro("Erro ao enviar. Tente novamente.");
      }
    } catch (e) {
      console.error(e);
      setErro("Erro de conexão. Verifique e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <SunMark size={64} color={T.orange} />
          <h2 style={{ color: T.orange, fontSize: 28, marginTop: 16 }}>Cadastro enviado! ✨</h2>
          <p style={{ color: T.inkSoft, fontSize: 14, marginTop: 8 }}>Obrigado por se filiar à Juventude 40°!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", paddingBottom: 120 }}>
      <h1 style={{ color: T.ink, fontSize: 22, marginBottom: 20 }}>Quero me filiar! ✊</h1>

      {erro && <p style={{ color: "red", fontSize: 14, marginBottom: 12, padding: "10px 12px", background: "rgba(200,0,0,0.1)", borderRadius: 8 }}>{erro}</p>}

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Nome completo</label>
        <input value={f.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Digite seu nome" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>CPF</label>
        <input value={f.cpf} onChange={(e) => set("cpf", e.target.value)} placeholder="000.000.000-00" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>WhatsApp</label>
        <input value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="(88) 9 9999-0000" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>E-mail</label>
        <input value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="seu@email.com" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Cidade</label>
        <select value={f.cidade} onChange={(e) => set("cidade", e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}>
          <option value="">Selecione...</option>
          {MUNICIPIOS.sort().map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Bairro</label>
        <input value={f.bairro} onChange={(e) => set("bairro", e.target.value)} placeholder="Digite seu bairro" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Zona Eleitoral</label>
        <input value={f.zona_eleitoral} onChange={(e) => set("zona_eleitoral", e.target.value)} placeholder="Ex: 001" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Seção Eleitoral</label>
        <input value={f.secao_eleitoral} onChange={(e) => set("secao_eleitoral", e.target.value)} placeholder="Ex: 0042" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6 }}>Faixa etária</label>
        <select value={f.faixa} onChange={(e) => set("faixa", e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}>
          <option value="">Selecione...</option>
          <option value="16-17">16 a 17 anos</option>
          <option value="18-24">18 a 24 anos</option>
          <option value="25-29">25 a 29 anos</option>
          <option value="30-35">30 a 35 anos</option>
        </select>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, fontSize: 14 }}>
        <input type="checkbox" checked={f.aceita_whatsapp} onChange={(e) => set("aceita_whatsapp", e.target.checked)} />
        <span>Aceito receber mensagens do PSB/JSB no WhatsApp</span>
      </label>

      <button onClick={enviar} disabled={enviando} style={{ width: "100%", padding: 14, background: enviando ? T.line : T.gradCta, border: "none", borderRadius: 8, color: T.paper, fontWeight: 700, fontSize: 16, cursor: enviando ? "not-allowed" : "pointer" }}>
        {enviando ? "Enviando..." : "Enviar cadastro"}
      </button>
    </div>
  );
}

// ============= COORDENAÇÃO VIEW =============
function CoordenacaoView({ aba, setAba }) {
  const [dados, setDados] = useState({ total: 19, temas: 7, cidades: 7 });

  return (
    <div style={{ padding: "20px", paddingBottom: 120 }}>
      <h1 style={{ color: T.ink, fontSize: 22, marginBottom: 16 }}>Área de Coordenação</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: `2px solid ${T.line}`, paddingBottom: 12 }}>
        {["Ideias", "Filiações", "Configuração"].map((tab) => (
          <button
            key={tab}
            onClick={() => setAba(tab)}
            style={{
              padding: "8px 16px",
              border: "none",
              background: aba === tab ? T.orange : "transparent",
              color: aba === tab ? T.paper : T.ink,
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: aba === tab ? 700 : 500,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {aba === "Ideias" && (
        <div>
          <h2 style={{ color: T.ink, fontSize: 16, marginBottom: 12 }}>Propostas recebidas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: T.paper2, padding: 16, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: T.orange }}>{dados.total}</div>
              <div style={{ fontSize: 12, color: T.inkSoft }}>Total</div>
            </div>
            <div style={{ background: T.paper2, padding: 16, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: T.gold }}>{dados.temas}</div>
              <div style={{ fontSize: 12, color: T.inkSoft }}>Temas</div>
            </div>
            <div style={{ background: T.paper2, padding: 16, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: T.orange }}>{dados.cidades}</div>
              <div style={{ fontSize: 12, color: T.inkSoft }}>Cidades</div>
            </div>
          </div>
          <p style={{ color: T.inkSoft, fontSize: 14 }}>Dashboard completo em breve...</p>
        </div>
      )}

      {aba === "Filiações" && (
        <div>
          <h2 style={{ color: T.ink, fontSize: 16, marginBottom: 12 }}>Cadastros de filiação</h2>
          <p style={{ color: T.inkSoft, fontSize: 14 }}>Ver cadastros em breve...</p>
        </div>
      )}

      {aba === "Configuração" && (
        <div>
          <h2 style={{ color: T.ink, fontSize: 16, marginBottom: 12 }}>Configurações</h2>
          <p style={{ color: T.inkSoft, fontSize: 14 }}>Configurações em breve...</p>
        </div>
      )}
    </div>
  );
}

// ============= MURAL VIEW =============
function MuralView({ setView }) {
  return (
    <div style={{ padding: "20px", paddingBottom: 120 }}>
      <h1 style={{ color: T.ink, fontSize: 22, marginBottom: 16 }}>Mural de Propostas</h1>
      <p style={{ color: T.inkSoft, fontSize: 14 }}>As melhores ideias aprovadas pela coordenação aparecem aqui 🔥</p>
    </div>
  );
}

// ============= COMPONENTES DE SUPORTE =============
function NavBar({ view, setView }) {
  const itens = [
    { id: "conversar", label: "Conversar", icon: "💬" },
    { id: "mural", label: "Mural", icon: "🔥" },
    { id: "filiacao", label: "Me filiar", icon: "✊" },
    { id: "coordenacao", label: "Coordenação", icon: "🔐" },
  ];

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-around", background: T.paper, borderTop: `1px solid ${T.line}`, paddingBottom: 12 }}>
      {itens.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            background: view === item.id ? T.paper2 : "transparent",
            cursor: "pointer",
            textAlign: "center",
            fontSize: 12,
            color: view === item.id ? T.orange : T.inkSoft,
            fontWeight: view === item.id ? 700 : 500,
          }}
        >
          <div style={{ fontSize: 20, marginBottom: 2 }}>{item.icon}</div>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ConsentGate({ onAceitar }) {
  const blocos = [
    ["O que é", "Um espaço pra você mandar ideias de políticas públicas pra juventude do Ceará, conversando com Sol."],
    ["Privacidade", "Seus dados ficam privados — só a coordenação vê seu nome. No mural público aparece só a cidade."],
    ["Como funciona", "Converse com Sol, estruture sua ideia em proposta, se filie ao PSB/JSB."],
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.gradHero, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 440, background: T.paper, borderRadius: 22, padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <SunMark size={48} />
          <h1 style={{ fontSize: 24, color: T.ink, margin: "12px 0 4px" }}>Juventude <span style={{ color: T.orange }}>40°</span></h1>
          <p style={{ fontSize: 14, color: T.inkSoft }}>Transforme ideias em políticas públicas 👇</p>
        </div>

        {blocos.map(([t, d], i) => (
          <div key={i} style={{ background: T.paper2, border: `1px solid ${T.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.orange, marginBottom: 4 }}>{t}</div>
            <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.45 }}>{d}</div>
          </div>
        ))}

        <button
          onClick={onAceitar}
          style={{ width: "100%", padding: 14, background: T.gradCta, border: "none", borderRadius: 12, color: T.paper, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 20 }}
        >
          Entendi e quero participar
        </button>
      </div>
    </div>
  );
}

function Overlay({ children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(42,26,16,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 14, zIndex: 50 }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 430, maxHeight: "90vh", overflowY: "auto", background: T.paper, borderRadius: 22, padding: 20 }}>
        {children}
      </div>
    </div>
  );
}

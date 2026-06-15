// app/(dashboard)/chamada/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

type Turma = {
  id: number;
  nome: string;
  serie: string;
};

export default function ChamadaSelecaoPage() {
  const router = useRouter();
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [serie, setSerie] = useState("");
  const [turmaId, setTurmaId] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/turmas`)
        .then(res => res.json())
        .then(data => {
        if (Array.isArray(data)) setTurmas(data);
        else setTurmas([]);
        })
        .catch(err => console.error('Erro ao buscar turmas:', err));
  }, []);

  const series = Array.isArray(turmas)
    ? [...new Map(turmas.map((t) => [t.serie, t.serie])).values()]
    : [];
  const turmasFiltradas = Array.isArray(turmas)
    ? turmas.filter((t) => t.serie === serie)
    : [];
  const turmaSelecionadaObj = turmas.find((t) => t.id === Number(turmaId));

  const handleConfirmar = () => {
    if (!turmaId || !data) {
      alert("Selecione a turma e a data");
      return;
    }
    router.push(`/chamada/lista?turma=${turmaId}&data=${data}`);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.fundoExterno}>
        <div style={styles.containerPrincipal}>
          <div style={styles.linhaCampos}>
            <div style={styles.campo}>
              <select
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                style={styles.select}
              >
                <option value="">Série</option>
                {series.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.campo}>
              <select
                value={turmaId}
                onChange={(e) => setTurmaId(e.target.value)}
                style={styles.select}
                disabled={!serie}
              >
                <option value="">Turma</option>
                {turmasFiltradas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.campo}>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.turmaSelecionada}>
            <span>Turma selecionada:</span>
            <strong>
              {turmaSelecionadaObj ? turmaSelecionadaObj.nome : "—"}
            </strong>
          </div>
        </div>

        <div style={styles.botaoContainer}>
          <button className="botao-confirmar-custom" onClick={handleConfirmar}>
            Confirmar
          </button>
        </div>
      </div>

      <style>{`
        .botao-confirmar-custom {
          width: 280px;
          height: 60px;
          background-color: #56CBE9;
          border: none;
          border-radius: 60px;
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: inset 0 2px 3px rgba(0,0,0,0.15);
        }
        .botao-confirmar-custom:hover {
          background-color: #58CAC4 !important;
          transform: scale(1.02);
        }
        .botao-confirmar-custom:active {
          transform: scale(0.98);
          background-color: #56CBE9 !important;
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  pageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  fundoExterno: {
    backgroundColor: "#B4E7F5",
    borderRadius: 60,
    padding: "40px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    width: "90%",
    maxWidth: "1200px",
    boxSizing: "border-box",
  },
  containerPrincipal: {
    backgroundColor: "#8DDBEF",
    borderRadius: 50,
    padding: "3rem 2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },
  linhaCampos: {
    display: "flex",
    flexWrap: "wrap" as const,     // corrigido: 'wrap' como const assertion
    gap: "30px",
    justifyContent: "center",
  },
  campo: {
    flex: "1 1 240px",
    minWidth: "200px",
  },
  select: {
    width: "100%",
    height: 60,
    borderRadius: 60,
    border: "1px solid rgba(255,255,255,0.77)",
    backgroundColor: "#B4E7F5",
    padding: "0 20px",
    fontSize: 18,
    color: "#153d4a",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    height: 60,
    borderRadius: 60,
    border: "1px solid rgba(255,255,255,0.77)",
    backgroundColor: "#B4E7F5",
    padding: "0 20px",
    fontSize: 18,
    color: "#153d4a",
    cursor: "pointer",
  },
  turmaSelecionada: {
    fontSize: 18,
    color: "#2a5f6e",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6DD2EC",
    padding: "16px 24px",
    borderRadius: 60,
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
  },
  botaoContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};
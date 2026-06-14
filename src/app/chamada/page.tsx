'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiChevronLeft,
  HiChevronDown,
  HiChevronUp,
  HiCheck,
} from 'react-icons/hi';

type Aluno = {
  id: number;
  nome: string;
  presente: boolean;
};

function pegarDataAtualBanco() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarDataTela(data: string) {
  const [ano, mes, dia] = data.split('-');

  return `${dia} / ${mes} / ${ano}`;
}

export default function ChamadaPage() {
  const router = useRouter();

  const [descricaoAberta, setDescricaoAberta] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [salvo, setSalvo] = useState(false);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);

  const dataChamada = pegarDataAtualBanco();
  const dataFormatada = formatarDataTela(dataChamada);

  const presentes = alunos.filter((aluno) => aluno.presente).length;
  const todosMarcados = alunos.length > 0 && presentes === alunos.length;

  async function buscarChamada() {
    try {
      setCarregando(true);

      const response = await fetch(
        `http://localhost:3333/chamadas?data=${dataChamada}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar chamada');
      }

      const dados = await response.json();

      const alunosFormatados = dados.map((aluno: any) => ({
        id: aluno.id,
        nome: aluno.nome,
        presente: Boolean(aluno.presente),
      }));

      setAlunos(alunosFormatados);
    } catch (error) {
      console.log(error);
      alert('Erro ao buscar chamada');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    setDescricao('');
    setSalvo(false);
    setDescricaoAberta(false);

    buscarChamada();
  }, []);

  function toggleAluno(id: number) {
    setSalvo(false);

    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.id === id ? { ...aluno, presente: !aluno.presente } : aluno
      )
    );
  }

  function marcarOuDesmarcarTudo() {
    setSalvo(false);

    setAlunos((prev) =>
      prev.map((aluno) => ({
        ...aluno,
        presente: !todosMarcados,
      }))
    );
  }

  async function salvarChamada() {
    try {
      const response = await fetch('http://localhost:3333/chamadas/salvar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          data_chamada: dataChamada,
          descricao,
          alunos,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar chamada');
      }

      setAlunos((prev) =>
        prev.map((aluno) => ({
          ...aluno,
          presente: false,
        }))
      );

      setSalvo(true);
      alert('Chamada salva com sucesso');
    } catch (error) {
      console.log(error);
      alert('Erro ao salvar chamada');
    }
  }

  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <header style={styles.header}>
          <button
            type="button"
            style={styles.voltar}
            onClick={() => router.back()}
          >
            <HiChevronLeft size={38} />
          </button>

          <div>
            <h1 style={styles.titulo}>Chamada</h1>
          </div>
        </header>

        <section style={styles.topCard}>
          <div style={styles.linhaSuperior}>
            <div style={styles.campoTopo}>4º Ano - A</div>
            <div style={styles.dataTopo}>{dataFormatada}</div>
          </div>

          <div style={styles.linhaInferior}>
            <button
              type="button"
              style={styles.descricaoBotao}
              onClick={() => setDescricaoAberta(!descricaoAberta)}
            >
              Descrição do Dia
              {descricaoAberta ? (
                <HiChevronUp size={22} />
              ) : (
                <HiChevronDown size={22} />
              )}
            </button>

            <button
              type="button"
              style={{
                ...styles.desmarcar,
                color: todosMarcados ? '#ec1111' : '#24bfa5',
              }}
              onClick={marcarOuDesmarcarTudo}
              disabled={carregando || alunos.length === 0}
            >
              {todosMarcados ? 'Desmarcar Tudo' : 'Marcar Tudo'}

              <span
                style={{
                  ...styles.miniQuadrado,
                  backgroundColor: todosMarcados ? '#ff0000' : '#25c4a8',
                }}
              >
                {!todosMarcados && <HiCheck size={16} color="#fff" />}
              </span>
            </button>

            <div style={styles.totalTopo}>
              <span>Total:</span>
              <strong>
                {presentes} / {alunos.length}
              </strong>
            </div>
          </div>

          {descricaoAberta && (
            <div style={styles.descricaoArea}>
              <textarea
                style={styles.textarea}
                value={descricao}
                onChange={(e) => {
                  setSalvo(false);
                  setDescricao(e.target.value);
                }}
                placeholder="Descrição do que foi apresentado em aula..."
              />
            </div>
          )}
        </section>

        <section style={styles.areaLista}>
          <div style={styles.listaContainer}>
            <div style={styles.lista} className="sem-scrollbar">
              {carregando && (
                <p style={styles.mensagemLista}>Carregando alunos...</p>
              )}

              {!carregando && alunos.length === 0 && (
                <p style={styles.mensagemLista}>Nenhum aluno encontrado.</p>
              )}

              {!carregando &&
                alunos.map((aluno, index) => (
                  <div key={aluno.id} style={styles.item}>
                    <div style={styles.statusArea}>
                      <button
                        type="button"
                        onClick={() => toggleAluno(aluno.id)}
                        style={{
                          ...styles.check,
                          backgroundColor: aluno.presente
                            ? '#25c4a8'
                            : '#ff0000',
                        }}
                      >
                        {aluno.presente && <HiCheck size={18} color="#fff" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAluno(aluno.id)}
                      style={{
                        ...styles.alunoCard,
                        backgroundColor: aluno.presente
                          ? '#6BCFD0'
                          : '#8DDCED',
                      }}
                    >
                      <span style={styles.numero}>{index + 1}º</span>
                      <span style={styles.nomeAluno}>{aluno.nome}</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div style={styles.rodape}>
            <div style={styles.infoRodape}>
              <span style={styles.infoRodapeTexto}>
                <strong>Total:</strong> {presentes} / {alunos.length}
              </span>

              <span style={styles.infoRodapeTexto}>
                <strong>Dia:</strong> {dataFormatada}
              </span>
            </div>

            <button
              type="button"
              style={{
                ...styles.salvar,
                backgroundColor: salvo ? '#25c4a8' : '#ff0000',
              }}
              onClick={salvarChamada}
              disabled={carregando || alunos.length === 0}
            >
              {salvo ? 'Salvo' : 'Salvar'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: any = {
  page: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    boxSizing: 'border-box',
    color: '#123b4b',
  },

  container: {
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  voltar: {
    width: 44,
    height: 44,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#050505',
    padding: 0,
  },

  titulo: {
    margin: 0,
    fontSize: 'clamp(34px, 2.8vw, 50px)',
    fontWeight: 750,
    color: '#050505',
    lineHeight: 1,
  },

  topCard: {
    width: '100%',
    backgroundColor: '#BAE8F4',
    border: '1px solid rgba(255, 255, 255, 0.77)',
    borderRadius: 30,
    padding: 14,
    boxSizing: 'border-box',
    boxShadow:
      '0 3px 10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  linhaSuperior: {
    display: 'grid',
    gridTemplateColumns: '1fr 260px',
    gap: 14,
  },

  campoTopo: {
    height: 46,
    borderRadius: 14,
    border: '1px solid rgba(255, 255, 255, 0.77)',
    backgroundColor: '#8CDAEF',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 18,
    boxSizing: 'border-box',
    fontSize: 'clamp(12px, 1.3vw, 18px)',
    fontWeight: 550,
    color: '#153d4a',
  },

  dataTopo: {
    height: 46,
    borderRadius: 14,
    border: '1px solid rgba(255, 255, 255, 0.77)',
    backgroundColor: '#8CDAEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'clamp(12px, 1.3vw, 18px)',
    fontWeight: 550,
    color: '#153d4a',
  },

  linhaInferior: {
    display: 'grid',
    gridTemplateColumns: '1fr 240px 180px',
    gap: 14,
    alignItems: 'center',
  },

  descricaoBotao: {
    height: 46,
    backgroundColor: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.77)',
    borderRadius: 1000,
    padding: '0 20px',
    fontSize: 'clamp(14px, 1vw, 18px)',
    fontWeight: 500,
    color: '#242424',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15)',
  },

  desmarcar: {
    height: 46,
    backgroundColor: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.77)',
    borderRadius: 1000,
    fontSize: 'clamp(14px, 1vw, 18px)',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15)',
  },

  miniQuadrado: {
    width: 22,
    height: 22,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  totalTopo: {
    height: 46,
    backgroundColor: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.77)',
    borderRadius: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    fontSize: 'clamp(12px, 1vw, 16px)',
    color: '#050505',
    boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15)',
  },

  descricaoArea: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.77)',
  },

  textarea: {
    width: '100%',
    minHeight: 95,
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: 16,
    fontSize: 16,
    color: '#333',
    boxSizing: 'border-box',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  areaLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  listaContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    boxSizing: 'border-box',
  },

  lista: {
    width: '100%',
    backgroundColor: '#BAE8F4',
    border: '1px solid rgba(255, 255, 255, 0.77)',
    borderRadius: 20,
    padding: 12,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    maxHeight: '56vh',
    overflowY: 'auto',
    boxShadow:
      '0 8px 22px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
  },

  mensagemLista: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
    color: '#153d4a',
  },

  item: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
    gap: 10,
    alignItems: 'center',
  },

  statusArea: {
    width: 34,
    height: 34,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  check: {
    width: 24,
    height: 24,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alunoCard: {
    width: '100%',
    minHeight: 36,
    border: '1px solid rgba(255, 255, 255, 0.55)',
    borderRadius: 1000,
    padding: '2px 20px',
    cursor: 'pointer',
    color: '#153d4a',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textAlign: 'left',
    transition: 'all .25s ease',
  },

  numero: {
    minWidth: 54,
    fontSize: 'clamp(10px, 1.2vw, 18px)',
    fontWeight: 500,
    color: '#111',
  },

  nomeAluno: {
    flex: 1,
    fontSize: 'clamp(12px, 1.2vw, 17px)',
    fontWeight: 545,
    color: '#202a2d',
  },

  rodape: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },

  infoRodape: {
    minWidth: 340,
    height: 50,
    backgroundColor: '#ffffff',
    border: '2px solid #c1bfbf',
    borderRadius: 14,
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 60,
    boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15)',
  },

  infoRodapeTexto: {
    fontSize: 'clamp(12px, 1.1vw, 14px)',
    color: '#333',
  },

  salvar: {
    width: 170,
    height: 50,
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 'clamp(20px, 1.8vw, 22px)',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15)',
    transition: 'all .25s ease',
  },
};
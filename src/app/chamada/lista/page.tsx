// app/chamada/lista/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function ChamadaListaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const turmaId = searchParams.get('turma');
  const dataParam = searchParams.get('data');

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [descricao, setDescricao] = useState('');
  const [descricaoAberta, setDescricaoAberta] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvo, setSalvo] = useState(false);

  // Dados mockados para teste (enquanto o backend não estiver pronto)
  const mockAlunos = [
    { id: 1, nome: 'Ana Clara', presente: true },
    { id: 2, nome: 'Bruno Souza', presente: false },
    { id: 3, nome: 'Carla Lima', presente: true },
  ];

  useEffect(() => {
    if (!turmaId || !dataParam) {
      router.push('/chamada');
      return;
    }

    // Tente buscar do backend; se falhar, use mock
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chamadas?data=${dataParam}&turma=${turmaId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro na API');
        return res.json();
      })
      .then((dados) => {
        const formatados = dados.map((a: any) => ({
          id: a.id,
          nome: a.nome,
          presente: Boolean(a.presente),
        }));
        setAlunos(formatados);
      })
      .catch((err) => {
        console.warn('Usando dados mockados:', err);
        setAlunos(mockAlunos);
      })
      .finally(() => setCarregando(false));
  }, [turmaId, dataParam, router]);

  const presentes = alunos.filter((a) => a.presente).length;
  const todosMarcados = alunos.length > 0 && presentes === alunos.length;

  function toggleAluno(id: number) {
    setSalvo(false);
    setAlunos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, presente: !a.presente } : a))
    );
  }

  function marcarOuDesmarcarTudo() {
    setSalvo(false);
    setAlunos((prev) =>
      prev.map((a) => ({ ...a, presente: !todosMarcados }))
    );
  }

  async function salvarChamada() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chamadas/salvar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        data_chamada: dataParam,
        turma_id: Number(turmaId),
        descricao,
        alunos,
  }),
});
      if (!response.ok) throw new Error('Erro ao salvar');
      setSalvo(true);
      alert('Chamada salva!');
    } catch (error) {
      alert('Erro ao salvar');
    }
  }

  const dataFormatada = dataParam
    ? dataParam.split('-').reverse().join(' / ')
    : '';

  // Nome da turma – você pode buscar do backend, mas por enquanto fixo
  const nomeTurma = turmaId === '1' ? '4º Ano - A' : '5º Ano - B';

  return (
    <div style={styles.telaCinza}>
      <div style={styles.telaBranca}>
        <div style={styles.conteudo}>
          <div style={styles.headerLista}>
            <button style={styles.voltar} onClick={() => router.back()}>
              <HiChevronLeft size={38} />
            </button>
            <h1 style={styles.titulo}>Chamada</h1>
          </div>

          <div style={styles.card}>
            <div style={styles.linhaSuperior}>
              <div style={styles.campoTopo}>{nomeTurma}</div>
              <div style={styles.dataTopo}>{dataFormatada}</div>
            </div>

            <div style={styles.linhaInferior}>
              <button
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
          </div>

          <div style={styles.areaLista}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  telaCinza: {
    backgroundColor: '#616467',
    width: '100%',
    height: '100vh',
    display: 'flex',
    paddingTop: '1.5%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  telaBranca: {
    backgroundColor: 'white',
    width: '95%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderTopRightRadius: 'clamp(30px, 5vw, 80px)',
    overflow: 'hidden',
  },
  conteudo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    padding: '20px 30px',
    overflow: 'auto',
  },
  headerLista: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
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
    fontSize: 'clamp(24px, 3.5vw, 52px)',
    color: '#050505',
    lineHeight: 1,
  },
  card: {
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
    marginBottom: 20,
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
    flex: 1,
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
    border: 'none',
  },
};
'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

import Header from '../components/Header';
import NavBar from '../components/NavBar';

import styles from '../../styles/TelaListaNotificacoes.module.css';

type AbaNotificacao = 'avisos' | 'excluidos';

interface Notificacao {
  id: number;
  tempo: string;
  titulo: string;
  mensagem: string;
}

const notificacoesMock: Notificacao[] = [
  {
    id: 1,
    tempo: 'Há 6 dias',
    titulo: 'Frequência pendente',
    mensagem:
      'Olá, professor(a). Identificamos que a frequência da aula de hoje ainda não foi registrada no diário de classe. Acesse o sistema escolar assim que possível para atualizar as presenças e faltas dos alunos.',
  },
  {
    id: 2,
    tempo: 'Há 1 semana',
    titulo: 'Lançamento de notas',
    mensagem:
      'Olá, professor(a). O prazo para lançamento das notas está se aproximando. Verifique suas turmas no sistema e finalize os registros avaliativos para manter as informações acadêmicas atualizadas.',
  },
  {
    id: 3,
    tempo: 'Há 2 semanas',
    titulo: 'Comunicado da coordenação',
    mensagem:
      'Olá, professor(a). A coordenação publicou um novo comunicado com orientações importantes para a rotina escolar. Acesse o sistema para ler a mensagem completa.',
  },
  {
    id: 4,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 5,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 6,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 7,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 8,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 9,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 10,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
  {
    id: 11,
    tempo: 'Há 3 semanas',
    titulo: 'Reunião pedagógica',
    mensagem:
      'Olá, professor(a). Uma reunião pedagógica foi agendada e sua participação é importante. Consulte no calendário escolar a data, o horário e as informações relacionadas ao encontro.',
  },
];

export default function TelaNotificacoes() {
  const [abaSelecionada, setAbaSelecionada] =
    useState<AbaNotificacao>('avisos');

  const [notificacoesSelecionadas, setNotificacoesSelecionadas] = useState<
    number[]
  >([1, 2]);

  const [pesquisa, setPesquisa] = useState('');

  const alternarNotificacao = (id: number) => {
    setNotificacoesSelecionadas((selecionadas) => {
      if (selecionadas.includes(id)) {
        return selecionadas.filter((notificacaoId) => notificacaoId !== id);
      }

      return [...selecionadas, id];
    });
  };

  const selecionarTodas = () => {
    if (notificacoesSelecionadas.length === notificacoesMock.length) {
      setNotificacoesSelecionadas([]);
      return;
    }

    setNotificacoesSelecionadas(
      notificacoesMock.map((notificacao) => notificacao.id)
    );
  };

  const todasSelecionadas =
    notificacoesSelecionadas.length === notificacoesMock.length;

  return (
    <main className={styles.paginaNotificacoes}>
      <div className={styles.headerTelaNotificacoes}>
        <Header />
      </div>

      <div className={styles.telaNotificacoes}>
        <div className={styles.menuLateral}>
          <NavBar />
        </div>
      <div className={styles.containerConteudos}>

        <div className={styles.parteSuperior}>
          <div className={styles.cabecalhoConteudo}>
            <h1 className={styles.tituloPagina}>
              Notificações
            </h1>

            <div className={styles.abas}>
              <button
                type="button"
                className={`${styles.botaoAba} ${
                  abaSelecionada === 'avisos'
                    ? styles.botaoAbaSelecionado
                    : ''
                }`}
                onClick={() => setAbaSelecionada('avisos')}
              >
                Todos os Avisos
              </button>

              <button
                type="button"
                className={`${styles.botaoAba} ${
                  abaSelecionada === 'excluidos'
                    ? styles.botaoAbaSelecionado
                    : ''
                }`}
                onClick={() => setAbaSelecionada('excluidos')}
              >
                Excluídos
              </button>
            </div>
          </div>

          <div className={styles.areaPesquisa}>
            <Search
              className={styles.iconePesquisa}
              size={20}
              strokeWidth={2}
            />

            <input
              type="text"
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              placeholder="Pesquise por nome"
              className={styles.inputPesquisa}
            />
          </div>
        </div>

        <div className={styles.parteInferior}>

          <div className={styles.filtros}>
            <button
              type="button"
              className={styles.botaoFiltro}
            >
              Data
              <ChevronDown size={16} />
            </button>

            <button
              type="button"
              className={styles.botaoFiltro}
            >
              Não Lido
            </button>

            <button
              type="button"
              className={styles.botaoFiltro}
            >
              Excluir Avisos de Sistema
            </button>

            <button
              type="button"
              className={styles.botaoFiltro}
            >
              Com anexo
            </button>
          </div>

          <div className={styles.acoes}>
            <button
              type="button"
              className={styles.selecionarTudo}
              onClick={selecionarTodas}
            >
              <span>Selecionar Tudo</span>

              <span
                className={`${styles.checkboxSelecionarTudo} ${
                  todasSelecionadas
                    ? styles.checkboxSelecionarTudoMarcado
                    : ''
                }`}
              >
                {todasSelecionadas && '✓'}
              </span>
            </button>

            <button
              type="button"
              className={styles.botaoRecuperar}
            >
              Recuperar
            </button>

            <button
              type="button"
              className={styles.botaoExcluir}
            >
              Excluir
            </button>
          </div>

          <div className={styles.listaDeNotificacoes}>
            {notificacoesMock.map((notificacao) => {
              const selecionada =
                notificacoesSelecionadas.includes(notificacao.id);

              return (
                <div
                  key={notificacao.id}
                  className={`${styles.notificacao} ${
                    selecionada
                      ? styles.notificacaoSelecionada
                      : ''
                  }`}
                  onClick={() =>
                    alternarNotificacao(notificacao.id)
                  }
                >
                  <div className={styles.linhaTempo}>
                    <input
                      type="checkbox"
                      checked={selecionada}
                      className={styles.checkboxNotificacao}
                      onChange={() =>
                        alternarNotificacao(notificacao.id)
                      }
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      aria-label={`Selecionar ${notificacao.titulo}`}
                    />

                    <span className={styles.tempoNotificacao}>
                      {notificacao.tempo}
                    </span>
                  </div>

                  <div className={styles.cabecalhoNotificacao}>
                    <span className={styles.tituloNotificacao}>
                      {notificacao.titulo}
                    </span>
                  </div>

                  <div className={styles.conteudoNotificacao}>
                    {notificacao.mensagem}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.avisoExclusao}>
            Essas notificações serão excluídas automaticamente
            depois de 30 dias.
          </div>

        </div>

      </div>
      </div>
    </main>
  );
}
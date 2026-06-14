'use client';
import AreaNotificacoes from './AreaNotificacoes';
import { useRef } from 'react';
import {
    HiDotsHorizontal,
    HiChevronLeft,
    HiChevronRight
} from 'react-icons/hi';


export default function AreaAvisos() {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollRight = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: scrollRef.current.clientWidth,
            behavior: 'smooth'
        });
    };

    const scrollLeft = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: -scrollRef.current.clientWidth,
            behavior: 'smooth'
        });
    };

    return (
        <div style={styles.container}>
                <div style={styles.listaAvisos}>
                    <div style={styles.tituloAvisosImportantes}>
                        <p style={{fontSize: 'clamp(20px, 3vw, 45px)'}}>Avisos Importantes</p>
                    </div>

                    <div style={styles.areaCarrossel}>
                        <button
                            style={styles.setaEsquerda}
                            className="setaVidro"
                            onClick={scrollLeft}
                        >
                            <HiChevronLeft size={26} color='black'/>
                        </button>

                        <div ref={scrollRef} style={styles.containerAvisos} className="sem-scrollbar">
                            <div className="cardHover avisoHover" style={styles.aviso}>
                                <div style={styles.titulo}>Nova atividade disponível</div>
                                <div style={styles.conteudo}>
                                    Uma nova atividade foi cadastrada para sua turma.
                                    Acesse o sistema para visualizar os detalhes e acompanhar os prazos.
                                </div>
                                <HiDotsHorizontal size={38} style={styles.tresPontinhos} />
                            </div>

                            <div className="cardHover avisoHover" style={styles.aviso}>
                                <div style={styles.titulo}>Lançamento de notas pendente</div>
                                <div style={styles.conteudo}>
                                    <p>O prazo de lançamento das notas está se aproximando. Verifique suas turmas e atualize as informações.</p>
                                </div>
                                <HiDotsHorizontal size={38} style={styles.tresPontinhos} />
                            </div>

                            <div className="cardHover avisoHover" style={styles.aviso}>
                                <div style={styles.titulo}>Registro de frequência pendente</div>
                                <div style={styles.conteudo}>
                                    A frequência da aula ainda não foi registrada.
                                    Acesse o diário de classe e conclua o lançamento.
                                </div>
                                <HiDotsHorizontal size={38} style={styles.tresPontinhos} />
                            </div>

                            <div className="cardHover avisoHover" style={styles.aviso}>
                                <div style={styles.titulo}>Reunião pedagógica</div>
                                <div style={styles.conteudo}>
                                    Haverá reunião pedagógica na próxima sexta-feira às 14h.
                                </div>
                                <HiDotsHorizontal size={38} style={styles.tresPontinhos} />
                            </div>

                            <div className="cardHover avisoHover" style={styles.aviso}>
                                <div style={styles.titulo}>Atualização do sistema</div>
                                <div style={styles.conteudo}>
                                    Uma nova versão do sistema será disponibilizada nesta semana.
                                </div>
                                <HiDotsHorizontal size={38} style={styles.tresPontinhos} />
                            </div>
                        </div>

                        <button
                            style={styles.setaDireita}
                            className="setaVidro"
                            onClick={scrollRight}
                        >
                            <HiChevronRight size={26} color='black' />
                        </button>
                    </div>
                </div>
            <AreaNotificacoes/>
        </div>
    );
}

const styles = {
    // Novo: display flex column + gap, ocupa 100% do AreaConteudo
    container: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box' as const,

        border: '1px solid rgba(255, 255, 255, 0.77)',
        borderRadius: 30,
        padding: 20,
        zIndex: 800,
        backgroundColor: '#BAE8F4',
        boxShadow:
            '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',

        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2%',
        minHeight: 0,
        overflow: 'hidden',
    },

    // height:'40vh' + marginBottom -> flex: '1 1 58%' (proporcional)
    // flex: '1 1 58%' -> '1 1 52%' (um pouco menor, sobra espaço pra Notificações)
    listaAvisos: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        flex: '1 1 52%',
        minHeight: 0,
        backgroundColor: '#8CDAEF',
        border: '1px solid rgba(255, 255, 255, 0.77)',
        borderRadius: 30,
        overflow: 'hidden',
        zIndex:'900',
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },

    botoes: {
        display: 'flex',
        gap: 10
    },

    botaoNavegacao: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer'
    },

    containerAvisos: {
        height: 'calc(100% - 60px)',
        display: 'flex',
        gap: 15,
        overflowX: 'auto' as const,

        paddingLeft: '2%',
        paddingRight: '2%',
        paddingTop: '12px',
        paddingBottom: '12px',

        boxSizing: 'border-box' as const,
        alignItems: 'center',
    },

    // Removido backdropFilter/WebkitBackdropFilter (blur) deste card.
    // Estava sendo aplicado em 5 cards ao mesmo tempo + nos containers pais,
    // causando travamento de renderização ("tela pesada").
    // Aumentei a opacidade do background (0.22 -> 0.35) para compensar visualmente.
    aviso: {
    flex: '0 0 calc((100% - 30px) / 3)',
    minWidth: 'calc((100% - 30px) / 3)',

    height: '90%',
    minHeight: '170px',

    background: 'rgba(255,255,255,0.35)',
    border: '1px solid rgba(255,255,255,0.35)',
    borderRadius: 20,
    padding: 16,
    cursor: 'pointer',
    transition: 'all .25s ease',
    boxShadow:
        '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',

    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',  // era 'space-between' — causava o espaço vazio gigante
    gap: 12,                       // adiciona espaçamento controlado entre título e texto
    zIndex: 1000,
    position: 'relative' as const,
},
    
    //fontSize fixo (28px) -> clamp
    titulo: {
        fontWeight: 600,
        fontSize: 'clamp(16px, 2vw, 28px)',
        marginTop:17,
        marginLeft:5
    },

    //fontSize fixo (18px) -> clamp
    conteudo: {
        fontSize: 'clamp(12px, 1.2vw, 18px)',
        opacity: 0.85,
        lineHeight: 1.5,
        marginLeft:5,
        marginRight:5
    },

    tresPontinhos: {
    position: 'absolute' as const,  //era 'marginLeft: 90%' — agora fica fixo no canto
    bottom: 16,
    right: 16,
},

    tituloAvisosImportantes:{
        marginTop:'1.5%',
        marginLeft:'3%',
    },
    areaCarrossel: {
        position: 'relative' as const,
        flex: 1,
        display: 'flex',
        alignItems: 'center',

    },

setaEsquerda: {
    position: 'absolute' as const,
    left: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1001,

    width: 62,
    height: 62,

    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.55)',

    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(14px) saturate(180%)',
    WebkitBackdropFilter: 'blur(14px) saturate(180%)',

    color: 'rgba(255, 255, 255, 0.95)',
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    boxShadow:
        '0 8px 24px rgba(0,0,0,0.16), inset 0 1px 1px rgba(255,255,255,0.65), inset 0 -1px 4px rgba(255,255,255,0.18)',

    overflow: 'hidden',
},

setaDireita: {
    position: 'absolute' as const,
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1001,

    width: 62,
    height: 62,

    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.55)',

    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(14px) saturate(180%)',
    WebkitBackdropFilter: 'blur(14px) saturate(180%)',

    color: 'rgba(255, 255, 255, 0.95)',
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    boxShadow:
        '0 8px 24px rgba(0,0,0,0.16), inset 0 1px 1px rgba(255,255,255,0.65), inset 0 -1px 4px rgba(255,255,255,0.18)',

    overflow: 'hidden',
},
};
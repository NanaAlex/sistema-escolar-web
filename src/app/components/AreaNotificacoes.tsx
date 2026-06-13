export default function AreaNotificacoes() {
    return (
        <div style={styles.container}>
            <div style={styles.tituloArea}>
                <p style={{fontSize: 'clamp(20px, 3vw, 38px)', fontWeight:400}}>Notificações</p>
            </div>

            <div style={styles.listaNotificacoes} className="sem-scrollbar">
                <div className="cardHover notificacaoHover" style={styles.notificacao }>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Frequência pendente</p></div>
                    <div style={styles.conteudoNotificacao}><p style={styles.textoConteudo}>Olá professor(a). A frequência diária ainda não foi registrada para uma ou mais turmas.
                Acesse o diário de classe para concluir o lançamento e manter os registros atualizados. </p></div>
                </div>

                <div className="cardHover notificacaoHover" style={styles.notificacao}>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Nova atividade entregue</p></div>
                    <div style={styles.conteudoNotificacao}><p style={styles.textoConteudo}>Olá, professor(a). Há novas atividades enviadas pelos alunos aguardando correção.
                Verifique os envios recentes para avaliar o desempenho da turma e fornecer feedback.</p></div>
                </div> 

                <div className="cardHover notificacaoHover" style={styles.notificacao}>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Nova atividade entregue</p></div>
                    <div style={styles.conteudoNotificacao}><p style={styles.textoConteudo}>Atenção! O prazo para lançamento das notas do bimestre encerra-se em breve.
                Certifique-se de revisar e registrar todas as avaliações antes da data limite.</p></div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container:{
        display:'flex',
        flexDirection:'column' as const,
        width:'100%',
        flex: '1 1 48%',
        minHeight: 0,
        marginTop:'2%',
        backgroundColor: '#66C6F1',
        borderRadius: 30,
        overflow: 'hidden',
        zIndex:'900',
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },
    tituloArea:{
        marginTop:'1%',
        marginLeft:'3%',
        marginBottom:'1%',
        paddingTop:'10px',
    },
    listaNotificacoes: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 8,
        width: '95%',
        backgroundColor: '#8CDAEF',
        padding: '12px',
        borderRadius: 30,
        marginLeft: '2.5%',
        border: '1px solid rgba(255, 255, 255, 0.77)',
        boxSizing: 'border-box' as const,
        marginBottom: '2%',
        overflowY: 'auto' as const,
        flex: 1,
        minHeight: 0,
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },

    notificacao: {
        display: 'flex',
        flexDirection: 'row' as const,
        border: '1px solid rgba(255, 255, 255, 0.77)',
        gap: 10,
        width: '100%',
        flex: 1,
        minHeight: 0,
        borderRadius: 1000,
        backgroundColor: '#5EBBE6',
        paddingRight: '0px',
        cursor: 'pointer',
        position: 'relative' as const,
        boxSizing: 'border-box' as const,
        transition: 'all .25s ease',
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },

    tituloNotificacao:{
        minWidth:'180px',
        padding:'12px',
        display:'flex',
        alignItems:'center',
    },

    textoTitulo:{
        fontSize: 'clamp(14px, 1.4vw, 20px)',
        fontWeight:500
    },
    conteudoNotificacao:{
        borderRadius: 1000,
        borderLeft:'white solid 1px',
        paddingLeft:'10px',
        padding:'10px',
        flex:1,
        display:'flex',
        alignItems:'center',
    },
    
    textoConteudo: {
        fontSize: 'clamp(12px, 1vw, 15px)',
        margin: 0,
    },
};
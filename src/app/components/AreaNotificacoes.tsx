import { Height, Padding } from "@mui/icons-material";
import { p } from "framer-motion/client";

export default function AreaNotificacoes() {
    return (
        <div style={styles.container}>
            <div style={styles.tituloArea}>
                <p style={{fontSize:45, fontWeight:400}}>Notificações</p>
            </div>
            <div style={styles.listaNotificacoes}>
                <div className="cardHover notificacaoHover" style={styles.notificacao }>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Frequência pendente</p></div>
                    <div style={styles.conteudoNotificacao}><p>Olá professor(a). A frequência diária ainda não foi registrada para uma ou mais turmas.
                Acesse o diário de classe para concluir o lançamento e manter os registros atualizados. </p></div>
                </div>
                <div className="cardHover notificacaoHover" style={styles.notificacao}>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Nova atividade entregue</p></div>
                    <div style={styles.conteudoNotificacao}><p>Olá, professor(a). Há novas atividades enviadas pelos alunos aguardando correção.
                Verifique os envios recentes para avaliar o desempenho da turma e fornecer feedback.</p></div>
                </div>  
                <div className="cardHover notificacaoHover" style={styles.notificacao}>
                    <div style={styles.tituloNotificacao}><p style={styles.textoTitulo}>Nova atividade entregue</p></div>
                    <div style={styles.conteudoNotificacao}><p>Atenção! O prazo para lançamento das notas do bimestre encerra-se em breve.
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
        minHeight:'250px',
        marginTop:'2%',
        backgroundColor: '#66C6F1',
        borderRadius: 30,
        overflow: 'hidden',
        zIndex:'900',
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },
    tituloArea:{
        marginTop:'1.5%',
        marginLeft:'3%',
        marginBottom:'2%',
        paddingTop:'15px',
        padingLeft:'15px',
    },
    listaNotificacoes: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 12,
        width: '95%',
        backgroundColor: '#8CDAEF',
        padding: '16px',
        borderRadius: 30,
        marginLeft: '2.5%',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.77)',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '90%',
        marginBottom: '2%',
        boxSizing: 'border-box' as const,
        overflow: 'hidden',
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },

    notificacao: {
        display: 'flex',
        flexDirection: 'row' as const,
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.77)',
        gap: 10,
        width: '100%',
        minHeight: '70px',
        borderRadius: 1000,
        backgroundColor: '#5EBBE6',
        paddingRight: '0px',
        cursor: 'pointer',
        position: 'relative' as const,
        boxSizing: 'border-box' as const,
        boxShadow:
            '0 3px 22px rgba(212, 212, 212, 0.57), inset 0 1px 0 rgba(255,255,255,0.4)',
    },
    tituloNotificacao:{
        minWidth:'180px',
        padding:'15px',
        display:'flex',
        alignItems:'center',
    },
    textoTitulo:{
        fontSize:24,
        fontWeight:500
    },
    conteudoNotificacao:{
        borderRadius: 1000,
        borderLeft:'white solid 1px',
        paddingLeft:'10px',
        paddingTop:'10px',
        paddingBottom:'10px',
        flex:1,
        padding:'15px',
        justifyContent:'center',
        alignContent:'center'
    },

};
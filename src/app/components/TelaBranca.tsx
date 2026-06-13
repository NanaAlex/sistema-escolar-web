import NavBar from './NavBar'
import Header from './Header'
import AreaConteudo from './AreaConteudo'

export default function TelaBranca() {
    return (
        <div style={styles.telaCinza}>
            <div style={styles.telaBranca}>
                <NavBar/>
                <div style={styles.conteudo}>
                    <Header/>
                    <AreaConteudo/>
                </div>
            </div>
        </div>
    );
}

const styles = {
    // minHeight:'100vh' -> height:'100vh' + overflow:'hidden'
    // Trava a altura total em 100vh, impedindo scroll na página.
    telaCinza: {
        backgroundColor:'#616467',
        width:'100%',
        height:'100vh',
        display:'flex',
        paddingTop:'1.5%',
        boxSizing:'border-box' as const,
        overflow:'hidden',
    },

    // minHeight:'100vh' -> height:'100%' (ocupa toda a altura do telaCinza)
    telaBranca: {
        backgroundColor:'white',
        width:'95%',
        height:'100%',
        display:'flex',
        flexDirection:'row' as const,
        borderTopRightRadius:'clamp(30px, 5vw, 80px)',
        overflow:'hidden',
    },

    // Novo: define altura 100% para que Header e AreaConteudo
    // possam dividir esse espaço proporcionalmente.
    conteudo: {
        flex:1,
        display:'flex',
        flexDirection:'column' as const,
        height:'100%',
        minHeight: 0,
    }
};
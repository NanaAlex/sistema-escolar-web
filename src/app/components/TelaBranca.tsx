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
    telaCinza: {
        backgroundColor:'#616467',
        width:'100%',
        minHeight:'100vh',
        display:'flex',
        paddingTop:'1.5%'
    },

    telaBranca: {
        backgroundColor:'white',

        width:'95%',
        minHeight:'100vh',

        display:'flex',
        flexDirection:'row' as const,

        borderTopRightRadius:80
    },

    conteudo: {
        flex:1,
        display:'flex',
        flexDirection:'column' as const,
    }
};
import { BiFontSize } from "react-icons/bi";

export default function Header() {
    return (
        <div style={styles.container}>
            <div style={styles.textoBoasVindas}>
                <h1 style={{fontSize:78}}>
                    Bem-Vindo
                    <br />
                      de Volta!</h1>
            </div>
            <div style={styles.textoData}>
                <p style={{fontSize:26, fontWeight:'light',}}>20 de Maio de 2026</p>
            </div>            
        </div>
    );
}

const styles = {
    textoBoasVindas: {
        marginTop:'2.5%',
        marginLeft:'5%'
    },
    textoData:{
        marginTop:'2.5%',
        fontSize:'medium',
        marginRight:'5%'
        
    },
    container:{
        height:'30vh',
        width:'100%',
        flexDirection:'row' as const,
        justifyContent:'space-between',
        display:'flex'
    }

};
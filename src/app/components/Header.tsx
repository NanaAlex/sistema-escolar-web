import { BiFontSize } from "react-icons/bi";

export default function Header() {
    return (
        <div style={styles.container}>
            <div style={styles.textoBoasVindas}>
                <h1 style={styles.titulo}>
                    Bem-Vindo
                    <br />
                      de Volta!</h1>
            </div>
            <div style={styles.textoData}>
                <p style={styles.data}>20 de Maio de 2026</p>
            </div>            
        </div>
    );
}

const styles = {
    textoBoasVindas: {
        marginTop:'1.5%',
        marginLeft:'5%'
    },
    textoData:{
        marginTop:'1.5%',
        marginRight:'5%'
    },
    // ⚠️ flex: '0 0 28%' -> '0 0 18%' (header menor, mais espaço pro conteúdo)
    container:{
        flex: '0 0 18%',
        width:'100%',
        flexDirection:'row' as const,
        justifyContent:'space-between',
        display:'flex'
    },
    // ⚠️ clamp(32px, 5vw, 78px) -> clamp(24px, 3.5vw, 52px) — menor
    titulo: {
        fontSize: 'clamp(24px, 3.5vw, 52px)',
    },
    // ⚠️ clamp(14px, 1.5vw, 26px) -> clamp(12px, 1.2vw, 18px) — menor
    data: {
        fontSize: 'clamp(12px, 1.2vw, 18px)',
        fontWeight: 'lighter' as const,
    }
};
import AreaAvisos from './AreaAvisos'
import AreaNotificacoes from './AreaNotificacoes';

export default function AreaConteudo() {
    return (
        <div style={styles.container}>
            <AreaAvisos/>
        </div>
    );
}

const styles = {
    // flex: '1 1 72%' -> '1 1 82%' (header passou de 28% para 18%)
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        flex: '1 1 82%',
        minHeight: 0,
        width: '100%',
        paddingInline: '3%',
        boxSizing: 'border-box' as const,
        borderRadius: 30,
    }
};
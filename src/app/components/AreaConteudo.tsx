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
    container: {
        display: 'flex',
        width: '100%',
        paddingInline: '3%',
        boxSizing: 'border-box' as const,
        borderRadius: 30,
        flexDirection: 'column' as const,
    }
};
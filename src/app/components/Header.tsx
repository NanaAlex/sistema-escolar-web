import styles from '../../styles/Header.module.css'
import { CircleUserRound } from 'lucide-react';


export default function Header(){
    return(
        <div className={styles.container}>
            <div className={styles.logoHeader}>
                <text className={styles.textoHeader}>UniClass</text>
            </div>

            <div className={styles.perfilHeader}>
                <div  className={styles.nomeProfessorHeader}>
                    <text className={styles.textoNomeProfessorHeader}>João Gomes</text>
                </div>

            <div className={styles.iconePerfilHeader}>
                <CircleUserRound
                    size={64}
                    color="white"
                    strokeWidth={2}
                />
            </div>

            </div>
        </div>
    );
}
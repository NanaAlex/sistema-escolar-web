import Header from './components/Header'
import NavBar from './components/NavBar'
import styles from '../styles/Page.module.css'
import Carrossel from './components/Carrossel'
import ListaNotificacoes from './components/ListaNotificacoes'
import ListaTurmas from './components/ListaTurmas'


export default function Page() {
  return (
    <main>
      <div className={styles.headerHome}>
        <Header />
      </div>

      <div className={styles.telaHome}>
        <div className={styles.menuLateral}>
          <NavBar />
        </div>
        
        <div className={styles.conteudosHome}>
          <div className={styles.parteSuperior}>
            <div className={styles.textosTopo}>
              <div className={styles.olaProfessor}>
                <h1 className={styles.olaProfessorTexto}>Olá, Prof. João Gomes!</h1>
              </div>
              <div className={styles.data}>
                <h1 className={styles.dataTexto}>Terça - 15/07</h1>
              </div>
            </div>

            <Carrossel />
          </div>

          <div className={styles.parteInferior}>
            <ListaNotificacoes />
            <ListaTurmas />
          </div>
        </div>
        
      </div>
      
    </main>
  );
}
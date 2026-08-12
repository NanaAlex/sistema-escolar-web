import Header from './components/Header'
import NavBar from './components/NavBar'
import styles from '../styles/Page.module.css'

export default function Page() {
  return (
    <main>
      <div>
        <Header />
      </div>

      <div>
        <NavBar />
      </div>
      
    </main>
  );
}
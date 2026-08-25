'use client';

import { usePathname, useRouter } from 'next/navigation';

import styles from '../../styles/NavBar.module.css';

import {
  Bell,
  House,
  DoorClosed,
  List,
  ScrollText,
  Cog,
  LogOut
} from 'lucide-react';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const estaSelecionado = (rota: string) => {
    if (rota === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(rota);
  };

  return (
    <div className={styles.container}>

      <div className={styles.barraSuperior}>

        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/notificacoes')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/notificacoes')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <Bell
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Notificações</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <House
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Tela Inicial</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/turmas')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/turmas')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <DoorClosed
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Turmas</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/chamada')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/chamada')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <List
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Chamada</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/documentos')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/documentos')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <ScrollText
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Documentos</span>
          </div>
        </div>

      </div>


      <div className={styles.barraInferior}>

        <div
          className={`${styles.itemBarraLateral} ${
            estaSelecionado('/configuracoes')
              ? styles.itemSelecionado
              : ''
          }`}
          onClick={() => router.push('/configuracoes')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <Cog
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Configurações</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${styles.itemSair}`}
        >
          <div className={styles.iconeItemBarraLateral}>
            <LogOut
              size={42}
              strokeWidth={2}
            />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Sair</span>
          </div>
        </div>

      </div>

    </div>
  );
}
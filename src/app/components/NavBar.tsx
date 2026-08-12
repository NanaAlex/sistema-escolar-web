'use client';

import { useState } from 'react';
import styles from '../../styles/NavBar.module.css';
import { Bell, House, DoorClosed, List, ScrollText, Cog, LogOut } from 'lucide-react';

export default function NavBar() {
  const [itemSelecionado, setItemSelecionado] = useState('inicio');

  return (
    <div className={styles.container}>
      <div className={styles.barraSuperior}>

        <div
          className={`${styles.itemBarraDePesquisa} ${
            itemSelecionado === 'notificacoes' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('notificacoes')}
        >
          <div className={styles.iconeItemBarraDePesquisa}>
            <Bell size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraDePesquisa}>
            <span>Notificações</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraDePesquisa} ${
            itemSelecionado === 'inicio' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('inicio')}
        >
          <div className={styles.iconeItemBarraDePesquisa}>
            <House size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraDePesquisa}>
            <span>Tela Inicial</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraDePesquisa} ${
            itemSelecionado === 'turmas' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('turmas')}
        >
          <div className={styles.iconeItemBarraDePesquisa}>
            <DoorClosed size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraDePesquisa}>
            <span>Turmas</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraDePesquisa} ${
            itemSelecionado === 'chamada' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('chamada')}
        >
          <div className={styles.iconeItemBarraDePesquisa}>
            <List size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraDePesquisa}>
            <span>Chamada</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraDePesquisa} ${
            itemSelecionado === 'documentos' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('documentos')}
        >
          <div className={styles.iconeItemBarraDePesquisa}>
            <ScrollText size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraDePesquisa}>
            <span>Documentos</span>
          </div>
        </div>

    </div>

    <div className={styles.barraInferior}>

    <div
        className={`${styles.itemBarraDePesquisa} ${
        itemSelecionado === 'configuracoes'
            ? styles.itemSelecionado
            : ''
        }`}
        onClick={() => setItemSelecionado('configuracoes')}
    >
        <div className={styles.iconeItemBarraDePesquisa}>
        <Cog
            size={42} strokeWidth={2}
        />
        </div>

        <div className={styles.nomeItemBarraDePesquisa}>
        <span>Configurações</span>
        </div>
    </div>


    <div className={`${styles.itemBarraDePesquisa} ${styles.itemSair}`}>
        <div className={styles.iconeItemBarraDePesquisa}>
        <LogOut
            size={42} strokeWidth={2}
        />
        </div>

        <div className={styles.nomeItemBarraDePesquisa}>
        <span>Sair</span>
        </div>
    </div>

    </div>
        </div>
  );
}
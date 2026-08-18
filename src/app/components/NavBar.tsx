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
          className={`${styles.itemBarraLateral} ${
            itemSelecionado === 'notificacoes' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('notificacoes')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <Bell size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Notificações</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            itemSelecionado === 'inicio' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('inicio')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <House size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Tela Inicial</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            itemSelecionado === 'turmas' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('turmas')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <DoorClosed size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Turmas</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            itemSelecionado === 'chamada' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('chamada')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <List size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Chamada</span>
          </div>
        </div>


        <div
          className={`${styles.itemBarraLateral} ${
            itemSelecionado === 'documentos' ? styles.itemSelecionado : ''
          }`}
          onClick={() => setItemSelecionado('documentos')}
        >
          <div className={styles.iconeItemBarraLateral}>
            <ScrollText size={42} strokeWidth={2} />
          </div>

          <div className={styles.nomeItemBarraLateral}>
            <span>Documentos</span>
          </div>
        </div>

    </div>

    <div className={styles.barraInferior}>

    <div
        className={`${styles.itemBarraLateral} ${
        itemSelecionado === 'configuracoes'
            ? styles.itemSelecionado
            : ''
        }`}
        onClick={() => setItemSelecionado('configuracoes')}
    >
        <div className={styles.iconeItemBarraLateral}>
        <Cog
            size={42} strokeWidth={2}
        />
        </div>

        <div className={styles.nomeItemBarraLateral}>
        <span>Configurações</span>
        </div>
    </div>


    <div className={`${styles.itemBarraLateral} ${styles.itemSair}`}>
        <div className={styles.iconeItemBarraLateral}>
        <LogOut
            size={42} strokeWidth={2}
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
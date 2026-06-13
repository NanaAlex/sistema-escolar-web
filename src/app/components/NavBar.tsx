'use client';

import {
    HiHome,
    HiBell,
    HiCog,
    HiLogout,
    HiDocumentText,
    HiViewList
} from 'react-icons/hi';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import '../styles/NavBar.css';

const BUTTON_SIZE = 70;
const INDICATOR_SIZE = 90;

const itensPrincipais = [
    HiBell,
    HiHome,
    HiDocumentText,
    HiViewList,
    HiDocumentText
];

const itensSecundarios = [
    HiCog,
    HiLogout
];

export default function NavBar() {
    const [activeItem, setActiveItem] = useState(1);
    const [indicatorTop, setIndicatorTop] = useState(0);

    const listaRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        function calcularPosicaoIndicator() {
            if (!listaRef.current) return;

            const alturaLista = listaRef.current.clientHeight;
            const quantidadeItens = itensPrincipais.length;

            const espaco = (alturaLista - quantidadeItens * BUTTON_SIZE) / (quantidadeItens + 1);

            const novaPosicao = espaco + activeItem * (BUTTON_SIZE + espaco) + (BUTTON_SIZE - INDICATOR_SIZE) / 2;

            setIndicatorTop(novaPosicao);
        }

        calcularPosicaoIndicator();

        const resizeObserver = new ResizeObserver(calcularPosicaoIndicator);

        if (listaRef.current) {
            resizeObserver.observe(listaRef.current);
        }

        window.addEventListener('resize', calcularPosicaoIndicator);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', calcularPosicaoIndicator);
        };
    }, [activeItem]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.container} className="barraPrincipal">
                <ul ref={listaRef}>
                    {itensPrincipais.map((Icone, index) => (
                        <li
                            key={index}
                            className={`list ${activeItem === index ? 'active' : ''}`}
                            onClick={() => setActiveItem(index)}
                        >
                            <a href="#" onClick={(e) => e.preventDefault()}>
                                <span className="icon">
                                    <Icone size={35} color="white" />
                                </span>
                            </a>
                        </li>
                    ))}

                    <div
                        className="indicator"
                        style={{ top: indicatorTop }}
                    />
                </ul>
            </div>

            <div style={styles.barraSecundaria} className="barraSecundaria">
                <ul>
                    {itensSecundarios.map((Icone, index) => (
                        <li key={index}>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                                <span className="icon">
                                    <Icone size={35} color="white" />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10vh',
        marginLeft: '1.5%',
        marginTop: '1%'
    },

    container: {
        width: 75,
        height: '50vh',
        minHeight: 420,
        backgroundColor: 'black',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible'
    },

    barraSecundaria: {
        width: 75,
        height: '18vh',
        minHeight: 160,
        backgroundColor: 'black',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column'
    }
};
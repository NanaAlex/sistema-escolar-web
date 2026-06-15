// components/Header.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Define o título com base na rota atual
  let titulo = "Bem-Vindo\n de Volta!";

  if (pathname === '/chamada' || pathname.startsWith('/chamada/')) {
    titulo = "Chamada";
  }
  // Você pode adicionar outras condições para futuras telas:
  // else if (pathname === '/atividades') titulo = "Atividades";

  return (
    <div style={styles.container}>
      <div style={styles.textoBoasVindas}>
        <h1 style={styles.titulo}>{titulo}</h1>
      </div>
      <div style={styles.textoData}>
        <p style={styles.data}>20 de Maio de 2026</p>
      </div>
    </div>
  );
}

const styles = {
  textoBoasVindas: {
    marginTop: '1.5%',
    marginLeft: '5%',
  },
  textoData: {
    marginTop: '1.5%',
    marginRight: '5%',
  },
  container: {
    flex: '0 0 18%',
    width: '100%',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    display: 'flex',
  },
  titulo: {
    fontSize: 'clamp(24px, 3.5vw, 52px)',
  },
  data: {
    fontSize: 'clamp(12px, 1.2vw, 18px)',
    fontWeight: 'lighter' as const,
  },
};
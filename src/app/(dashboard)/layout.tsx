// app/(dashboard)/layout.tsx
'use client';

import NavBar from '@/components/NavBar';
import Header from '@/components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={styles.telaCinza}>
      <div style={styles.telaBranca}>
        <NavBar />
        <div style={styles.conteudo}>
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  telaCinza: {
    backgroundColor: '#616467',
    width: '100%',
    height: '100vh',
    display: 'flex',
    paddingTop: '1.5%',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
  },
  telaBranca: {
    backgroundColor: 'white',
    width: '95%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    borderTopRightRadius: 'clamp(30px, 5vw, 80px)',
    overflow: 'hidden',
  },
  conteudo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    minHeight: 0,
  },
};
/*import TelaBranca from "../components/TelaBranca"


export default function telaInicial() {
  return (
    <main>
      <div style={styles.container}>
        <TelaBranca/>
      </div>
    </main>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column' as const,
  }
}; */

import AreaConteudo from '@/components/AreaConteudo';

export default function MenuPage() {
  return <AreaConteudo />;
}

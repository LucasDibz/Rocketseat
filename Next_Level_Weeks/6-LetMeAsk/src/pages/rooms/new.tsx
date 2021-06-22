import Link from 'next/link';
import Image from 'next/image';
import illustrationImg from '../../../public/images/illustration.svg';
import logoImg from '../../../public/images/logo.svg';

import { Button } from '../../components/Button';

import styles from '../../styles/Auth.module.scss';
import { useAuth } from '../../hooks/useAuth';

export default function NewRoom() {
  // const { user } = useAuth();

  return (
    <div className={styles.authContainer}>
      <aside>
        <Image src={illustrationImg} alt='illustration' />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <Image src={logoImg} alt='Letmeask' />
          <h2>Criar uma nova sala</h2>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link href='/'>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

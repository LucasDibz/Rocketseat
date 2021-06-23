import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '../../components/Button';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import illustrationImg from '../../../public/images/illustration.svg';
import logoImg from '../../../public/images/logo.svg';
import styles from '../../styles/Auth.module.scss';

export default function NewRoom() {
  const router = useRouter();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (!newRoom.trim()) return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    router.push(`/rooms/${firebaseRoom.key}`);
  }

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

          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
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

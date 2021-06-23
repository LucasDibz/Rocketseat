import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../../public/images/illustration.svg';
import googleIconImg from '../../public/images/google-icon.svg';
import logoImg from '../../public/images/logo.svg';
import styles from '../styles/Auth.module.scss';

export default function Home() {
  const router = useRouter();

  const [roomCode, setRoomCode] = useState('');

  const { user, signInWithGoogle } = useAuth();

  async function handleCreateNewRoom() {
    if (!user) await signInWithGoogle();

    router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (!roomCode.trim()) return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Sala não encontrada!');
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

  return (
    <div className={styles.authContainer}>
      <aside>
        <Image
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <Image src={logoImg} alt='Letmeask' />
          <button onClick={handleCreateNewRoom} className={styles.createRoom}>
            <Image src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

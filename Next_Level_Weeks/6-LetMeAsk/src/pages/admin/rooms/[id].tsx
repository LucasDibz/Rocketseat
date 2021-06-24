import { useRouter } from 'next/router';
import Image from 'next/image';

import { database } from '../../../services/firebase';
import { useRoom } from '../../../hooks/useRoom';

import { Button } from '../../../components/Button';
import { RoomCode } from '../../../components/RoomCode';
import { Question } from '../../../components/Question';

import logoImg from '../../../../public/images/logo.svg';
import styles from '../../../styles/Room.module.scss';

export default function Admin() {
  const router = useRouter();
  const { id } = router.query;

  const { title, questions } = useRoom(String(id));

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      closedAt: new Date(),
    });

    router.push('/');
  }

  return (
    <div className={styles.room}>
      <header>
        <div className={styles.content}>
          <Image src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={String(id)} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length}
              {questions.length === 1 ? ' pergunta' : ' perguntas'}
            </span>
          )}
        </div>

        <div className={styles.questionList}>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              roomId={String(id)}
              isAdmin
            />
          ))}
        </div>
      </main>
    </div>
  );
}

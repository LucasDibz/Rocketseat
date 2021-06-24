import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import logoImg from '../../../public/images/logo.svg';

import styles from '../../styles/Room.module.scss';

export default function Room() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const { title, questions } = useRoom(String(id));

  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (!newQuestion.trim()) return;

    if (!user) throw new Error('You must be logged in');

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${id}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div className={styles.room}>
      <header>
        <div className={styles.content}>
          <Image src={logoImg} alt='letmeask' />
          <RoomCode code={String(id)} />
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

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <Image
                  src={user.avatar}
                  alt='Avatar'
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className={styles.questionList}>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              roomId={String(id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

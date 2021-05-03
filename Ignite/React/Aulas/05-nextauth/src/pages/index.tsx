import { GetServerSideProps } from 'next';
import { FormEvent, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { email, password };

    await signIn(data);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        placeholder='Email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Entrar</button>
    </form>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});

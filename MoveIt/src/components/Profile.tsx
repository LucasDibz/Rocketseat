import { useContext } from 'react';

import { ChallengesContext } from '@contexts/ChallengesContext';

import styles from '@styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/lucasdibz.png' alt='Lucas Dibz' />
      <div>
        <strong>Lucas Dib</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
    </div>
  );
}

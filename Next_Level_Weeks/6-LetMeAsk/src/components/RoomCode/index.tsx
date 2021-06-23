import Image from 'next/image';

import copyImg from '../../../public/images/copy.svg';

import styles from './RoomCode.module.scss';

interface RoomCodeProps {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <Image
          src={copyImg}
          alt='Copiar código da sala'
          objectFit='scale-down'
        />
      </div>

      <span>Sala {code}</span>
    </button>
  );
}

import React from 'react';

import Logo from '../../assets/Logo.svg';

import { Button } from './styles';

export interface Props {
   selected?: boolean;
   isHome?: boolean;
   hasNotifications?: boolean;
   mentions?: number;
   serverImg?: number;
}

const ServerButton: React.FC<Props> = ({
   selected,
   isHome,
   hasNotifications,
   mentions,
   serverImg
}) => {
   return (
      <Button
         isHome={isHome}
         hasNotifications={hasNotifications}
         mentions={mentions}
         className={selected ? 'active' : ''
         }
      >
         {serverImg && <img src={`https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/50/50`} alt='Img' />}
         {isHome && <img src={Logo} alt='Rocketseat' />}
      </Button>
   );
}

export default ServerButton;
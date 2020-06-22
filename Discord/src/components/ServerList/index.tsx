import React from 'react';

import { Container, Separator } from './styles';
import ServerButton from '../ServerButton';

const ServerList: React.FC = () => {
   return (
      <Container>
         <ServerButton isHome />

         <Separator />

         <ServerButton serverImg={1} hasNotifications />
         <ServerButton serverImg={2} mentions={3} />
         <ServerButton serverImg={3} />
         <ServerButton serverImg={4} />
         <ServerButton serverImg={5} />
         <ServerButton serverImg={6} />
      </Container>
   );
}

export default ServerList;
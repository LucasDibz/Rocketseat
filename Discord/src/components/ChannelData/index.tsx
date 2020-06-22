import React, { useRef, useEffect } from 'react';

import ChannelMessage, { Mention } from '../ChannelMessage';

import { Container, Messages, InputWrapper, Input, InputIcon } from './styles';

const ChannelData: React.FC = () => {
   const messageRef = useRef() as React.MutableRefObject<HTMLDivElement>;

   useEffect(() => {
      const div = messageRef.current;

      if (div) {
         div.scrollTop = div.scrollHeight;
      }
   }, [messageRef]);

   return (
      <Container>
         <Messages ref={messageRef}>
            <ChannelMessage
               author='Lucas Dib'
               date='22/06/2020'
               content='Rocketseat voa!'
            />

            <ChannelMessage
               author='Rockeseat'
               date='22/06/2020'
               content={
                  <>
                     <Mention>
                        @Lucas Dib
                     </Mention>
                     Obrigado!
                  </>
               }
               hasMention
               isBot
            />

         </Messages>

         <InputWrapper>
            <Input type='text' placeholder='Conversar em #chat-livre' />
            <InputIcon />
         </InputWrapper>
      </Container>
   );
}

export default ChannelData;
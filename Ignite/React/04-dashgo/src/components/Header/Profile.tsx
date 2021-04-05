import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}
export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align='center'>
      {showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Lucas Dib</Text>
          <Text color='gray.300' fontSize='small'>
            lucas.f.dib@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size='md'
        name='Lucas Dib'
        src='https://github.com/lucasdibz.png'
      />
    </Flex>
  );
}

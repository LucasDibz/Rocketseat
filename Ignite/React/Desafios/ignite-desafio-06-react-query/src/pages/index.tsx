import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }) {
    const { data } = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return data;
  }
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    const fData = data?.pages.map(page => page.data).flat();
    return fData;
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={['0.5rem', 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage &&
          (isFetchingNextPage ? (
            <Button mt="1rem" role="button" w={['100%', 'auto']}>
              Carregando...
            </Button>
          ) : (
            <Button
              mt="1rem"
              onClick={() => fetchNextPage()}
              role="button"
              w={['100%', 'auto']}
            >
              Carregar mais
            </Button>
          ))}
      </Box>
    </>
  );
}

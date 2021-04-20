import { GetStaticProps } from 'next';

type Podcast = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
};

interface HomeProps {
  episodes: Podcast[];
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch('http://localhost:3333/episodes');
  const episodes: Podcast[] = await data.json();

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8, //8 hrs
  };
};

export default function Home({ episodes }: HomeProps) {
  return (
    <>
      <h1>index</h1>
      <p>{JSON.stringify(episodes)}</p>
    </>
  );
}

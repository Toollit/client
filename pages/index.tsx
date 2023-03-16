import type { NextPage, GetServerSideProps } from 'next';
import MainController from 'models/main/MainController';

interface Props {}

const Home: NextPage<Props> = () => {
  return <MainController />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;

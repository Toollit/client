import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { getProjectsFetcher, Project } from '@/apis/getProjectsFetcher';
import MainController from 'models/main/MainController';
import { getProjectsKey } from '@/apis/keys';
interface PageProps {
  fallback: {
    [key: string]: Project[];
  };
}

const Home: NextPage<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <MainController />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apiEndpoint = getProjectsKey(1, 'new');
  const projects = await getProjectsFetcher(apiEndpoint);

  const hasQueryData = Object.keys(query).length >= 1;

  if (hasQueryData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      fallback: {
        [apiEndpoint]: projects,
      },
    },
  };
};

export default Home;

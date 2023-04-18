import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import {
  GetProjectsAPIRes,
  getProjectsFetcher,
  getProjectsAPIKey,
  Project,
} from '@/apis/useGetProjects';
import MainController from 'models/main/MainController';
interface PageProps {
  fallback: {
    [getProjectsAPIKey: string]: Project[];
  };
}

const Home: NextPage<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <MainController />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projects = await getProjectsFetcher();

  return {
    props: {
      fallback: {
        [getProjectsAPIKey]: projects,
      },
    },
  };
};

export default Home;

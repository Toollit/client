import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import {
  GetProjectsAPIRes,
  getProjectsFetcher,
  getProjectsAPI,
} from '@/apis/useGetProjects';
import MainController from 'models/main/MainController';
interface PageProps {
  fallback: GetProjectsAPIRes;
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
        [getProjectsAPI]: projects,
      },
    },
  };
};

export default Home;

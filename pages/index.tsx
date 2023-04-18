import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { getProjectsFetcher, Project } from '@/apis/getProjectsFetcher';
import MainController from 'models/main/MainController';
import { GET_PROJECTS_API_ENDPOINT } from '@/apis/keys';
interface PageProps {
  fallback: {
    [GET_PROJECTS_API_ENDPOINT: string]: Project[];
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
  const projects = await getProjectsFetcher(GET_PROJECTS_API_ENDPOINT);

  return {
    props: {
      fallback: {
        [GET_PROJECTS_API_ENDPOINT]: projects,
      },
    },
  };
};

export default Home;

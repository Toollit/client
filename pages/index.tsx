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
  // If no queries exist. Basic request when entering the homepage
  if (Object.keys(query).length === 0) {
    const apiEndpoint = getProjectsKey(1, 'new');
    const projects = await getProjectsFetcher(apiEndpoint);

    return {
      props: {
        fallback: {
          [apiEndpoint]: projects,
        },
      },
    };
  }

  const hasMultipleQueries = Object.keys(query).length > 2;

  // Check 3 or more queries
  if (hasMultipleQueries) {
    return {
      notFound: true,
    };
  }

  const hasPageQuery = Object.keys(query).findIndex(
    (query) => query === 'page',
  );

  const hasOrderQuery = Object.keys(query).findIndex(
    (query) => query === 'order',
  );

  // Check presence or absence of the query required
  if (hasPageQuery === -1 || hasOrderQuery === -1) {
    return {
      notFound: true,
    };
  }

  const pageNumber = Number(query[Object.keys(query)[hasPageQuery]]);
  const orderValue = query[Object.keys(query)[hasOrderQuery]];

  const isPageValueNaN = isNaN(pageNumber);
  const isOrderValue = orderValue === 'new' || orderValue === 'popularity';

  // Check query value is normal
  if (isPageValueNaN || !isOrderValue) {
    return {
      notFound: true,
    };
  }

  const apiEndpoint = getProjectsKey(pageNumber, orderValue);
  const projects = await getProjectsFetcher(apiEndpoint);

  return {
    props: {
      fallback: {
        [apiEndpoint]: projects,
      },
    },
  };
};

export default Home;

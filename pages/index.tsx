import type { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';
import { projectsFetcher, Project } from '@/apis/projectsFetcher';
import MainController from 'models/main/MainController';
import { projectsKey } from '@/apis/keys';
interface PageProps {
  fallback: {
    [key: string]: Project[];
  };
  pageNumber: number;
  postOrder: 'new' | 'popularity';
}

const Home: NextPage<PageProps> = ({ fallback, pageNumber, postOrder }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <MainController pageNumber={pageNumber} postOrder={postOrder} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // If no queries exist. Basic request when entering the homepage
  if (Object.keys(query).length === 0) {
    const apiEndpoint = projectsKey(1, 'new');
    const key = JSON.stringify({
      url: apiEndpoint,
      args: { page: '/', tag: 'projects' },
    });
    const projects = await projectsFetcher({ url: apiEndpoint });

    return {
      props: {
        fallback: {
          [key]: projects,
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
  const postOrder = query[Object.keys(query)[hasOrderQuery]];

  const isPageValueNaN = isNaN(pageNumber);
  const isOrderValue = postOrder === 'new' || postOrder === 'popularity';

  // Check query value is normal
  if (isPageValueNaN || !isOrderValue) {
    return {
      notFound: true,
    };
  }

  const apiEndpoint = projectsKey(pageNumber, postOrder);
  const key = JSON.stringify({
    url: apiEndpoint,
    args: { page: '/', tag: 'projects' },
  });
  const projects = await projectsFetcher({ url: apiEndpoint });

  return {
    props: {
      fallback: {
        [key]: projects,
      },
      pageNumber,
      postOrder,
    },
  };
};

export default Home;

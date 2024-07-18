import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { projectOverviewsFetcher } from '@/apis/projectOverviewsFetcher';
import { projectOverviewsKey } from '@/apis/keys';
import { ProjectOverview } from '@/typings';
import MainController from 'models/main/MainController';
interface PageProps {
  fallback: {
    [key: string]: ProjectOverview[];
  };
  pageNumber: number;
  postOrder: 'new' | 'popularity';
}

const Home: NextPage<PageProps> = ({ fallback, pageNumber, postOrder }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>Toollit</title>
        <meta property='og:title' content='Toollit' key='title' />
        <meta
          property='og:description'
          content='IT 프로젝트 모집 커뮤니티 플랫폼. 당신이 부러워하는 유니콘 스타트업도 작은 모임에서 시작됐다.'
          key='description'
        />
        <meta
          property='og:image'
          content='https://toollit-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/Toollit.png'
          key='image'
        />
        <meta property='og:url' content='https://toollit.com' key='url' />
      </Head>
      <MainController pageNumber={pageNumber} postOrder={postOrder} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // If no queries exist. Basic request when entering the homepage
  if (Object.keys(query).length === 0) {
    const apiEndpoint = projectOverviewsKey(1, 'new');
    const key = JSON.stringify({
      url: apiEndpoint,
      args: { page: '/', tag: 'projectOverviews' },
    });
    const projects = await projectOverviewsFetcher({ url: apiEndpoint });

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

  const apiEndpoint = projectOverviewsKey(pageNumber, postOrder);
  const key = JSON.stringify({
    url: apiEndpoint,
    args: { page: '/', tag: 'projectOverviews' },
  });
  const projects = await projectOverviewsFetcher({ url: apiEndpoint });

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

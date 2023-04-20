import { NextPageContext } from 'next';
import ErrorNotice from './notice/error';

interface ErrorPageProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorPageProps) {
  if (typeof window !== 'undefined') {
    window.location.href = '/notice/error';
  }

  return <ErrorNotice statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  if (statusCode === 500) {
    res?.writeHead(302, { Location: '/notice/error' });
    res?.end();
  }

  return { statusCode };
};

export default Error;

import type { AppProps } from 'next/app';
import GlobalStyles from 'styles/GlobalStyles';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import EmotionTheme from 'styles/theme';
import { theme as MUITheme } from 'styles/muiTheme';
import { SWRDevTools } from 'swr-devtools';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import store from '@/store/index';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { message } = useAuth();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    //temporary password login user check
    if (message === 'needResetPassword') {
      // prevent infinite routing loop
      if (router.pathname !== '/resetPassword') {
        router.replace('/resetPassword');
      }
    }
  }, [router, message]);

  return (
    <>
      <Head>
        <title>Getit</title>
        <meta
          name='description'
          content='IT Project Recruitment Community Platform. The unicorn startup you envy also started at a small meeting.'
        />
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta name='theme-color' content='#4dd290' data-react-helmet='true' />
        <meta
          name='keywords'
          content='프로젝트, 모집, 모임, IT, 커뮤니티, 플랫폼, project'
        />
        <meta property='og:title' content='Getit' />
        <meta
          property='og:description'
          content='IT 프로젝트 모집 커뮤니티 플랫폼. 당신이 부러워하는 유니콘 스타트업도 작은 모임에서 시작됐다.' // TODO 지역에따라 한글 또는 영어로 나오게 수정하기
        />
        <meta property='og:image' content='/favicon.ico' />
        {/* TODO 작성하기 <meta property="og:url" content="your_page_url" />  */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MUIThemeProvider theme={MUITheme}>
        <EmotionThemeProvider theme={EmotionTheme}>
          <GlobalStyles />
          <Provider store={store}>
            <SWRDevTools>
              <Component {...pageProps} />
            </SWRDevTools>
          </Provider>
        </EmotionThemeProvider>
      </MUIThemeProvider>
    </>
  );
}

export default MyApp;

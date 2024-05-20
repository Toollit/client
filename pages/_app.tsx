import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SWRDevTools } from 'swr-devtools';
import { Provider } from 'react-redux';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import store from '@/store/index';
import { theme as MUITheme } from 'styles/muiTheme';
import GlobalStyles from 'styles/GlobalStyles';
import EmotionTheme from 'styles/theme';
import usePathHistory from '@/hooks/usePathHistory';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { data: userAuthInfo, nickname, isAuthenticated } = useAuth();
  usePathHistory({ saveAction: true });

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    // Check who logged in with a temporary password
    if (userAuthInfo?.needResetPassword === true) {
      // Prevent infinite routing loop
      if (router.pathname !== '/resetPassword') {
        router.replace('/resetPassword');
      }
    }
  }, [router, userAuthInfo]);

  useEffect(() => {
    // Check whether nickname is set or not
    if (isAuthenticated && nickname === null) {
      // Prevent infinite routing loop
      if (router.pathname !== '/signUp/settings/nickname') {
        router.replace('/signUp/settings/nickname');
      }
    }
  }, [router, nickname, isAuthenticated]);

  return (
    <>
      <Head>
        <title>Toollit</title>
        <meta name='viewport' content='viewport-fit=cover' />
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
        <meta property='og:title' content='Toollit' />
        <meta
          property='og:description'
          content='IT 프로젝트 모집 커뮤니티 플랫폼. 당신이 부러워하는 유니콘 스타트업도 작은 모임에서 시작됐다.'
        />
        <meta
          property='og:image'
          content='https://toollit-image-bucket.s3.ap-northeast-2.amazonaws.com/logo/Toollit.png'
        />
        <meta property='og:url' content='https://toollit.com' />
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

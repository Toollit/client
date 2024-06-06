import { useEffect } from 'react';
import type { AppProps } from 'next/app';
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
  useAuth();
  usePathHistory({ saveAction: true });

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

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

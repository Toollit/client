import type { AppProps } from 'next/app';
import GlobalStyles from 'styles/GlobalStyles';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { wrapper } from 'store/index';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import EmotionTheme from 'styles/theme';
import { theme as MuiTheme } from 'styles/muiTheme';
import useSWR from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';
import { useRouter } from 'next/router';
import { SWRDevTools } from 'swr-devtools';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  const { data } = useSWR(AUTH_USER, authFetcher);

  if (data?.message === 'needResetPassword') {
    // prevent infinite routing loop
    if (router.pathname !== '/resetPassword') {
      router.replace('/resetPassword');
    }
  }

  return (
    <>
      <Head>
        <title>Getit</title>
        <meta
          name='description'
          content='IT 프로젝트 모집 커뮤니티 플랫폼. 당신이 부러워하는 유니콘 스타트업도 작은 모임에서 시작됐다.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta charSet='UTF-8' />
        <meta name='theme-color' content='#4dd290' data-react-helmet='true' />
        <meta
          name='keywords'
          content='프로젝트, 모집, 모임, IT, 커뮤니티, 플랫폼, project'
        />

        <meta property='og:title' content='Getit' />
        <meta
          property='og:description'
          content='IT 프로젝트 모집 커뮤니티 플랫폼. 당신이 부러워하는 유니콘 스타트업도 작은 모임에서 시작됐다.'
        />
        <meta property='og:image' content='/favicon.ico' />
        {/*TODO 작성하기 <meta property='og:url' content='' /> */}

        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MuiThemeProvider theme={MuiTheme}>
        <EmotionThemeProvider theme={EmotionTheme}>
          <GlobalStyles />
          <Provider store={store}>
            <SWRDevTools>
              <Component {...props.pageProps} />
            </SWRDevTools>
          </Provider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;

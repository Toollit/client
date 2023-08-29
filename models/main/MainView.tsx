import React from 'react';
import Link from 'next/link';
import AppLayout from '@/components/appLayout';
import BannerPerson from '@/assets/images/BannerPerson';
import BannerBackground from '@/assets/images/BannerBackground';
import Bug from '@/assets/images/Bug';
import NetworkLottieJson from 'public/static/lotties/network.json';
import LottieAnimation from '@/components/commons/lottie';
import BlockPost, { CustomProject } from '@/components/commons/post/block';
import Grid from '@mui/material/Grid';
import Filter from '@/components/commons/filter';
import SwipeableCircularViews from '@/components/commons/swipeableView/swipeableCircularViews';
import Pagination from '@/components/commons/pagination';
import SearchDrawer from '@/components/commons/drawer/search';
import Block from '@/components/commons/block';
import { Button } from '@/components/commons/button';
import {
  Banner,
  FirstSlideText,
  BannerPersonImg,
  FirstSlideBackground,
  FirstSlideHeadline,
  FirstSlideSubhead,
  SecondSlideText,
  NetworkImg,
  ThirdSlideText,
  ThirdSlideNotice,
  BugImage,
  PostFilterWriteContainer,
  StyledLink,
} from './styles';

export interface MainViewProps {
  projects?: CustomProject[];
  createProject: () => void;
  pagination: {
    totalPage: number;
  };
  page: number;
  order: 'new' | 'popularity';
}

const MainView = ({
  projects,
  createProject,
  pagination,
  page,
  order,
}: MainViewProps) => {
  return (
    <AppLayout type='default'>
      <Block>
        <SwipeableCircularViews autoPlay={true} interval={4000}>
          <Banner order={'first'}>
            <FirstSlideText>
              <FirstSlideHeadline>
                IT 프로젝트 모집
                <br />
                커뮤니티 플랫폼
              </FirstSlideHeadline>
              <br />
              <FirstSlideSubhead>
                당신이 부러워하는 유니콘 스타트업도 <br />
                작은 모임에서 시작됐다.
              </FirstSlideSubhead>
            </FirstSlideText>

            <BannerPersonImg>
              <BannerPerson />
            </BannerPersonImg>

            <FirstSlideBackground>
              <BannerBackground />
            </FirstSlideBackground>
          </Banner>

          <Banner order={'second'}>
            <SecondSlideText>
              <div>전 세계에 있는 관심사가 비슷한 사람들과</div>
              <div>프로젝트를 진행해 보세요.</div>
            </SecondSlideText>
            <NetworkImg>
              <LottieAnimation lottieJson={NetworkLottieJson} />
            </NetworkImg>
          </Banner>

          <Banner order={'third'}>
            <ThirdSlideText>
              <ThirdSlideNotice>Notice</ThirdSlideNotice>
              <div>버그 리포트를 해주신 분 중</div>
              <div>
                추첨을 통해 스타벅스 아메리카노 기프티콘을 보내드립니다.
              </div>
            </ThirdSlideText>
            <BugImage>
              <Bug />
            </BugImage>
          </Banner>
        </SwipeableCircularViews>
      </Block>

      <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={1.5}>
        <PostFilterWriteContainer>
          <Filter />
          <Button
            type='submit'
            text='프로젝트 생성'
            width={13}
            onClick={createProject}
          />
        </PostFilterWriteContainer>
      </Block>

      <Block paddingLeft={1.5} paddingRight={1.5} paddingTop={1.5}>
        <Grid container spacing={1}>
          {projects?.map((project, index) => {
            return (
              <Grid
                key={`/${project.id}-${index}`}
                item
                xsMobile={6}
                mobile={6}
                tablet={4}
                laptop={4}
              >
                <Link href={`/project/${project.id}`} passHref>
                  <StyledLink>
                    <BlockPost content={project} />
                  </StyledLink>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Block>

      <Block paddingTop={4} paddingBottom={8}>
        <Pagination buttons={5} totalPage={pagination.totalPage} />
      </Block>

      <Block>
        <SearchDrawer />
      </Block>
    </AppLayout>
  );
};

export default MainView;

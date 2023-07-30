import React from 'react';
import Link from 'next/link';
import AppLayout from '@/components/appLayout';
import BannerPerson from '@/assets/images/BannerPerson';
import BannerBackground from '@/assets/images/BannerBackground';
import Bug from '@/assets/images/Bug';
import NetworkLottieJson from 'public/static/lotties/network.json';
import LottieAnimation from '@/components/commons/lottie';
import BlockPost from '@/components/commons/post/block';
import Grid from '@mui/material/Grid';
import Filter from '@/components/commons/filter';
import { Project } from '@/apis/getProjectsFetcher';
import SwipeableCircularViews from '@/components/commons/swipeableView/swipeableCircularViews';
import Pagination from '@/components/commons/pagination';
import {
  Container,
  BannerContainer,
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
  PostWriteFilterContainer,
  PostFilterContainer,
  PostWriteButton,
  PostContainer,
  StyledLink,
} from './styles';

export interface MainViewProps {
  projects: Project[] | undefined;
  createProject: () => void;
}

const MainView = ({ projects, createProject }: MainViewProps) => {
  return (
    <AppLayout nav={true}>
      <Container>
        <SwipeableCircularViews autoPlay={true} interval={4000}>
          <BannerContainer order={'first'}>
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
          </BannerContainer>

          <BannerContainer order={'second'}>
            <SecondSlideText>
              <div>전 세계에 있는 관심사가 비슷한 사람들과</div>
              <div>프로젝트를 진행해 보세요.</div>
            </SecondSlideText>
            <NetworkImg>
              <LottieAnimation lottieJson={NetworkLottieJson} />
            </NetworkImg>
          </BannerContainer>

          <BannerContainer order={'third'}>
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
          </BannerContainer>
        </SwipeableCircularViews>

        <PostWriteFilterContainer>
          <PostFilterContainer>
            <Filter />
          </PostFilterContainer>
          <PostWriteButton onClick={createProject}>
            프로젝트 생성
          </PostWriteButton>
        </PostWriteFilterContainer>

        <PostContainer>
          <Grid container spacing={1}>
            {projects?.map((project) => {
              return (
                <Grid
                  key={`/${project.id}`}
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
          <Pagination count={5} />
        </PostContainer>
      </Container>
    </AppLayout>
  );
};

export default MainView;

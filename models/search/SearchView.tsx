import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/title';
import BlockPost, { BlockProject } from '@/components/post/block';
import Grid from '@mui/material/Grid';
import Skeleton from '@/components/skeleton';
import {
  ContentContainer,
  Header,
  SkeletonContainer,
  ProjectDetailLink,
  SubTitle,
} from './styles';

export interface ViewProps {
  searchText?: string;
  data?: BlockProject[];
}

const SearchView: FC<ViewProps> = ({ searchText, data }) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='검색 결과' />
          <SubTitle>
            {`"${searchText}"`}에대한 검색 결과입니다. <br />
          </SubTitle>
        </Header>

        <ContentContainer>
          {data ? (
            <Grid container spacing={1}>
              {data?.map((project) => {
                return (
                  <Grid
                    key={project.id}
                    item
                    xsMobile={6}
                    mobile={6}
                    tablet={4}
                    laptop={4}
                  >
                    <ProjectDetailLink href={`/project/${project.id}`}>
                      <BlockPost content={project} />
                    </ProjectDetailLink>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <SkeletonContainer>
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
              <Skeleton
                height={30}
                width={30}
                left={1}
                right={1}
                top={1}
                bottom={1}
              />
            </SkeletonContainer>
          )}
        </ContentContainer>
      </InnerContainer>
    </AppLayout>
  );
};

export default SearchView;

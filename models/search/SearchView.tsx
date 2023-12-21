import React from 'react';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/commons/title';
import BlockPost, { BlockProject } from '@/components/commons/post/block';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Skeleton from '@/components/commons/skeleton';
import {
  ContentContainer,
  Header,
  SkeletonContainer,
  StyledLink,
  SubTitle,
} from './styles';

export interface SearchViewProps {
  searchText?: string;
  data?: BlockProject[];
}

const SearchView = ({ searchText, data }: SearchViewProps) => {
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
                    <Link href={`/project/${project.id}`} passHref>
                      <StyledLink>
                        <BlockPost content={project} />
                      </StyledLink>
                    </Link>
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

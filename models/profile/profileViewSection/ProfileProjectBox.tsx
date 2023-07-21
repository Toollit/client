import React from 'react';
import { Project } from '@/apis/profileInfoFetcher';
import Hashtag from '@/components/commons/hashtag';
import { PersonIcon, ViewIcon } from '@/assets/icons';
import Link from 'next/link';
import {
  BoxContainer,
  BoxTitle,
  ContentBlock,
  BoxContent,
  HashtagContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  ProjectTitle,
  Views,
  MemberCount,
  ViewText,
  MemberCountText,
  LoadMore,
  LoadMoreContainer,
  StyledLink,
} from './ProfileProjectBox.styles';

interface ProfileProjectViewProps {
  data?: Project[] | null;
}

const ProfileProjectBox = ({ data }: ProfileProjectViewProps) => {
  return (
    <BoxContainer>
      <BoxTitle>참여 프로젝트</BoxTitle>
      <BoxContent>
        {data &&
          data?.map((v, i) => {
            return (
              <Link key={`${v.id}-${i}`} href={`/project/${v.id}/`} passHref>
                <StyledLink>
                  <ContentBlock key={`${v.title}-${i}`}>
                    <ColumnLeftContainer>
                      <RecruitmentTypeContainer>
                        {v.memberTypes.map((type, index) => {
                          return (
                            <RecruitmentType key={type + index} type={type}>
                              {type === 'pm'
                                ? type.toUpperCase()
                                : type.charAt(0).toUpperCase() + type.slice(1)}
                            </RecruitmentType>
                          );
                        })}
                      </RecruitmentTypeContainer>

                      <ProjectTitle>{v.title}</ProjectTitle>

                      <HashtagContainer>
                        {v.hashtags.map((hashtag) => {
                          return (
                            <Hashtag key={`${hashtag}`} tagName={hashtag} />
                          );
                        })}
                      </HashtagContainer>
                    </ColumnLeftContainer>

                    <ColumnRightContainer>
                      <MemberCount>
                        <PersonIcon width={20} height={20} />
                        <MemberCountText>{`${v.memberNumber} / ${v.recruitNumber}`}</MemberCountText>
                      </MemberCount>
                      <Views>
                        <ViewIcon width={20} height={20} />
                        <ViewText>{v.views}</ViewText>
                      </Views>
                    </ColumnRightContainer>
                  </ContentBlock>
                </StyledLink>
              </Link>
            );
          })}
        <LoadMoreContainer>
          <LoadMore>더보기</LoadMore>
        </LoadMoreContainer>
      </BoxContent>
    </BoxContainer>
  );
};

export default ProfileProjectBox;

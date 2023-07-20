import React from 'react';
import { Project } from '@/apis/profileInfoFetcher';
import Hashtag from '@/components/commons/hashtag';
import { PersonIcon, ViewIcon } from '@/assets/icons';
import Link from 'next/link';
import {
  ContentContainer,
  CategoryTitle,
  CategoryContent,
  TextContainer,
  SubTitle,
  Content,
  IconTextContainer,
  CategoryContentContainer,
  IntroduceContentContainer,
  IntroduceContent,
  ProgramOrSkillContainer,
  HashtagContainer,
  ProjectLeftContainer,
  ProjectRightContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  Views,
  MemberCount,
  ViewText,
  MemberCountText,
  LoadMore,
  LoadMoreContainer,
  StyledLink,
} from './styles';

interface ProfileProjectViewProps {
  data?: Project[] | null;
}

const ProfileProjectBox = ({ data }: ProfileProjectViewProps) => {
  return (
    <ContentContainer>
      <CategoryTitle>참여 프로젝트</CategoryTitle>

      <CategoryContentContainer>
        {data &&
          data?.map((v, i) => {
            return (
              <Link key={`${v.id}-${i}`} href={`/project/${v.id}/`} passHref>
                <StyledLink>
                  <CategoryContent key={`${v.title}-${i}`}>
                    <ProjectLeftContainer>
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

                      <Title>{v.title}</Title>

                      <HashtagContainer>
                        {v.hashtags.map((hashtag) => {
                          return (
                            <Hashtag key={`${hashtag}`} tagName={hashtag} />
                          );
                        })}
                      </HashtagContainer>
                    </ProjectLeftContainer>

                    <ProjectRightContainer>
                      <MemberCount>
                        <PersonIcon width={20} height={20} />
                        <MemberCountText>{`${v.memberNumber} / ${v.recruitNumber}`}</MemberCountText>
                      </MemberCount>
                      <Views>
                        <ViewIcon width={20} height={20} />
                        <ViewText>{v.views}</ViewText>
                      </Views>
                    </ProjectRightContainer>
                  </CategoryContent>
                </StyledLink>
              </Link>
            );
          })}
        <LoadMoreContainer>
          <LoadMore>더보기</LoadMore>
        </LoadMoreContainer>
      </CategoryContentContainer>
    </ContentContainer>
  );
};

export default ProfileProjectBox;

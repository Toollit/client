import React from 'react';
import { PersonIcon, MailIcon } from '@/assets/icons';
import Hashtag from '@/components/commons/hashtag';
import { EditButton } from '@/components/commons/button';
import { MyProfile, UserProfile } from '@/apis/profileInfoFetcher';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import Skeleton from '@/components/commons/skeleton';
import {
  BoxContent,
  ContentContainer,
  Content,
  InfoCategory,
  Info,
  IntroduceContentContainer,
  ProgramSkillContainer,
  HashtagContainer,
} from './styles';

interface CustomMyProfile extends Omit<MyProfile, 'skills'> {
  skills: string[];
}

interface CustomUserProfile extends Omit<UserProfile, 'skills'> {
  skills: string[];
}

export type ProfileInfoData = CustomMyProfile | CustomUserProfile;

export interface ProfileInfoViewProps {
  me: boolean;
  data?: ProfileInfoData | null;
  editBtnHandler: (category: string) => void;
}

const ProfileInfoView = ({
  me,
  data,
  editBtnHandler,
}: ProfileInfoViewProps) => {
  return (
    <>
      {data && (
        <>
          {/* Profile info box */}
          <BoxContainer>
            <BoxTitle>내 프로필</BoxTitle>
            <BoxContent>
              <ContentContainer>
                <Content>
                  <PersonIcon />
                  <Info>{data?.nickname}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'닉네임수정'}
                    category={'nickname'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>

              {me && (
                <ContentContainer>
                  <Content>
                    <MailIcon />
                    <Info>{data && 'email' in data && data?.email}</Info>
                  </Content>
                </ContentContainer>
              )}

              {me && (
                <ContentContainer>
                  <Content>
                    <InfoCategory>가입방법:</InfoCategory>
                    <Info>
                      {data && 'signUpType' in data && data?.signUpType}
                    </Info>
                  </Content>
                </ContentContainer>
              )}

              <ContentContainer>
                <Content>
                  <InfoCategory>가입일:</InfoCategory>
                  <Info>{data?.createdAt}</Info>
                </Content>
              </ContentContainer>

              <ContentContainer>
                <Content>
                  <InfoCategory>최종접속일:</InfoCategory>
                  <Info>{data?.lastLoginAt}</Info>
                </Content>
              </ContentContainer>
            </BoxContent>
          </BoxContainer>

          {/* Introduce box */}
          <BoxContainer>
            <BoxTitle>자기소개</BoxTitle>
            <IntroduceContentContainer>
              <Info>{data?.introduce ?? '작성된 내용이 없습니다.'}</Info>

              {me && (
                <EditButton
                  text={'수정'}
                  category={'introduce'}
                  onClick={editBtnHandler}
                />
              )}
            </IntroduceContentContainer>
          </BoxContainer>

          {/* Additional info box */}
          <BoxContainer>
            <BoxTitle>추가 정보</BoxTitle>
            <BoxContent>
              <ContentContainer>
                <Content>
                  <InfoCategory>온/오프라인:</InfoCategory>
                  <Info>{data?.onOffline ?? '작성된 내용이 없습니다.'}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'수정'}
                    category={'onOffline'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>

              <ContentContainer>
                <Content>
                  <InfoCategory>모임장소:</InfoCategory>
                  <Info>{data?.place ?? '작성된 내용이 없습니다.'}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'수정'}
                    category={'place'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>
              <ContentContainer>
                <Content>
                  <InfoCategory>모임시간:</InfoCategory>
                  <Info>{data?.contactTime ?? '작성된 내용이 없습니다.'}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'수정'}
                    category={'contactTime'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>
              <ContentContainer>
                <Content>
                  <InfoCategory>관심분야:</InfoCategory>
                  <Info>{data?.interests ?? '작성된 내용이 없습니다.'}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'수정'}
                    category={'interests'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>
              <ContentContainer>
                <Content>
                  <InfoCategory>직무/경력:</InfoCategory>
                  <Info>{data?.career ?? '작성된 내용이 없습니다.'}</Info>
                </Content>

                {me && (
                  <EditButton
                    text={'수정'}
                    category={'career'}
                    onClick={editBtnHandler}
                  />
                )}
              </ContentContainer>
            </BoxContent>
          </BoxContainer>

          {/* Usage program or skills */}
          <BoxContainer>
            <BoxTitle>사용 프로그램 또는 기술</BoxTitle>
            <ProgramSkillContainer>
              <HashtagContainer>
                {data?.skills === null || data?.skills.length === 0
                  ? '작성된 내용이 없습니다.'
                  : data?.skills.map((hashtag, index) => {
                      return (
                        <Hashtag
                          tagName={hashtag}
                          key={`${hashtag}-${index}`}
                        />
                      );
                    })}
              </HashtagContainer>

              {me && (
                <EditButton
                  text={'수정'}
                  category={'skills'}
                  onClick={editBtnHandler}
                />
              )}
            </ProgramSkillContainer>
          </BoxContainer>
        </>
      )}

      {!data && (
        <>
          <Skeleton height={25} top={3} />
          <Skeleton height={15} top={3} />
          <Skeleton height={25} top={3} />
          <Skeleton height={15} top={3} />
        </>
      )}
    </>
  );
};

export default ProfileInfoView;

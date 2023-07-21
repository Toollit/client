import React from 'react';
import { PersonIcon, MailIcon } from '@/assets/icons';
import Hashtag from '@/components/commons/hashtag';
import EditBtn from '@/components/commons/button/edit';
import { CustomMyProfile, CustomUserProfile } from '../ProfileView';
import {
  BoxContainer,
  BoxTitle,
  BoxContent,
  ContentBlock,
  ContentContainer,
  SubTitle,
  Content,
  IntroduceContentContainer,
  IntroduceContent,
  ProgramOrSkillContainer,
  HashtagContainer,
} from './ProfileInfoBox.styles';

interface ProfileInfoViewProps {
  me: boolean;
  data?: CustomMyProfile | CustomUserProfile | null;
  editBtnHandler: (category: string) => void;
}

const ProfileInfoBox = ({ me, data, editBtnHandler }: ProfileInfoViewProps) => {
  return (
    <>
      {/* basic info box */}
      <BoxContainer>
        <BoxTitle>내 프로필</BoxTitle>
        <BoxContent>
          {me ? (
            <>
              <ContentBlock>
                <ContentContainer>
                  <PersonIcon />
                  <Content>{data?.nickname}</Content>
                </ContentContainer>
                <EditBtn
                  text={'닉네임수정'}
                  category={'nickname'}
                  onClick={editBtnHandler}
                />
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <MailIcon />
                  <Content>{data && 'email' in data && data?.email}</Content>
                </ContentContainer>
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <SubTitle>가입방법:</SubTitle>
                  <Content>
                    {data && 'signUpType' in data && data?.signUpType}
                  </Content>
                </ContentContainer>
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <SubTitle>가입일:</SubTitle>
                  <Content>{data?.createdAt}</Content>
                </ContentContainer>
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <SubTitle>최종접속일:</SubTitle>
                  <Content>{data?.lastLoginAt}</Content>
                </ContentContainer>
              </ContentBlock>
            </>
          ) : (
            <>
              <ContentBlock>
                <ContentContainer>
                  <PersonIcon />
                  <Content>{data?.nickname}</Content>
                </ContentContainer>
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <SubTitle>가입일:</SubTitle>
                  <Content>{data?.createdAt}</Content>
                </ContentContainer>
              </ContentBlock>

              <ContentBlock>
                <ContentContainer>
                  <SubTitle>최종접속일:</SubTitle>
                  <Content>{data?.lastLoginAt}</Content>
                </ContentContainer>
              </ContentBlock>
            </>
          )}
        </BoxContent>
      </BoxContainer>

      {/* introduce box */}
      <BoxContainer>
        <BoxTitle>자기소개</BoxTitle>
        <IntroduceContentContainer>
          <IntroduceContent>
            {data?.introduce ?? '작성된 내용이 없습니다.'}
          </IntroduceContent>
          {me && (
            <EditBtn
              text={'수정'}
              category={'introduce'}
              onClick={editBtnHandler}
            />
          )}
        </IntroduceContentContainer>
      </BoxContainer>

      {/* additional info box */}
      <BoxContainer>
        <BoxTitle>추가 정보</BoxTitle>
        <BoxContent>
          <ContentBlock>
            <ContentContainer>
              <SubTitle>온/오프라인:</SubTitle>
              <Content>{data?.onOffline ?? '작성된 내용이 없습니다.'}</Content>
            </ContentContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'onOffline'}
                onClick={editBtnHandler}
              />
            )}
          </ContentBlock>
          <ContentBlock>
            <ContentContainer>
              <SubTitle>모임장소:</SubTitle>
              <Content>{data?.place ?? '작성된 내용이 없습니다.'}</Content>
            </ContentContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'place'}
                onClick={editBtnHandler}
              />
            )}
          </ContentBlock>
          <ContentBlock>
            <ContentContainer>
              <SubTitle>모임시간:</SubTitle>
              <Content>
                {data?.contactTime ?? '작성된 내용이 없습니다.'}
              </Content>
            </ContentContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'contactTime'}
                onClick={editBtnHandler}
              />
            )}
          </ContentBlock>
          <ContentBlock>
            <ContentContainer>
              <SubTitle>관심분야:</SubTitle>
              <Content>{data?.interests ?? '작성된 내용이 없습니다.'}</Content>
            </ContentContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'interests'}
                onClick={editBtnHandler}
              />
            )}
          </ContentBlock>
          <ContentBlock>
            <ContentContainer>
              <SubTitle>직무/경력:</SubTitle>
              <Content>{data?.career ?? '작성된 내용이 없습니다.'}</Content>
            </ContentContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'career'}
                onClick={editBtnHandler}
              />
            )}
          </ContentBlock>
        </BoxContent>
      </BoxContainer>

      {/* usage program and skills */}
      <BoxContainer>
        <BoxTitle>사용 프로그램 또는 기술</BoxTitle>

        <ProgramOrSkillContainer>
          <HashtagContainer>
            {data?.skills === null || data?.skills.length === 0
              ? '작성된 내용이 없습니다.'
              : data?.skills.map((hashtag, index) => {
                  return (
                    <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />
                  );
                })}
          </HashtagContainer>
          {me && (
            <EditBtn
              text={'수정'}
              category={'skills'}
              onClick={editBtnHandler}
            />
          )}
        </ProgramOrSkillContainer>
      </BoxContainer>
    </>
  );
};

export default ProfileInfoBox;

import React from 'react';
import { PersonIcon, MailIcon } from '@/assets/icons';
import Hashtag from '@/components/commons/hashtag';
import EditBtn from '@/components/commons/button/edit';
import { CustomMyProfile, CustomUserProfile } from './ProfileView';
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
} from './styles';

interface ProfileInfoViewProps {
  me: boolean;
  data?: CustomMyProfile | CustomUserProfile | null;
  editBtnHandler: (category: string) => void;
}

const ProfileInfoBox = ({ me, data, editBtnHandler }: ProfileInfoViewProps) => {
  return (
    <>
      {/* basic info box */}
      <ContentContainer>
        <CategoryTitle>내 프로필</CategoryTitle>
        <CategoryContentContainer>
          <CategoryContent>
            <IconTextContainer>
              <div>
                <PersonIcon />
              </div>
              <Content>{data?.nickname}</Content>
            </IconTextContainer>
            {me && (
              <EditBtn
                text={'닉네임수정'}
                category={'nickname'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>

          {me && (
            <CategoryContent>
              <IconTextContainer>
                <div>
                  <MailIcon />
                </div>
                <Content>{data && 'email' in data && data?.email}</Content>
              </IconTextContainer>
            </CategoryContent>
          )}

          {me && (
            <CategoryContent>
              <IconTextContainer>
                <SubTitle>가입방법:</SubTitle>
                <Content>
                  {data && 'signUpType' in data && data?.signUpType}
                </Content>
              </IconTextContainer>
            </CategoryContent>
          )}

          <CategoryContent>
            <IconTextContainer>
              <SubTitle>가입일:</SubTitle>
              <Content>{data?.createdAt}</Content>
            </IconTextContainer>
          </CategoryContent>

          <CategoryContent>
            <IconTextContainer>
              <SubTitle>최종접속일:</SubTitle>
              <Content>{data?.lastLoginAt}</Content>
            </IconTextContainer>
          </CategoryContent>
        </CategoryContentContainer>
      </ContentContainer>

      {/* introduce box */}
      <ContentContainer>
        <CategoryTitle>자기소개</CategoryTitle>
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
      </ContentContainer>

      {/* additional info box */}
      <ContentContainer>
        <CategoryTitle>추가 정보</CategoryTitle>
        <CategoryContentContainer>
          <CategoryContent>
            <TextContainer>
              <SubTitle>온/오프라인:</SubTitle>
              <Content>{data?.onOffline ?? '작성된 내용이 없습니다.'}</Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'onOffline'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>모임장소:</SubTitle>
              <Content>{data?.place ?? '작성된 내용이 없습니다.'}</Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'place'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>모임시간:</SubTitle>
              <Content>
                {data?.contactTime ?? '작성된 내용이 없습니다.'}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'contactTime'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>관심분야:</SubTitle>
              <Content>{data?.interests ?? '작성된 내용이 없습니다.'}</Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'interests'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>직무/경력:</SubTitle>
              <Content>{data?.career ?? '작성된 내용이 없습니다.'}</Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                category={'career'}
                onClick={editBtnHandler}
              />
            )}
          </CategoryContent>
        </CategoryContentContainer>
      </ContentContainer>

      {/* usage program and skills */}
      <ContentContainer>
        <CategoryTitle>사용 프로그램 또는 기술</CategoryTitle>

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
      </ContentContainer>
    </>
  );
};

export default ProfileInfoBox;

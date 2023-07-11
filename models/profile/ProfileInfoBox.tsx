import React from 'react';
import { User } from '@/apis/profileFetcher';
import { PersonIcon, MailIcon } from '@/assets/icons';
import { changeDateFormat } from '@/utils/changeDateFormat';
import Hashtag from '@/components/commons/hashtag';
import EditBtn from '@/components/commons/button/edit';
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
  data: User;
}

const ProfileInfoBox = ({ me, data }: ProfileInfoViewProps) => {
  return (
    <>
      {/* basic info box */}
      {me ? (
        <ContentContainer>
          <CategoryTitle>내 프로필</CategoryTitle>
          <CategoryContentContainer>
            <CategoryContent>
              <IconTextContainer>
                <div>
                  <PersonIcon />
                </div>
                <Content>{data.nickname}</Content>
              </IconTextContainer>
              {me && (
                <EditBtn
                  text={'닉네임수정'}
                  page={'profile'}
                  category={'nickname'}
                  type={'standard'}
                  title={'닉네임'}
                  value={data.nickname}
                  maxLength={20}
                />
              )}
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <div>
                  <MailIcon />
                </div>
                <Content>{data.email}</Content>
              </IconTextContainer>
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <SubTitle>가입방법:</SubTitle>
                <Content>{data.signUpType}</Content>
              </IconTextContainer>
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <SubTitle>가입일:</SubTitle>
                <Content>
                  {changeDateFormat({
                    date: data.createdAt,
                    format: 'YYMMDD_hhmmss',
                  })}
                </Content>
              </IconTextContainer>
            </CategoryContent>
          </CategoryContentContainer>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <CategoryTitle>내 프로필</CategoryTitle>
          <CategoryContentContainer>
            <CategoryContent>
              <IconTextContainer>
                <PersonIcon />
                <Content>{data.nickname}</Content>
              </IconTextContainer>
            </CategoryContent>
            <CategoryContent>
              <IconTextContainer>
                <SubTitle>가입일:</SubTitle>
                <Content>
                  {changeDateFormat({
                    date: data.createdAt,
                    format: 'YYMMDD',
                  })}
                </Content>
              </IconTextContainer>
            </CategoryContent>
            <CategoryContent>
              <IconTextContainer>
                <SubTitle>최종 접속일:</SubTitle>
                <Content>
                  {changeDateFormat({
                    date: data.lastLoginAt,
                    format: 'YYMMDD_hhmmss',
                  })}
                </Content>
              </IconTextContainer>
            </CategoryContent>
          </CategoryContentContainer>
        </ContentContainer>
      )}

      {/* introduce box */}
      <ContentContainer>
        <CategoryTitle>자기소개</CategoryTitle>
        <IntroduceContentContainer>
          <IntroduceContent>
            {data.introduce === null || data.introduce.length === 0
              ? '현재 작성된 자기소개가 없습니다.'
              : data.introduce}
          </IntroduceContent>
          {me && (
            <EditBtn
              text={'수정'}
              page={'profile'}
              category={'introduce'}
              type={'multiline'}
              title={'자기소개'}
              value={data.introduce ?? ''}
              maxLength={1000}
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
              <Content>
                {data.onOffline === null || data.onOffline.length === 0
                  ? '미입력'
                  : data.onOffline}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'onOffline'}
                type={'select'}
                title={'온/오프라인'}
                value={data.onOffline ?? ''}
                selectList={[
                  '온라인 가능',
                  '오프라인 가능',
                  '온,오프라인 모두 가능',
                ]}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>모임장소:</SubTitle>
              <Content>
                {data.place === null || data.place.length === 0
                  ? '미입력'
                  : data.place}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'place'}
                type={'standard'}
                title={'모임 장소'}
                value={data.place ?? ''}
                placeholder='ex) 서울특별시 종로구, 상관없음'
                maxLength={30}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>모임시간:</SubTitle>
              <Content>
                {data.contactTime === null || data.contactTime.length === 0
                  ? '미입력'
                  : data.contactTime}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'contactTime'}
                type={'standard'}
                title={'모임시간'}
                value={data.contactTime ?? ''}
                placeholder={'ex) 평일 9시~18시, 화요일 20시 이후'}
                maxLength={30}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>관심분야:</SubTitle>
              <Content>
                {data.interests === null || data.interests.length === 0
                  ? '미입력'
                  : data.interests}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'interests'}
                type={'multiSelect'}
                title={'관심분야 (다중선택가능)'}
                value={data.interests ?? ''}
                selectList={[
                  '인공지능',
                  '가상현실(VR)',
                  '증강현실(AR)',
                  'O2O',
                  '공유서비스',
                  '데이팅서비스',
                  '여행',
                  '소셜네트워크',
                  '뷰티/패션',
                  '이커머스',
                  '엔터테인먼트',
                  '게임',
                  '헬스/스포츠',
                  '뉴스/정보',
                  '유틸',
                  '금융',
                  '부동산/인테리어',
                  '종교',
                  '교육',
                  '의료/병원',
                  '모빌리티',
                  '육아/출산',
                  '사물인터넷',
                  '블록체인',
                ]}
                maxLength={20}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <TextContainer>
              <SubTitle>직무/경력:</SubTitle>
              <Content>
                {data.career === null || data.career.length === 0
                  ? '미입력'
                  : data.career}
              </Content>
            </TextContainer>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'career'}
                type={'standard'}
                title={'경력사항'}
                value={data.career ?? ''}
                placeholder={'ex) 3년차 개발자, 1년차 디자이너, 학생'}
                maxLength={30}
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
            {data.skills === null || data.skills.length === 0
              ? '현재 작성된 내용이 없습니다.'
              : [...data.skills.split(',')].map((hashtag, index) => {
                  return (
                    <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />
                  );
                })}
          </HashtagContainer>
          {me && (
            <EditBtn
              text={'수정'}
              page={'profile'}
              category={'skills'}
              type={'hashtag'}
              title={'사용 프로그램 또는 기술'}
              value={data.skills ?? ''}
            />
          )}
        </ProgramOrSkillContainer>
      </ContentContainer>
    </>
  );
};

export default ProfileInfoBox;

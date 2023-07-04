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
  Text,
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
      {/* first block */}
      {me ? (
        <ContentContainer>
          <CategoryTitle>내 프로필</CategoryTitle>
          <CategoryContentContainer>
            <CategoryContent>
              <IconTextContainer>
                <PersonIcon />
                <Text padding>{data.nickname}</Text>
              </IconTextContainer>
              <EditBtn
                text={'닉네임수정'}
                page={'profile'}
                category={'nickname'}
                type={'standard'}
                title={'닉네임'}
                value={data.nickname}
                maxLength={20}
              />
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <MailIcon />
                <Text padding>{data.email}</Text>
              </IconTextContainer>
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <Text>가입방법:</Text>
                <Text padding>{data.signUpType}</Text>
              </IconTextContainer>
            </CategoryContent>

            <CategoryContent>
              <IconTextContainer>
                <Text>가입일:</Text>
                <Text padding>
                  {changeDateFormat({
                    date: data.createdAt,
                    format: 'YYMMDD_hhmmss',
                  })}
                </Text>
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
                <Text padding>{data.nickname}</Text>
              </IconTextContainer>
            </CategoryContent>
            <CategoryContent>
              <IconTextContainer>
                <Text>가입일:</Text>
                <Text padding>
                  {changeDateFormat({
                    date: data.createdAt,
                    format: 'YYMMDD',
                  })}
                </Text>
              </IconTextContainer>
            </CategoryContent>
            <CategoryContent>
              <IconTextContainer>
                <Text>최종 접속일:</Text>
                <Text padding>
                  {changeDateFormat({
                    date: data.lastLoginAt,
                    format: 'YYMMDD_hhmmss',
                  })}
                </Text>
              </IconTextContainer>
            </CategoryContent>
          </CategoryContentContainer>
        </ContentContainer>
      )}

      {/* second block */}
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

      {/* third block */}
      <ContentContainer>
        <CategoryTitle>추가 정보</CategoryTitle>
        <CategoryContentContainer>
          <CategoryContent>
            <div>
              <Text>온/오프라인:</Text>
              <Text padding>
                {data.onOffline === null || data.onOffline.length === 0
                  ? '미입력'
                  : data.onOffline}
              </Text>
            </div>
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
            <div>
              <Text>모임장소:</Text>
              <Text padding>
                {data.place === null || data.place.length === 0
                  ? '미입력'
                  : data.place}
              </Text>
            </div>
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
            <div>
              <Text>모임시간:</Text>
              <Text padding>
                {data.contactTime === null || data.contactTime.length === 0
                  ? '미입력'
                  : data.contactTime}
              </Text>
            </div>
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
            <div>
              <Text>관심분야:</Text>
              <Text padding>
                {data.interests === null || data.interests.length === 0
                  ? '미입력'
                  : data.interests}
              </Text>
            </div>
            {me && (
              <EditBtn
                text={'수정'}
                page={'profile'}
                category={'interests'}
                type={'multiSelect'}
                title={'관심분야'}
                value={data.interests ?? ''}
                selectList={[
                  '공유서비스',
                  '이커머스',
                  '유틸',
                  '금융',
                  '헬스케어',
                  '소셜네트워크',
                  '여행',
                  '뉴스/정보',
                  '게임',
                  '엔터테인먼트',
                  '의료/병원',
                  '기타',
                ]}
                maxLength={20}
              />
            )}
          </CategoryContent>
          <CategoryContent>
            <div>
              <Text>직무/경력:</Text>
              <Text padding>
                {data.career === null || data.career.length === 0
                  ? '미입력'
                  : data.career}
              </Text>
            </div>
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

      {/* fourth block */}
      <ContentContainer>
        <CategoryTitle>사용 프로그램 또는 기술</CategoryTitle>

        <ProgramOrSkillContainer>
          <HashtagContainer>
            {[
              'typescript',
              'react',
              'Nextjs',
              'nodejs',
              'expressjs',
              'typescript',
              'react',
              'Nextjs',
              'nodejs',
              'expressjs',
              'typescript',
              'react',
              'Nextjs',
              'nodejs',
              'expressjs',
              'typescript',
              'react',
              'Nextjs',
              'nodejs',
              'expressjs',
            ].map((hashtag, index) => {
              return <Hashtag tagName={hashtag} key={`${hashtag}-${index}`} />;
            })}
          </HashtagContainer>

          {me && (
            <EditBtn
              text={'수정'}
              page={'profile'}
              category={''}
              type={'select'}
              title={'사용 프로그램 또는 기술'}
              value={''}
            />
          )}
        </ProgramOrSkillContainer>
      </ContentContainer>
    </>
  );
};

export default ProfileInfoBox;

import React from 'react';
import { User } from '@/apis/profileFetcher';
import { PersonIcon, MailIcon } from '@/assets/icons';
import { changeDateFormat } from '@/utils/changeDateFormat';
import Hashtag from '@/components/commons/hashtag';
import {
  ContentContainer,
  CategoryTitle,
  CategoryContent,
  EditButton,
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
  handleEdit: (event: React.MouseEvent) => void;
}

const ProfileInfoView = ({ me, data, handleEdit }: ProfileInfoViewProps) => {
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
              <EditButton
                data-edit-title='닉네임 수정'
                data-edit-value={data.nickname}
                data-edit-type='standard'
                data-edit-category='nickname'
                onClick={handleEdit}
              >
                닉네임수정
              </EditButton>
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
            <EditButton
              data-edit-title='자기소개 수정'
              data-edit-value={data.introduce}
              data-edit-type='multiline'
              data-edit-category='introduce'
              onClick={handleEdit}
            >
              수정
            </EditButton>
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
              <Text padding>{data.onOffline ?? '미입력'}</Text>
            </div>
            {me && <EditButton onClick={handleEdit}>수정</EditButton>}
          </CategoryContent>
          <CategoryContent>
            <div>
              <Text>지역:</Text>
              <Text padding>{data.meetingPlace ?? '미입력'}</Text>
            </div>
            {me && <EditButton onClick={handleEdit}>수정</EditButton>}
          </CategoryContent>
          <CategoryContent>
            <div>
              <Text>가능시간:</Text>
              <Text padding>{data.meetingTime ?? '미입력'}</Text>
              {/* 주중,주말 가능/시간대 미정 */}
            </div>
            {me && <EditButton onClick={handleEdit}>수정</EditButton>}
          </CategoryContent>
          <CategoryContent>
            <div>
              <Text>관심분야:</Text>
              <Text padding>{data.interests ?? '미입력'}</Text>
              {/* 공유서비스, O2O, 이커머스, 유틸, 금융 */}
            </div>
            {me && <EditButton onClick={handleEdit}>수정</EditButton>}
          </CategoryContent>
          <CategoryContent>
            <div>
              <Text>경력사항:</Text>
              <Text padding>{data.career ?? '미입력'}</Text>
              {/* 1년차 취준생, 학생, 기타 */}
            </div>
            {me && <EditButton onClick={handleEdit}>수정</EditButton>}
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

          {me && <EditButton onClick={handleEdit}>수정</EditButton>}
        </ProgramOrSkillContainer>
      </ContentContainer>
    </>
  );
};

export default ProfileInfoView;

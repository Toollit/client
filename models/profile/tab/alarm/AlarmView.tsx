import React from 'react';
import Link from 'next/link';
import { Alarm } from '@/apis/profileAlarmsFetcher';
import { Button } from '@/components/commons/button';
import Skeleton from '@/components/commons/skeleton';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import {
  BoxContent,
  Content,
  LeftColumnContainer,
  Notice,
  NotificationsNoneIcon,
  RightColumnContainer,
  ProjectTitle,
  AlarmTitle,
  RequestTime,
  InfoContainer,
  ButtonContainer,
  Label,
} from './styles';

export interface AlarmViewData {
  alarms: Alarm[] | null;
}

export interface AlarmViewProps {
  data: AlarmViewData | null;
}

const AlarmView = ({ data }: AlarmViewProps) => {
  return (
    <>
      {data && (
        <BoxContainer>
          <BoxTitle>알림</BoxTitle>
          <BoxContent>
            {data?.alarms && data.alarms?.length > 0 ? (
              <>
                {data.alarms?.map((v, index) => {
                  return (
                    <Content key={`/profile/project/${v.project.id}-${index}`}>
                      <InfoContainer>
                        <LeftColumnContainer>
                          <NotificationsNoneIcon color='action' />
                        </LeftColumnContainer>
                        <RightColumnContainer>
                          <AlarmTitle>
                            {v.requestUser.nickname}님의 프로젝트 참가 신청이
                            도착했어요!{' '}
                            <Link href={`/profile/${v.requestUser.nickname}`}>
                              프로필 보러 가기
                            </Link>
                          </AlarmTitle>

                          <Label>프로젝트</Label>
                          <Link href={`/project/${v.project.id}`} passHref>
                            <ProjectTitle>{v.project.title}</ProjectTitle>
                          </Link>

                          <RequestTime>{v.project.createdAt}</RequestTime>
                        </RightColumnContainer>
                      </InfoContainer>
                      <ButtonContainer>
                        <Button type='submit' text='수락' />
                        <Button type='normal' text='거절' />
                      </ButtonContainer>
                    </Content>
                  );
                })}
              </>
            ) : (
              <>
                <Notice>알림이 없습니다.</Notice>
              </>
            )}
          </BoxContent>
        </BoxContainer>
      )}
      {!data && (
        <>
          <Skeleton height={25} top={3} />
          <Skeleton height={25} top={3} />
          <Skeleton height={25} top={3} />
        </>
      )}
    </>
  );
};

export default AlarmView;
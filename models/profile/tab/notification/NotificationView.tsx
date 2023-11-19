import React from 'react';
import Link from 'next/link';
import { Notification } from '@/apis/profileNotificationsFetcher';
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

export interface NotificationViewProps {
  data?: Notification[];
  each: (data: Notification) => {
    handleApprove: () => void;
    handleReject: () => void;
  };
}

const NotificationView = ({ data, each }: NotificationViewProps) => {
  return (
    <>
      {data ? (
        <BoxContainer>
          <BoxTitle>알림</BoxTitle>
          <BoxContent>
            {data.length > 0 ? (
              <>
                {data.map((notification) => {
                  const { handleApprove, handleReject } = each(notification);

                  return (
                    <Content key={notification.id}>
                      <InfoContainer>
                        <LeftColumnContainer>
                          <NotificationsNoneIcon color='action' />
                        </LeftColumnContainer>
                        <RightColumnContainer>
                          <AlarmTitle>
                            <Link
                              href={`/profile/${notification.notificationCreator}`}
                            >
                              {notification.notificationCreator}
                            </Link>
                            님의 프로젝트 참가 신청이 도착했어요!
                          </AlarmTitle>

                          <Label>프로젝트</Label>
                          <Link href={`/project/${notification.id}`} passHref>
                            <ProjectTitle>
                              {notification.projectTitle}
                            </ProjectTitle>
                          </Link>

                          <RequestTime>{notification.createdAt}</RequestTime>
                        </RightColumnContainer>
                      </InfoContainer>
                      <ButtonContainer>
                        <Button
                          type='submit'
                          text='수락'
                          onClick={handleApprove}
                        />
                        <Button
                          type='normal'
                          text='거절'
                          onClick={handleReject}
                        />
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
      ) : (
        <>
          <Skeleton height={25} bottom={3} />
          <Skeleton height={25} bottom={3} />
          <Skeleton height={25} bottom={3} />
        </>
      )}
    </>
  );
};

export default NotificationView;

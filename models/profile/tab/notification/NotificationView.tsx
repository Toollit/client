import React, { FC } from 'react';
import Link from 'next/link';
import { Notification } from '@/apis/profileNotificationsFetcher';
import { Button } from '@/components/button';
import Skeleton from '@/components/skeleton';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import OptionButton from '@/components/drawer/option';
import {
  LockPersonIcon,
  MoreVertIcon,
  NotificationsIcon,
} from '@/assets/icons';
import {
  BoxContent,
  Content,
  EmptyNoticeText,
  ProjectTitle,
  NotificationTitle,
  Time,
  NotificationController,
  UserProfileLink,
  NotificationMessage,
  NotificationDeleteButton,
  HideNoticeText,
  NoticeHideContainer,
  LockPersonIconContainer,
  NotificationsIconContainer,
} from './styles';

interface CustomNotification extends Notification {
  notificationInfo?: string;
}

export interface ViewProps {
  hasRendered: boolean;
  data?: CustomNotification[];
  each: (data: Notification) => {
    handleProjectJoinApprove: () => void;
    handleProjectJoinReject: () => void;
    handleDeleteNotification: () => void;
  };
  isMyProfile: boolean;
}

const NotificationView: FC<ViewProps> = ({
  hasRendered,
  data,
  each,
  isMyProfile,
}) => {
  return (
    <>
      {hasRendered && (
        <>
          {isMyProfile ? (
            <>
              {data && (
                <BoxContainer>
                  <BoxTitle>알림</BoxTitle>
                  <BoxContent>
                    {data.length > 0 ? (
                      <>
                        {data.map((notification) => {
                          const {
                            handleProjectJoinApprove,
                            handleProjectJoinReject,
                            handleDeleteNotification,
                          } = each(notification);

                          if (notification.type === 'projectJoinRequest') {
                            return (
                              <Content key={notification.id}>
                                <NotificationTitle>
                                  <NotificationsIconContainer>
                                    <NotificationsIcon
                                      width={3}
                                      height={3}
                                      color={'#767678'}
                                    />
                                  </NotificationsIconContainer>
                                  <UserProfileLink
                                    href={`/profile/${notification.notificationCreator}`}
                                  >
                                    {notification.notificationCreator}
                                  </UserProfileLink>
                                  <Time> • {notification.createdAt}</Time>
                                </NotificationTitle>

                                <NotificationMessage>
                                  {notification.notificationInfo}
                                </NotificationMessage>
                                <Link
                                  href={`/project/${notification.projectId}`}
                                >
                                  <ProjectTitle>
                                    <strong>[프로젝트]</strong>
                                    {notification.projectTitle}
                                  </ProjectTitle>
                                </Link>

                                <NotificationController>
                                  <Button
                                    type='submit'
                                    text='수락'
                                    onClick={handleProjectJoinApprove}
                                  />
                                  <Button
                                    type='normal'
                                    text='거절'
                                    onClick={handleProjectJoinReject}
                                  />
                                </NotificationController>
                              </Content>
                            );
                          } else {
                            return (
                              <Content key={notification.id}>
                                <NotificationTitle>
                                  <NotificationsIconContainer>
                                    <NotificationsIcon
                                      width={3}
                                      height={3}
                                      color={'#767678'}
                                    />
                                  </NotificationsIconContainer>
                                  <UserProfileLink
                                    href={`/profile/${notification.notificationCreator}`}
                                  >
                                    {notification.notificationCreator}
                                  </UserProfileLink>
                                  <Time> • {notification.createdAt}</Time>
                                </NotificationTitle>
                                <NotificationMessage>
                                  {notification.notificationInfo}
                                </NotificationMessage>

                                <Link
                                  href={`/project/${notification.projectId}`}
                                >
                                  <ProjectTitle>
                                    <strong>[프로젝트]</strong>
                                    {notification.projectTitle}
                                  </ProjectTitle>
                                </Link>

                                <NotificationDeleteButton>
                                  <OptionButton
                                    icon={<MoreVertIcon width={3} height={3} />}
                                    option={{ delete: true }}
                                    handleDelete={handleDeleteNotification}
                                  />
                                </NotificationDeleteButton>
                              </Content>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <EmptyNoticeText>알림이 없습니다.</EmptyNoticeText>
                      </>
                    )}
                  </BoxContent>
                </BoxContainer>
              )}

              {!data && (
                <>
                  <Skeleton width={'100%'} height={20} bottom={2} />
                  <Skeleton width={'100%'} height={15} bottom={2} />
                  <Skeleton width={'100%'} height={30} bottom={2} />
                </>
              )}
            </>
          ) : (
            <BoxContainer>
              <BoxTitle>알림</BoxTitle>
              <BoxContent>
                <NoticeHideContainer>
                  <LockPersonIconContainer>
                    <LockPersonIcon width={20} height={20} fill={true} />
                  </LockPersonIconContainer>
                  <HideNoticeText>본인만 확인 가능합니다.</HideNoticeText>
                </NoticeHideContainer>
              </BoxContent>
            </BoxContainer>
          )}
        </>
      )}

      {!hasRendered && (
        <>
          <Skeleton width={'100%'} height={20} bottom={2} />
          <Skeleton width={'100%'} height={15} bottom={2} />
          <Skeleton width={'100%'} height={30} bottom={2} />
        </>
      )}
    </>
  );
};

export default NotificationView;

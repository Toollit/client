import React from 'react';
import Link from 'next/link';
import { Notification } from '@/apis/profileNotificationsFetcher';
import { Button } from '@/components/commons/button';
import Skeleton from '@/components/commons/skeleton';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import OptionButton from '@/components/commons/drawer/option';
import {
  BoxContent,
  Content,
  Notice,
  NotificationIcon,
  ProjectTitle,
  Source,
  Time,
  NotificationController,
  User,
  NotificationType,
  NotificationDeleteButton,
  MoreIcon,
} from './styles';

interface CustomNotification extends Notification {
  notificationInfo?: string;
}

export interface NotificationViewProps {
  data?: CustomNotification[];
  each: (data: Notification) => {
    handleProjectJoinApprove: () => void;
    handleProjectJoinReject: () => void;
    handleDeleteNotification: () => void;
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
                  const {
                    handleProjectJoinApprove,
                    handleProjectJoinReject,
                    handleDeleteNotification,
                  } = each(notification);

                  if (notification.type === 'projectJoinRequest') {
                    return (
                      <Content key={notification.id}>
                        <Source>
                          <NotificationIcon color='action' />
                          <Link
                            href={`/profile/${notification.notificationCreator}`}
                            passHref
                          >
                            <User>{notification.notificationCreator}</User>
                          </Link>
                          <Time> • {notification.createdAt}</Time>
                        </Source>

                        <NotificationType>
                          {notification.notificationInfo}
                        </NotificationType>
                        <Link href={`/project/${notification.projectId}`}>
                          <a>
                            <ProjectTitle>
                              <strong>[프로젝트]</strong>
                              {notification.projectTitle}
                            </ProjectTitle>
                          </a>
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
                        <Source>
                          <NotificationIcon color='action' />

                          <Link
                            href={`/profile/${notification.notificationCreator}`}
                            passHref
                          >
                            <User>{notification.notificationCreator}</User>
                          </Link>
                          <Time> • {notification.createdAt}</Time>
                        </Source>
                        <NotificationType>
                          {notification.notificationInfo}
                        </NotificationType>

                        <Link href={`/project/${notification.projectId}`}>
                          <a>
                            <ProjectTitle>
                              <strong>[프로젝트]</strong>
                              {notification.projectTitle}
                            </ProjectTitle>
                          </a>
                        </Link>

                        <NotificationDeleteButton>
                          <OptionButton
                            icon={<MoreIcon />}
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
